import json
import os

PATH = os.path.join(
    '.', 'character_recognition_model', 'image_detection', 'outputs')

# Read content from detected_objects.json
with open(os.path.join(PATH,'labels_output', 'detected_objects.json'), 'r') as f:
    detected_objects_data = json.load(f)

# Read content from output_json.json
with open(os.path.join(PATH,'labels_output', 'output_json.json'), 'r') as f:
    output_data = json.load(f)

# Combine data into a single dictionary
combined_data = {}

# Add data from detected_objects.json
for obj in detected_objects_data:
    image_name = obj['image_name']
    combined_data[image_name] = {
        'image_name': image_name,
        'coordinates': obj['coordinates']
    }

# Add data from output_json.json
for image_name, data in output_data.items():
    if image_name in combined_data:
        combined_data[image_name]['NumberPlateText'] = data['NumberPlateText']
    else:
        combined_data[image_name] = {
            'image_name': data['image_name'],
            'NumberPlateText': data['NumberPlateText'],
            'coordinates': None  # If image not present in detected_objects.json, set coordinates to None
        }

# Write combined data to a new JSON file
combiedjson_output_path = os.path.join('.','character_recognition_model','image_detection' ,'outputs','combined_json_output','combined_data.json')
with open(combiedjson_output_path, 'w') as f:
    json.dump(combined_data, f, indent=4)

print("Combined data written to combined_data.json")
 