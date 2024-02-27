import os
import json
from ultralytics import YOLO
import cv2

PATH = os.path.join(
    '.', 'character_recognition_model', 'video_detection', 'outputs')

IMAGES_DIR = os.path.join(PATH,'output') 
OUTPUT_DIR = os.path.join(PATH, 'txt_output') 

# Create the output folder if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load the model
model_path = os.path.join('.', 'models', 'characterRecognizer.pt')
model = YOLO(model_path)

# Delete files inside the output folder before saving new output
for file_name in os.listdir(OUTPUT_DIR):
    file_path = os.path.join(OUTPUT_DIR, file_name)
    try:
        if os.path.isfile(file_path):
            os.remove(file_path)
    except Exception as e:
        print(f"Error deleting file {file_path}: {e}")

# Open detected_characters.txt file for writing outside of the loop
detected_characters_path = os.path.join(OUTPUT_DIR, 'detected_characters.txt')
with open(detected_characters_path, 'w', encoding='utf-8') as all_char_file:
    # Create a dictionary to store all detection information
    all_detection_data = {"images": []}

    # Process each image in the folder
    for filename in os.listdir(IMAGES_DIR):
        if filename.endswith('.jpg'):
            # Read the image
            image_path = os.path.join(IMAGES_DIR, filename)
            image = cv2.imread(image_path)
            H, W, _ = image.shape

            # Perform object detection on the image
            results = model(image)[0]

            threshold = 0.5

            # List to store detection information for writing to a text file
            detection_info = []

            # Calculate the distance from the bottom for each bounding box and store them in a list
            distances_from_bottom = []
            for result in results.boxes.data.tolist():
                x1, y1, x2, y2, score, class_id = result

                if score > threshold:
                    label = results.names[int(class_id)].upper()
                    distance_from_bottom = H - y2  # Calculate distance from the bottom of the image
                    distances_from_bottom.append(distance_from_bottom)

                    detection_info.append({
                        "label": label,
                        "score": float(score),
                        "coordinates": {"x1": float(x1), "y1": float(y1), "x2": float(x2), "y2": float(y2)},
                        "distance_from_bottom": float(distance_from_bottom)
                    })

                    # Draw bounding boxes and labels on the image using Unicode font
                    font = cv2.FONT_HERSHEY_SIMPLEX
                    font_scale = 1.3
                    font_thickness = 3
                    font_color = (0, 255, 0)
                    try:
                        cv2.putText(image, label, (int(x1), int(y1 - 10)), font, font_scale, font_color, font_thickness, cv2.LINE_AA)
                    except cv2.error:
                        pass

            # Calculate the mean of distances only if there are bounding boxes detected
            mean_distance = sum(distances_from_bottom) / len(distances_from_bottom) if len(distances_from_bottom) > 0 else 0

            # Categorize distances as upper or lower based on mean
            upper_characters = [info for info in detection_info if info["distance_from_bottom"] > mean_distance]
            lower_characters = [info for info in detection_info if info["distance_from_bottom"] <= mean_distance]

            # Sort upper and lower characters based on x-coordinate
            upper_characters.sort(key=lambda x: x["coordinates"]["x1"])
            lower_characters.sort(key=lambda x: x["coordinates"]["x1"])

            # Save detection information, mean, and categories to a text file
            txt_output_path = os.path.join(OUTPUT_DIR, f'detection_labels_{os.path.splitext(filename)[0]}.txt')
            with open(txt_output_path, 'w', encoding='utf-8') as txt_file:
                for upper_info in upper_characters:
                    txt_file.write(f"{upper_info['label']} {upper_info['score']:.2f} "
                                   f"{upper_info['coordinates']['x1']} {upper_info['coordinates']['y1']} "
                                   f"{upper_info['coordinates']['x2']} {upper_info['coordinates']['y2']} "
                                   f"{upper_info['distance_from_bottom']}\n")
                txt_file.write(f"\n")
                for lower_info in lower_characters:
                    txt_file.write(f"{lower_info['label']} {lower_info['score']:.2f} "
                                   f"{lower_info['coordinates']['x1']} {lower_info['coordinates']['y1']} "
                                   f"{lower_info['coordinates']['x2']} {lower_info['coordinates']['y2']} "
                                   f"{lower_info['distance_from_bottom']}\n")

            print(f"Image with detections saved at: {os.path.join(OUTPUT_DIR, f'output_{filename}')}")
            print(f"Detection labels saved at: {txt_output_path}")

            # Extract the first character from each line and save to the common detected_characters.txt file
            with open(txt_output_path, 'r', encoding='utf-8') as txt_file:
                for line in txt_file:
                    elements = line.split()
                    first_character = elements[0] if elements else ' '
                    all_char_file.write(first_character)

            # Add a newline character to separate characters from different images
            all_char_file.write('\n')

            # Add detection information to the common dictionary
            all_detection_data["images"].append({
                "image_path": filename,
                "mean_distance": mean_distance,
                "upper_characters": upper_characters,
                "lower_characters": lower_characters
            })

    # Save the common detection information to a single JSON file
    common_json_output_path = os.path.join(PATH,'labels_output','common_detection_labels.json')
    with open(common_json_output_path, 'w', encoding='utf-8') as common_json_file:
        json.dump(all_detection_data, common_json_file,  indent=4)

    # Print the final path of the common detected_characters.txt file
    print(f"All detected characters saved at: {detected_characters_path}")
    print(f"Common JSON output saved at: {common_json_output_path}")
