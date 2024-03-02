const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5001;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Serve static files (processed images)
app.use(
  '/processed',
  express.static(
    path.join(
      __dirname,
      'character_recognition_model',
      'image_detection',
      'outputs',
      'output'
    )
  )
);

// Serve static files (processed videos)
app.use(
  '/processed',
  express.static(
    path.join(
      __dirname,
      'character_recognition_model',
      'video_detection',
      'outputs',
      'video_output'
    )
  )
);

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/processImage', upload.single('image'), (req, res) => {
  // Create the 'temp' directory if it doesn't exist
  const tempDir = './temp';
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Save the received image to a temporary file
  const imageBuffer = req.file.buffer;
  const tempImagePath = path.join(tempDir, 'temp_image.jpg');

  fs.writeFileSync(tempImagePath, imageBuffer);

  // Full path to your Python script
  const pythonScriptPath = path.join(__dirname, 'character_recognition_model', 'image_detection', 'py_codes_2', 'predict_text_image_ultraNew4.py');

  // Run the Python script with the saved image path
  const pythonProcess = spawn('python', [pythonScriptPath, tempImagePath]); 

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script Running: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script closed with code ${code}`);

    // Send a response back to the frontend with the image path
    const outputImagePath = 'processed/output_output_image.jpg';
    res.json({ success: true, imagePath: outputImagePath });
  });
});

app.post('/processVideo', upload.single('video'), (req, res) => {
  // Create the 'temp' directory if it doesn't exist
  const tempDir = './temp';
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Save the received video to a temporary file
  const videoBuffer = req.file.buffer;
  const tempVideoPath = path.join(tempDir, 'temp_video.mp4');

  fs.writeFileSync(tempVideoPath, videoBuffer);

  // Full path to your Python script for video processing
  const pythonScriptPath = path.join(__dirname, 'character_recognition_model', 'Video_detection', 'py_codes_2', 'predict_text_video_ultraNew4.py');

  // Run the Python script with the saved video path
  const pythonProcess = spawn('python', [pythonScriptPath, tempVideoPath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script Running: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python script closed with code ${code}`);

    // Send a response back to the frontend with the video path
    const outputVideoPath = 'processed/output_compatible.mp4';
    res.json({ success: true, videoPath: outputVideoPath });
  });
});

app.get('/jsondata', (req, res) => {
  // Read the JSON file
  fs.readFile(path.join(__dirname, 'character_recognition_model', 'image_detection', 'outputs', 'combined_json_output', 'combined_data.json'), (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).json({ error: 'Failed to read JSON file' });
    } else {
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (error) {
        console.error('Error parsing JSON data:', error);
        res.status(500).json({ error: 'Failed to parse JSON data' });
      }
    }
  });
});

// Serve the list of image filenames
app.get('/images', (req, res) => {
  const imageDirectory = path.join(__dirname, 'character_recognition_model', 'image_detection', 'outputs', 'NumberPlates', 'output_with_labels');

  fs.readdir(imageDirectory, (err, files) => {
    if (err) {
      console.error('Error reading image directory:', err);
      res.status(500).json({ error: 'Failed to read image directory' });
    } else {
      const imageFiles = files.filter(file => file.endsWith('.jpg')); // Filter only JPEG files
      res.json(imageFiles);
    }
  });
});

// Serve individual image files
app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'character_recognition_model', 'image_detection', 'outputs', 'NumberPlates', 'output_with_labels', filename);

  // Check if the file exists
  fs.exists(imagePath, exists => {
    if (exists) {
      // If the file exists, serve it
      res.sendFile(imagePath);
    } else {
      // If the file doesn't exist, return a 404 error
      res.status(404).send('Image not found');
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
