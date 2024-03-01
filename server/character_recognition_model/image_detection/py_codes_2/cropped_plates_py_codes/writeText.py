import os
from PIL import Image, ImageDraw, ImageFont

# Directory containing the cropped words and the detection labels file
IMAGES_DIR = os.path.join('.', 'character_recognition_model',
                          'image_detection', 'outputs', 'NumberPlates', 'CroppedNumberPlates')
DETECTION_LABELS_DIR = os.path.join(
    '.', 'character_recognition_model', 'image_detection', 'outputs', 'NumberPlates', 'output')
OUTPUT_DIR = os.path.join('.', 'character_recognition_model',
                          'image_detection', 'outputs', 'NumberPlates', 'output_with_labels')

# Create output directory if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Delete files inside output_with_labels folder before writing new files
for file in os.listdir(OUTPUT_DIR):
    file_path = os.path.join(OUTPUT_DIR, file)
    try:
        if os.path.isfile(file_path):
            os.remove(file_path)
            print(f"Deleted {file_path}")
    except Exception as e:
        print(f"Error deleting {file_path}: {e}")

# Iterate over each image in the input directory
for filename in os.listdir(IMAGES_DIR):
    if filename.endswith('.jpg') or filename.endswith('.png'):
        # Remove file extension from the image filename
        image_name_no_ext = os.path.splitext(filename)[0]

        # Construct paths to the image and the corresponding detection labels file
        image_path = os.path.join(IMAGES_DIR, filename)
        detection_labels_path = os.path.join(
            DETECTION_LABELS_DIR, f'{image_name_no_ext}.txt')

        # Load the detection labels from the file if it exists
        if os.path.exists(detection_labels_path):
            detection_labels = []
            with open(detection_labels_path, 'r', encoding='utf-8') as labels_file:
                for line in labels_file:
                    # Split each line and extract label and coordinates
                    elements = line.strip().split()
                    if len(elements) >= 6:  # Ensure there are enough elements
                        label = elements[0]
                        # Extract coordinates
                        x1, y1, x2, y2 = map(float, elements[2:6])
                        detection_labels.append((label, (x1, y1, x2, y2)))

            # Open the image using PIL
            image = Image.open(image_path)
            draw = ImageDraw.Draw(image)

            # Load the font
            # Specify the path to your .ttf font file
            font_path = os.path.join(
                '.', 'fonts', 'OldFontUnicode.ttf')
            font_size = 30  # Increased font size
            font = ImageFont.truetype(font_path, font_size)

            # Draw bounding boxes and labels on the image
            for label, (x1, y1, x2, y2) in detection_labels:
                # Convert coordinates to integers
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                # Draw filled rectangle as background for the label
                text_width, text_height = draw.textsize(label, font=font)
                bg_x1 = x1 + (x2 - x1 - text_width) / 2 - 2
                bg_y1 = y1 - text_height - 4
                bg_x2 = bg_x1 + text_width + 4
                bg_y2 = bg_y1 + text_height + 4
                draw.rectangle([bg_x1, bg_y1, bg_x2, bg_y2], fill="red")

                # Draw bounding box
                # draw.rectangle([x1, y1, x2, y2], outline="violet", width=2)

                # Draw label
                draw.text((bg_x1 + 2, bg_y1 + 2), label,
                          fill="white", font=font)

            # Save the image with bounding boxes and labels drawn
            output_image_path = os.path.join(
                OUTPUT_DIR, f'output_with_labels_{image_name_no_ext}.jpg')
            image.save(output_image_path)

            print(f"Image with detection labels saved at: {output_image_path}")
        else:
            print(f"No detection labels found for image: {filename}")
