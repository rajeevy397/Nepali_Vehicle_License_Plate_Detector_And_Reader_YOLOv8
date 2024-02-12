import cv2
import os
import subprocess 

PATH = os.path.join(
    '.', 'character_recognition_model', 'video_detection', 'outputs')

def frames_to_video(input_folder, output_file):
    images = [img for img in os.listdir(input_folder) if img.endswith(".jpg")]
    images.sort(key=lambda x: int(x.split('.')[0]))  # Sort by frame number

    frame = cv2.imread(os.path.join(input_folder, images[0]))
    height, width, layers = frame.shape

    # Adjust the frame rate according to your preference
    video = cv2.VideoWriter(output_file, cv2.VideoWriter_fourcc(*'mp4v'), 30, (width, height))

    for image in images:
        img_path = os.path.join(input_folder, image)
        frame = cv2.imread(img_path)
        video.write(frame)

    video.release()

# Set the input folder containing frames
input_folder = os.path.join(PATH, 'frames_output')

# Set the output file path for the video
output_file = os.path.join(PATH, 'video_output', 'output_video.mp4')

# Ensure the output folder exists
os.makedirs(os.path.dirname(output_file), exist_ok=True)

# Call the function to create video from frames
frames_to_video(input_folder, output_file)

compatible_output_path = os.path.join(PATH, 'video_output', 'output_compatible.mp4')
# Adjust FFmpeg command based on your requirements and FFmpeg capabilities
ffmpeg_command = f"C:\\ffmpeg\\ffmpeg -y -i {output_file} -c:v libx264 -c:a aac -strict experimental {compatible_output_path}"
subprocess.run(ffmpeg_command, shell=True)
