import cv2
import os
import sys

def extract_frames(video_path, output_folder,frames_output_folder):
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)

    # Delete all files inside the frames folder
    for file in os.listdir(output_folder):
        file_path = os.path.join(output_folder, file)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(f"Error deleting {file_path}: {e}")

    # Delete all files inside the frames_output_folder 
    for file in os.listdir(frames_output_folder):
        file_path = os.path.join(frames_output_folder, file)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(f"Error deleting {file_path}: {e}")

    # Open the video file
    cap = cv2.VideoCapture(video_path)

    # Check if video opened successfully
    if not cap.isOpened():
        print("Error: Could not open video.")
        return

    frame_count = 0

    # Read frames and save them as images
    while True:
        ret, frame = cap.read()

        if not ret:
            break  # Break the loop if the video has ended

        frame_count += 1

        # Save the frame as an image
        frame_path = os.path.join(output_folder, f"{frame_count}.jpg")
        cv2.imwrite(frame_path, frame)

    # Release the video capture object
    cap.release()

    print(f"{frame_count} frames extracted and saved to {output_folder}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python video_to_frames.py <video_path>")
        sys.exit(1)
    video_path = video_path = sys.argv[1]

    PATH = os.path.join(
    '.', 'character_recognition_model', 'video_detection')
    output_folder = os.path.join(PATH, 'outputs', 'frames')
    frames_output_folder = os.path.join(PATH, 'outputs', 'frames_output')

    extract_frames(video_path, output_folder, frames_output_folder)
