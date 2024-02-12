import os
from ultralytics import YOLO
import cv2
from shapely.geometry import LineString, box
import json

# Set up directories
IMAGES_DIR = os.path.join('.','character_recognition_model','image_detection' ,'outputs','output') 
OUTPUT_DIR = os.path.join('.','character_recognition_model','image_detection' ,'outputs', 'txt_output')   

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load the YOLO model
model_path = os.path.join('.', 'best.pt')
model = YOLO(model_path)

# Delete files inside the output folder before saving new output
for file_name in os.listdir(OUTPUT_DIR):
    file_path = os.path.join(OUTPUT_DIR, file_name)
    try:
        if os.path.isfile(file_path):
            os.remove(file_path)
    except Exception as e:
        print(f"Error deleting file {file_path}: {e}")

# Set threshold
threshold = 0.5

# Dictionary to store JSON data for each image
json_data_all = {}

# Process each image in the folder
for filename in os.listdir(IMAGES_DIR):
    if filename.endswith(('.jpg', '.jpeg', '.png')):  # Process only image files
        # Read the image
        image_path = os.path.join(IMAGES_DIR, filename)
        image = cv2.imread(image_path)
        H, W, _ = image.shape

        # Perform object detection
        results = model(image)[0]

        # Lists to store detection information
        detection_info = []
        labels_with_upper_lines = []
        labels_with_bottom_lines = []
        detected_labels = []
        bounding_boxes_with_lines = {}

        # Calculate distance from bottom for each bounding box
        for result in results.boxes.data.tolist():
            x1, y1, x2, y2, score, class_id = result
            if score > threshold:
                label = results.names[int(class_id)].upper()
                distance_from_bottom = H - y2
                detection_info.append((label, score, x1, y1, x2, y2, distance_from_bottom))
                detected_labels.append((label, x1))

        # Draw lines from upper and lower sides of the bounding boxes
        for info in reversed(detection_info):
            label, score, x1, y1, x2, y2, distance_from_bottom = info

            middle_bottom_point = ((x1 + x2) // 2, y2)
            lower_line = LineString([(middle_bottom_point[0], H), (middle_bottom_point[0], middle_bottom_point[1])])
            intersects_lower = False
            for other_info in detection_info:
                if info != other_info:
                    other_x1, other_y1, other_x2, other_y2 = other_info[2:6]
                    other_box = box(other_x1, other_y1, other_x2, other_y2)
                    if lower_line.intersects(other_box):
                        intersects_lower = True
                        break
            if not intersects_lower:
                bounding_boxes_with_lines[(x1, y1, x2, y2)] = "bottom"
                labels_with_bottom_lines.append((label, x1))

            middle_top_point = ((x1 + x2) // 2, y1)
            upper_line = LineString([(middle_top_point[0], middle_top_point[1]), (middle_top_point[0], 0)])
            intersects_upper = False
            for other_info in detection_info:
                if info != other_info:
                    other_x1, other_y1, other_x2, other_y2 = other_info[2:6]
                    other_box = box(other_x1, other_y1, other_x2, other_y2)
                    if upper_line.intersects(other_box):
                        intersects_upper = True
                        break
            if not intersects_upper and (x1, y1, x2, y2) not in bounding_boxes_with_lines:
                labels_with_upper_lines.append((label, x1))

        # Prepare JSON data
        labels_with_upper_lines_sorted = sorted(labels_with_upper_lines, key=lambda x: x[1])
        labels_with_bottom_lines_sorted = sorted(labels_with_bottom_lines, key=lambda x: x[1])
        labels_with_no_lines = [x for x in detected_labels if x not in labels_with_upper_lines + labels_with_bottom_lines]
        json_data = {
            "image_name": filename,
            "NumberPlateText": "".join([label[0] for label in labels_with_upper_lines_sorted]) + " " + "".join(
                [label[0] for label in labels_with_no_lines]) + " " + "".join(
                [label[0] for label in labels_with_bottom_lines_sorted])
        }

        # Add JSON data to the dictionary using image name as the key
        json_data_all[filename] = json_data

# Save all JSON data to a single file 
json_output_path = os.path.join('.','character_recognition_model','image_detection' ,'outputs','labels_output','output_json.json')
with open(json_output_path, 'w') as json_file:
    json.dump(json_data_all, json_file, indent=4)

print(f"All JSON data saved to: {json_output_path}") 
