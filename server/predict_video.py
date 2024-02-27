import os
import cv2
import numpy as np
from ultralytics import YOLO
import easyocr
from PIL import Image, ImageDraw, ImageFont
import sys
import subprocess

if len(sys.argv) != 2:
    print("Usage: python predict_video.py <input_video_path>")
    sys.exit(1)

# Input video path from command-line argument
input_video_path = sys.argv[1]

# Constants
OUTPUT_FOLDER = os.path.join('.', 'output')  # Replace with the desired output folder

# Load YOLO model
model_path = os.path.join('.', 'models', 'NumberPlateDetector.pt')
model = YOLO(model_path)

# Initialize OCR reader
reader = easyocr.Reader(['en', 'hi', 'ne'])

# Open video file
cap = cv2.VideoCapture(input_video_path)
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# Create video writer using FFmpeg for encoding
output_video_path = os.path.join(OUTPUT_FOLDER, 'output_processed_video.mp4')
out = cv2.VideoWriter(output_video_path, 0x7634706d, fps, (width, height))

# Font settings for drawing label
label_font_path = os.path.join('.', 'fonts', 'FontUnicode.ttf')  # Replace with your label font file
label_font_size = 28  # Adjust the font size as needed
label_font = ImageFont.truetype(label_font_path, label_font_size)
label_text_fill = "black"

# Font settings for drawing Unicode text
unicode_font_path = os.path.join('.', 'fonts', 'FontUnicode.ttf')  # Replace with your Unicode font file
unicode_font_size = 70  # Adjust the font size as needed
unicode_font = ImageFont.truetype(unicode_font_path, unicode_font_size)
unicode_text_fill = "red"

# Process video frames
while True:
    ret, frame = cap.read()

    if not ret:
        break

    # Perform object detection on the frame
    results = model(frame)[0]

    # Create a blank image with the same dimensions as the original frame
    output_frame = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(output_frame)

    # Process each detected object in the frame
    for result in results.boxes.data.tolist():
        x1, y1, x2, y2, score, class_id = result

        threshold = 0.5

        if score > threshold:
            # Extract the region of interest (ROI) from the frame
            roi = frame[int(y1):int(y2), int(x1):int(x2)]

            # Perform OCR on the extracted text from the ROI
            text_result = reader.readtext(roi)

            # Concatenate lines into a single line separated by space
            extracted_unicode = ' '.join([entry[1] for entry in text_result])

            # Draw bounding box on the output frame
            draw.rectangle([(int(x1), int(y1)), (int(x2), int(y2))], outline=(0, 255, 0), width=4)

            # Calculate the centroid of the bounding box
            centroid_x = int((x1 + x2) / 2)
            centroid_y = int((y1 + y2) / 2)

            # Get the size of the text box
            text_bbox = draw.textbbox((0, 0), extracted_unicode, font=unicode_font)
            text_width, text_height = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]

            # Draw a white rectangle behind the Unicode text
            offset_y = -130
            offset_y_label = 70
            rectangle_position = (centroid_x - text_width / 2 - 5, centroid_y - text_height / 2 + offset_y,
                                  centroid_x + text_width / 2 + 5, centroid_y + text_height / 2 + offset_y)
            draw.rectangle(rectangle_position, fill="white")

            # Draw Unicode text on the output frame with an offset
            unicode_text_position = (centroid_x - text_width / 2, centroid_y - text_height / 2 + offset_y)
            draw.text(unicode_text_position, extracted_unicode,
                      font=unicode_font, fill=unicode_text_fill)

            # Get the size of the label text box
            label_text_bbox = draw.textbbox((0, 0), f"{results.names[int(class_id)].upper()}", font=label_font)
            label_text_width, label_text_height = label_text_bbox[2] - label_text_bbox[0], label_text_bbox[3] - label_text_bbox[1]

            # Draw a white rectangle behind the label text
            label_rectangle_position = (centroid_x - label_text_width / 2 - 5, centroid_y + text_height / 2 + offset_y_label,
                                        centroid_x + label_text_width / 2 + 5, centroid_y + text_height / 2 + offset_y_label + label_text_height + 5)
            draw.rectangle(label_rectangle_position, fill="white")

            # Draw label with label_font below the bounding box
            label_text_position = (centroid_x - label_text_width / 2, centroid_y + text_height / 2 + offset_y_label)
            draw.text(label_text_position, f"{results.names[int(class_id)].upper()}",
                      font=label_font, fill=label_text_fill)

    # Write the processed frame to the output video
    out.write(cv2.cvtColor(np.array(output_frame), cv2.COLOR_RGB2BGR))

# Release resources
cap.release()
out.release()

# Run ffmpeg command for conversion
compatible_output_path = os.path.join(OUTPUT_FOLDER, 'output_compatible.mp4')
ffmpeg_command = f"C:\\ffmpeg\\ffmpeg -y -i {output_video_path} -c:v libx264 -c:a aac -strict experimental {compatible_output_path}"
subprocess.run(ffmpeg_command, shell=True)

print(f"Video with detections and character extraction saved at: {compatible_output_path}")
