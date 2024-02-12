from PIL import Image, ImageDraw, ImageFont
import json
import os


def write_characters_on_image(json_path, target_image_path, custom_font_path):
    # Open the target image
    image = Image.open(target_image_path)
    draw = ImageDraw.Draw(image)
    image_width, image_height = image.size
    
    # Load the custom font
    font_size = 50  # Adjust the font size as needed
    font_color = "red"  # Change the font color as needed
    font = ImageFont.truetype(custom_font_path, size=font_size)

    with open(json_path, "r") as json_file:
        json_data = json.load(json_file)

        for key, entry in json_data.items():
            if entry["coordinates"] is not None:
                coordinates = entry["coordinates"]
                characters = entry.get("NumberPlateText", "")

                # Calculate the center of the box formed by coordinates
                center_x = (coordinates["x1"] + coordinates["x2"]) // 2
                center_y = coordinates["y1"]

                # Calculate the size of the white background based on the bounding box of the text
                text_width, text_height = draw.textsize(characters, font=font)
                box_width = text_width + 20  # Add some padding
                box_height = text_height + 20  # Add some padding

                # Check if the text box overflows the image width
                if center_x - box_width // 2 < 0:  # If overflow from left
                    center_x = box_width // 2  # Adjust to start from the left edge
                elif center_x + box_width // 2 > image_width:  # If overflow from right
                    center_x = image_width - box_width // 2  # Adjust to end at the right edge

                # Check if the text box overflows the image height
                if center_y - box_height < 0:  # If overflow from top
                    center_y = box_height  # Adjust to start below the top edge
                elif center_y > image_height:  # If overflow from bottom
                    center_y = image_height  # Adjust to the bottom edge

                # Create a white background for the text
                box_x1 = center_x - box_width // 2
                box_y1 = center_y - box_height - 20  # Move slightly above the specified region
                box_x2 = box_x1 + box_width
                box_y2 = box_y1 + box_height

                # Draw the white background
                draw.rectangle([box_x1, box_y1, box_x2, box_y2], fill="white")

                # Write characters above the box with the specified font size and color
                text_x = center_x - text_width // 2
                text_y = box_y1  # Align the text with the top of the background box
                draw.text((text_x, text_y), characters, font=font, fill=font_color)

    # Save the modified image
    output_dir = os.path.dirname(target_image_path)
    output_filename = f"output_{os.path.basename(target_image_path)}"
    output_path = os.path.join(output_dir, output_filename)
    image.save(output_path)

if __name__ == "__main__":
    PATH = os.path.join(
    '.', 'character_recognition_model', 'image_detection', 'outputs') 

    # Specify the path of the JSON file containing coordinates and NumberPlateText
    json_path = os.path.join(PATH,'combined_json_output', 'combined_data.json')
    
    # Specify the path of the target image
    target_image_path = os.path.join(PATH,'output', 'output_image.jpg')
    
    # Specify the path of the custom font
    custom_font_path = os.path.join('.', 'FontUnicode.ttf')

    # Call the function to write characters on the target image using the custom font
    write_characters_on_image(json_path, target_image_path, custom_font_path)
