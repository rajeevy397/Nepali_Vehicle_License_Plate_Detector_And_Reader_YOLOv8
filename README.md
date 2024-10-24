**Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr**
# Nepali Vehicle License Plate Detection System

Welcome to our Final Year Major Project developed by Group Members: Rajeev Yadav, Rajkishor Yadav, Rupesh Lamichhane, and Sanjit Baruwal from Purwanchal Engineering Campus, Institute of Engineering, Tribhuvan University.

## Project Overview

The Nepali Vehicle License Plate Detection System is an intelligent system designed to detect and extract text information from vehicle license plates using YOLOv8 for object detection and EasyOCR for text extraction. The system is capable of processing both images and videos, providing valuable insights into vehicle information.

## Group Members

- Rajeev Yadav
- Rajkishor Yadav
- Rupesh Lamichhane
- Sanjit Baruwal

## Installation Guide

### Python Dependencies
#### you must have python installed on your system
1. Install the required Python libraries provided in server foder by running the following command:

   pip install -r requirements.txt

### Frontend Setup
1.change directory to client then do intallation and start the frontend by running following command
   - cd client
   - do npm install
   - then do npm start
### Backend Setup
1. change directory to server then do installation and start the server by running following command
   - cd server
   - do npm install
   - place your trained yolo models inside models folder located in server folder
   - Rename Your models to:
      - characterRecognizer.pt (For charater recognizer model)
      - NumberPlateDetector.pt (For Number Plate Detector model) 
   - then do npm start

# DATASET SAMPLES WITH ANNOTATIONS FOR YOLO MODEL AND LINK OF DATASETS
## Vehicles Dataset samples
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/bebae3e2-345a-40aa-9c29-5a52cee4cb79" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/e709cac3-e90b-419b-bdaf-000abe4136fb" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/be714705-9666-4b64-b00e-d2651fef920f" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/56468177-0e24-4d1b-996f-bd820e61cb17" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/5fce8bd4-1a7b-4b9e-8717-093f5071def0" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/ec2e9511-0efb-461b-8d2f-6595cdbd6a91" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/40913f0b-dd65-4e98-af8a-47d8f7904fe1" width="200" height="200" />

## Number plate datasets Samples
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/8699cb4c-835d-457b-9994-3f8a7c0b1dcb" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/338bd26f-900b-43d4-8a6a-404f8939fa9e" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/112de854-4a6e-435a-9e05-6a4d28833517" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/d2eab0dd-b3ea-40ea-a4f5-8c221773d47c" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/26c819fd-0cee-4378-a65e-31ad939e7845" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/b2be38e0-0bd0-4784-92de-543de49e54b2" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/ec3940dc-0dc8-4dce-9959-6900c5564a25" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/cf7af599-beda-42fc-ad22-5faf21f67318" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/a3fce4e9-7170-408c-a39d-39149b78755c" width="200" height="200" />
<img src="https://github.com/rajeevy397/Nepali_Vehicle_License_Plate_Detector_And_Reader_YOLOv8_EasyOcr/assets/94947701/71c6e00e-fce3-4943-9abc-e78911ac872d" width="200" height="200" />


## To get Datasets. Request me on this Drive Link (Pay NPR 1000 Rupees)
(Disclaimer: You Have to pay NPR 1000 Rupees For Our Team Hard Work)

Drive Link: https://drive.google.com/drive/folders/1z2FiyICN-oQhGiR2uyJ8lvnjhrqN3wZe?usp=sharing

## If You want Trained Model Links (Pay NPR 1200 Rupees)
(Disclaimer: You Have to pay NPR 1200 Rupees For Our Team Hard Work)

Drive Link: https://drive.google.com/drive/folders/1V39DO5ywArRYQ6nkLhKBlO2ObGNdPkA3?usp=sharing
