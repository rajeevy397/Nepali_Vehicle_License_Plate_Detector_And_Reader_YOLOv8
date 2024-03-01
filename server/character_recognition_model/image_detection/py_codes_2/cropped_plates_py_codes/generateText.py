import os
import cv2
from ultralytics import YOLO

IMAGES_DIR = os.path.join('.', 'character_recognition_model', 'image_detection', 'outputs', 'NumberPlates', 'CroppedNumberPlates')
OUTPUT_DIR = os.path.join('.','character_recognition_model', 'image_detection', 'outputs', 'NumberPlates', 'output')

# Load a model
model_path = os.path.join('.','models', 'characterRecognizer.pt')
model = YOLO(model_path)

# Create output directory if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Delete files inside the output directory before writing new files
for file_name in os.listdir(OUTPUT_DIR):
    file_path = os.path.join(OUTPUT_DIR, file_name)
    if os.path.isfile(file_path):
        os.remove(file_path)

# Iterate over each image in the input directory
for filename in os.listdir(IMAGES_DIR):
    if filename.endswith('.jpg') or filename.endswith('.png'):
        # Construct path to the image
        image_path = os.path.join(IMAGES_DIR, filename)

        # Read the image
        image = cv2.imread(image_path)
        H, W, _ = image.shape

        # Perform object detection on the image
        results = model(image)[0]

        threshold = 0.1

        # List to store detection information for writing to a text file
        detection_info = []

        # Calculate the distance from the bottom for each bounding box and store them in a list
        for result in results.boxes.data.tolist():
            x1, y1, x2, y2, score, class_id = result

            if score > threshold:
                label = results.names[int(class_id)].upper()
                distance_from_bottom = H - y2  # Calculate distance from the bottom of the image

                detection_info.append(f"{label} {score:.2f} {x1} {y1} {x2} {y2} {distance_from_bottom}")

        # Construct the output text file name using the base filename
        base_filename = os.path.splitext(filename)[0]
        txt_output_path = os.path.join(OUTPUT_DIR, f'{base_filename}.txt')

        # Save detection information to a text file
        with open(txt_output_path, 'w', encoding='utf-8') as txt_file:
            for info in detection_info:
                txt_file.write(info + '\n')

        print(f"Detection labels saved at: {txt_output_path}")
