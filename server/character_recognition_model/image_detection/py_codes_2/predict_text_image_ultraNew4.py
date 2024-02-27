import os
import sys
import cv2
import json
import subprocess
from ultralytics import YOLO


if len(sys.argv) != 2:
    print("Usage: python predict_text_image_ultraNew4.py <image_path>") 
    sys.exit(1)

image_path = sys.argv[1]
# image_path = os.path.join(IMAGES_DIR, 'frame_0058.png')

PATH = os.path.join(
    '.', 'character_recognition_model', 'image_detection', 'outputs') 

output_folder = os.path.join(PATH, 'output')

#create folder if dont exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Load a model
model_path = os.path.join('.', 'models', 'NumberPlateDetector.pt')
model = YOLO(model_path)
 
# Read the image
image = cv2.imread(image_path)
H, W, _ = image.shape

# Perform object detection on the image
results = model(image)[0]

threshold = 0.5

# Create a list to store information about detected objects
detected_objects = []

# Delete existing files in the 'output' folder
for file_name in os.listdir(output_folder):
    file_path = os.path.join(output_folder, file_name)
    try:
        if os.path.isfile(file_path):
            os.remove(file_path)
    except Exception as e:
        print(f"Error deleting {file_path}: {e}")

for idx, result in enumerate(results.boxes.data.tolist()):
    x1, y1, x2, y2, score, class_id = result

    if score > threshold:
        # Crop the detected object
        cropped_object = image[int(y1):int(y2), int(x1):int(x2)]

        # Letterbox resizing
        target_size = (600, 600)
        h, w, _ = cropped_object.shape
        if h != target_size[0] or w != target_size[1]:
            ratio = min(target_size[0] / h, target_size[1] / w)
            new_h, new_w = int(h * ratio), int(w * ratio)
            pad_h = (target_size[0] - new_h) // 2
            pad_w = (target_size[1] - new_w) // 2

            resized_object = cv2.resize(cropped_object, (new_w, new_h))
            resized_object = cv2.copyMakeBorder(resized_object, pad_h, pad_h, pad_w, pad_w, cv2.BORDER_CONSTANT,
                                                value=(0, 0, 0))  # Padding with black color

            image_name = f'{idx + 1}.jpg'
            # Save the resized object
            output_resized_object_path = os.path.join(output_folder, image_name)
            cv2.imwrite(output_resized_object_path, resized_object)

            # Save information about the detected object
            detected_objects.append({
                'image_name': image_name,
                'label': results.names[int(class_id)].upper(),
                'coordinates': {'x1': int(x1), 'y1': int(y1), 'x2': int(x2), 'y2': int(y2)}
            })

            # Draw bounding box on the original image
            cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 4)
            cv2.putText(image, results.names[int(class_id)].upper(), (int(x1), int(y1 - 10)),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)

# Save the original image with bounding boxes
output_image_path = os.path.join(output_folder, 'output_image.jpg')
cv2.imwrite(output_image_path, image)

# Save the JSON file with detected object information
json_output_path = os.path.join(PATH, 'labels_output','detected_objects.json')
with open(json_output_path, 'w') as json_file:
    json.dump(detected_objects, json_file, indent=4)

print(f"Detected objects saved as images and JSON file created at: {json_output_path}")
print(f"Original image with bounding boxes saved at: {output_image_path}")


# Run other scripts serially
py_codes_path = os.path.join(
    '.','character_recognition_model', 'image_detection', 'py_codes_2')
subprocess.run(['python', os.path.join(py_codes_path,'new_text_detector_and_sortor11.py')])
subprocess.run(['python',os.path.join(py_codes_path,'json_combiner2.py')])
subprocess.run(['python',os.path.join(py_codes_path,'write_character_onImage2.py')])
