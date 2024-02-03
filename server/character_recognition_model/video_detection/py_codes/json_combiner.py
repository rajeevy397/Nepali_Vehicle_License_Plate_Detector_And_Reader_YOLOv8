import json
import os

# Load the content of detected_objects.json
PATH = os.path.join(
    '.', 'character_recognition_model', 'video_detection', 'outputs')

with open(os.path.join(PATH,'labels_output','detected_objects.json'), 'r') as f:
    detected_objects_data = json.load(f)

# Load the content of common_detection_labels.json
with open(os.path.join(PATH,'labels_output','common_detection_labels.json'), 'r') as f:
    common_labels_data = json.load(f)

# Create a list to store combined information
combined_data = []

# Iterate through each image in common_labels_data
for common_image in common_labels_data['images']:
    image_path = common_image['image_path']

    # Find corresponding entry in detected_objects_data based on image_path
    detected_objects_entry = next(
        (obj for obj in detected_objects_data if obj['image_path'] == image_path), None
    )

    # If an entry is found, combine the information
    if detected_objects_entry:
        # Extract upper and lower characters
        upper_characters = [char['label'] for char in common_image['upper_characters']]
        lower_characters = [char['label'] for char in common_image['lower_characters']]

        # Combine upper and lower characters into a single line
        characters_combined = ''.join(upper_characters +[' ']+ lower_characters)

        combined_entry = {
            "image_path": image_path,
            "coordinates": detected_objects_entry['coordinates'],
            "upper_characters": upper_characters,
            "lower_characters": lower_characters,
            "characters": characters_combined
        }
        combined_data.append(combined_entry)

# Save the combined data to a new JSON file without Unicode escape sequences
combiedjson_output_path = os.path.join(PATH,'combined_json_output','combined.json')
with open(combiedjson_output_path, 'w', encoding='utf-8') as f:
    json.dump(combined_data, f,  indent=2)

print("Combined data saved to combined.json")
