const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(fileUpload());

// Serve static files from the 'output' directory
app.use('/output', express.static(path.join(__dirname, 'output')));

app.post('/upload_video', (req, res) => {
  handleFileUpload(req, res, 'videos', 'predict_video.py', 'output_compatible.mp4');
});

app.post('/upload_image', (req, res) => {
  handleFileUpload(req, res, 'images', 'predict_image.py', 'output_with_characters.jpg');
});

function handleFileUpload(req, res, fileType, pythonScript, outputFileName) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file;
  const filePath = path.join(__dirname, fileType, uploadedFile.name);

  uploadedFile.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const pythonProcess = spawn('python', [pythonScript, filePath]);

    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      // Append a timestamp or unique identifier to the output path
      const timestamp = new Date().getTime();
      const outputPath = `/output/${outputFileName}?${timestamp}`;

      // Read the extracted Unicode texts from the output_unicode.txt file
      const outputTxtPath = path.join(__dirname, 'output', 'output_unicode.txt');
      const unicodeTexts = fs.readFileSync(outputTxtPath, 'utf-8').split('\n').filter(Boolean);

      console.log('Sending response:', { success: true, outputPath, unicodeTexts });
      res.json({ success: true, message: `Output ${fileType} sent`, outputPath, unicodeTexts });
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})