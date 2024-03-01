import os
import subprocess
import shutil

def clear_folder(folder):
    # Check if folder exists
    if os.path.exists(folder):
        # Iterate over all files in the folder and remove them
        for filename in os.listdir(folder):
            file_path = os.path.join(folder, filename)
            try:
                if os.path.isfile(file_path):
                    os.unlink(file_path)
            except Exception as e:
                print(f"Failed to delete {file_path}. Reason: {e}")

def copy_images(source_folder, destination_folder):
    # Ensure destination folder exists
    if not os.path.exists(destination_folder):
        os.makedirs(destination_folder)
    else:
        # Clear existing files from the destination folder
        clear_folder(destination_folder)

    # Get list of files in source folder
    files = os.listdir(source_folder)

    # Iterate through files
    for file in files:
        if file.lower() not in ['output_image.jpg', 'output_output_image.jpg'] and file.lower().endswith(('.png', '.jpg', '.jpeg')):
            source_path = os.path.join(source_folder, file)
            destination_path = os.path.join(destination_folder, file)
            shutil.copyfile(source_path, destination_path)
            print(f"Copied: {file}")

# Example usage
source_folder = os.path.join('.','character_recognition_model','image_detection' ,'outputs', 'output')
destination_folder = os.path.join('.','character_recognition_model','image_detection' ,'outputs', 'NumberPlates','CroppedNumberPlates')

copy_images(source_folder, destination_folder)

py_codes_path = os.path.join('.','character_recognition_model', 'image_detection', 'py_codes_2','cropped_plates_py_codes')
subprocess.run(['python', os.path.join(py_codes_path,'generateText.py')])
subprocess.run(['python', os.path.join(py_codes_path,'writeText.py')])
