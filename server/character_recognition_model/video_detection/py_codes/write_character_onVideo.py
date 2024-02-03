from PIL import Image, ImageDraw, ImageFont
import json
import os

def write_characters_on_image(json_data, target_image_path, custom_font_path, output_folder):
    # Open the target image
    image = Image.open(target_image_path)
    draw = ImageDraw.Draw(image)
    
    # Load the custom font
    font_size = 50  # Adjust the font size as needed
    font_color = "red"  # Change the font color as needed
    font = ImageFont.truetype(custom_font_path, size=font_size)

    for i, entry in enumerate(json_data):
        coordinates = entry["coordinates"]
        characters = entry.get("characters", "")

        # Calculate the center of the box formed by coordinates
        center_x = (coordinates["x1"] + coordinates["x2"]) // 2
        center_y = (coordinates["y1"] + coordinates["y2"]) // 2

        # Calculate the size of the white background based on the bounding box of the text
        text_width, text_height = draw.textsize(characters, font=font)
        box_width = text_width + 20  # Add some padding
        box_height = text_height + 20  # Add some padding

        # Create a white background for the text
        box_x1 = center_x - box_width // 2
        box_y1 = center_y - box_height // 2 - 150  # Adjust the spacing as needed
        box_x2 = box_x1 + box_width
        box_y2 = box_y1 + box_height

        # Draw the white background
        draw.rectangle([box_x1, box_y1, box_x2, box_y2], fill="white")

        # Write characters above the box with the specified font size and color
        text_x = center_x - text_width // 2
        text_y = box_y1  # Adjust the spacing as needed
        draw.text((text_x, text_y), characters, font=font, fill=font_color)

    # Save the modified image with a unique name in the specified output folder
    os.makedirs(output_folder, exist_ok=True)

    counter = 1
    base_filename = f"{counter}.jpg"
    while os.path.exists(os.path.join(output_folder, base_filename)):
        counter += 1
        base_filename = f"{counter}.jpg"

    output_path = os.path.join(output_folder, base_filename)
    image.save(output_path)

if __name__ == "__main__":
    PATH = os.path.join(
    '.', 'character_recognition_model', 'video_detection', 'outputs')
    # Load the JSON data
    with open(os.path.join(PATH,'combined_json_output','combined.json'), "r") as json_file:
        json_data = json.load(json_file)

    # Specify the path of the target image
    target_image_path = os.path.join(PATH,'output','output_image.jpg')
    
    # Specify the path of the custom font
    custom_font_path =os.path.join('.','FontUnicode.ttf')

    # Specify the output folder
    output_folder = os.path.join(PATH, 'frames_output')

    # Call the function to write characters on the target image using the custom font
    write_characters_on_image(json_data, target_image_path, custom_font_path, output_folder)
