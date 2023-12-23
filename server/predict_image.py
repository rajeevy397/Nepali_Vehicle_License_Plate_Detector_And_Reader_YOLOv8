import os
import sys
from ultralytics import YOLO
import cv2
import easyocr
from PIL import Image, ImageDraw, ImageFont

# Ensure the script is executed from the command line with the image path argument
if len(sys.argv) != 2:
    print("Usage: python predict_image.py <image_path>")
    sys.exit(1)

image_path = sys.argv[1]

IMAGES_DIR = os.path.join('.', 'output')

# Load a YOLO model
model_path = os.path.join('.', 'model_training', 'Nepali_License_Plate_Detection_System_YOLOv8',
                          'runs', 'detect', 'train', 'weights', 'best.pt')
model = YOLO(model_path)

# Read the image
image = cv2.imread(image_path)
H, W, _ = image.shape

# Perform object detection on the image
results = model(image)[0]

# Initialize the OCR reader with English and Hindi support
reader = easyocr.Reader(['en', 'hi', 'ne'])

threshold = 0.5

# Counter for naming the temp_roi files
roi_counter = 1

# Create a blank image with the same dimensions as the original image
output_image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

# Create a drawing object
draw = ImageDraw.Draw(output_image)

# Font settings for drawing label
label_font_path = "FontUnicode.ttf"  # Replace with your label font file
label_font_size = 28  # Adjust the font size as needed
label_font = ImageFont.truetype(label_font_path, label_font_size)
label_text_fill = "white"

# Font settings for drawing Unicode text
unicode_font_path = "FontUnicode.ttf"  # Replace with your Unicode font file
unicode_font_size = 70  # Adjust the font size as needed
unicode_font = ImageFont.truetype(unicode_font_path, unicode_font_size)
unicode_text_fill = "red"

# Create a list to store extracted Unicode text
unicode_texts = []

# Mapping of old texts to new texts
text_mapping = {
    "8": "४",
    "पद्वेg्न": "प्रदेश",
    "ष":"४",
    "ख":"को",
    "3":"३",
    "प्रदश":"प्रदेश",
    "ण":"प",
    "कोर":"को",
    # Add more mappings as needed
}

for result in results.boxes.data.tolist():
    x1, y1, x2, y2, score, class_id = result

    if score > threshold:
        # Extract the region of interest (ROI) from the image
        roi = image[int(y1):int(y2), int(x1):int(x2)]

        # Save the ROI as a temporary image file with a unique name
        roi_path = os.path.join(IMAGES_DIR, f'temp_roi_{roi_counter}.png')
        cv2.imwrite(roi_path, roi)

        # Increment the counter for the next ROI
        roi_counter += 1

        # Perform OCR on the extracted text from the ROI
        text_result = reader.readtext(roi_path)

        # Concatenate lines into a single line separated by space
        extracted_unicode = ' '.join([entry[1] for entry in text_result])

        # Check if the extracted Unicode text contains any Unicode characters
        if any(ord(char) > 127 for char in extracted_unicode):
            # Replace texts based on the mapping
            for old_text, new_text in text_mapping.items():
                extracted_unicode = extracted_unicode.replace(old_text, new_text)

        # Append the modified or original Unicode text to the list
        unicode_texts.append(extracted_unicode)

        # Draw bounding box on the output image
        draw.rectangle([(int(x1), int(y1)), (int(x2), int(y2))],
                       outline=(0, 255, 0), width=4)

        # Calculate the centroid of the bounding box
        centroid_x = int((x1 + x2) / 2)
        centroid_y = int((y1 + y2) / 2)

        # Get the size of the text box
        text_width, text_height = draw.textsize(
            extracted_unicode, font=unicode_font)

        # Draw a white rectangle behind the Unicode text
        offset_y = -130
        offset_y_label = 70
        rectangle_position = (centroid_x - text_width / 2 - 5, centroid_y - text_height / 2 + offset_y,
                              centroid_x + text_width / 2 + 5, centroid_y + text_height / 2 + offset_y)
        draw.rectangle(rectangle_position, fill="white")

        # Draw Unicode text on the output image with an offset
        unicode_text_position = (
            centroid_x - text_width / 2, centroid_y - text_height / 2 + offset_y)
        draw.text(unicode_text_position, extracted_unicode,
                  font=unicode_font, fill=unicode_text_fill)

        # Draw a white rectangle behind the label text
        label_text = f"{results.names[int(class_id)].upper()}"
        label_text_width, label_text_height = draw.textsize(
            label_text, font=label_font)
        label_rectangle_position = (centroid_x - label_text_width / 2 - 5, centroid_y + text_height / 2 + offset_y_label,
                                    centroid_x + label_text_width / 2 + 5, centroid_y + text_height / 2 + offset_y_label + label_text_height + 5)
        draw.rectangle(label_rectangle_position, fill="red")

        # Draw label with label_font below the bounding box
        label_text_position = (centroid_x - label_text_width / 2,
                               centroid_y + text_height / 2 + offset_y_label)
        draw.text(label_text_position, label_text,
                  font=label_font, fill=label_text_fill)

# Print Unicode escape sequences to the console
for text in unicode_texts:
    try:
        print(text)
    except UnicodeEncodeError:
        print(text.encode('unicode_escape').decode('utf-8'))

# Save the list of extracted Unicode texts to a .txt file
output_txt_path = os.path.join(IMAGES_DIR, 'output_unicode.txt')
with open(output_txt_path, 'w', encoding='utf-8') as txt_file:
    for text in unicode_texts:
        txt_file.write(f"{text}\n")

# Save the output image with bounding boxes, labels, and Unicode text
output_image_path = os.path.join(IMAGES_DIR, 'output_with_characters.jpg')
output_image.save(output_image_path)

print(
    f"Image with detections and character extraction saved at: {output_image_path}")
print(f"Unicode text saved at: {output_txt_path}")
