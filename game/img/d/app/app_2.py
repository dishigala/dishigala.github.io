import os
from PIL import Image

aspect_ratio = (16, 9)  # Desired aspect ratio: 16:9
buffer_percentage = 10  # Buffer percentage: 10%

image_directory = "../"

def resize_image(image_path):
    img = Image.open(image_path)
    width, height = img.size

    # Calculate the target width and height based on the aspect ratio and buffer percentage
    target_width = int(height * aspect_ratio[0] / aspect_ratio[1])
    target_height = height

    
    # Calculate the new width and height with the buffer
    new_width = target_width 
    new_height = target_height

    # Resize the image while maintaining the aspect ratio
    resized_img = img.resize((new_width, new_height))

    return resized_img

def convert_images(image_directory):
    for person_folder in os.listdir(image_directory):
        person_folder_path = os.path.join(image_directory, person_folder)
        if os.path.isdir(person_folder_path):
            for filename in os.listdir(person_folder_path):
                if filename == "1.webp":
                    image_path = os.path.join(person_folder_path, filename)
                    resized_image = resize_image(image_path)

                    output_filename = "0.webp"
                    output_path = os.path.join(person_folder_path, output_filename)
                    resized_image.save(output_path, "WEBP")

def copy_image(image_directory):
    for person_folder in os.listdir(image_directory):
        if person_folder != "Sakshii":
            continue
        person_folder_path = os.path.join(image_directory, person_folder)
        if os.path.isdir(person_folder_path):
            for filename in os.listdir(person_folder_path):
                if filename.endswith(".jpg") or filename.endswith(".jpeg") or filename.endswith(".png") or filename.endswith(".JPG") or filename.endswith(".PNG"):
                    image_path = os.path.join(person_folder_path, filename)
                    print(image_path)
                    original_image = Image.open(image_path)
                    # Open the original image

                    # Convert the image to WebP format                  
                    
                    output_filename = f"{os.path.splitext(filename)[0]}.webp"
                    output_path = os.path.join(person_folder_path, output_filename)
                    original_image.save(output_path, "WEBP")
                    # Save the copied image

# convert_images(image_directory)
copy_image(image_directory)
'''
import os
import csv

# Specify the directory path
directory = '..'

# Create a list to store the folder names and file names
data = []

# Iterate over the directories and files in the specified directory
for root, dirs, files in os.walk(directory):
    # Get the folder name
    folder_name = os.path.basename(root)
    
    # Get the file names
    file_names = [file for file in files]
    
    # Append the folder name and file names to the data list
    data.append([folder_name] + file_names)

# Specify the output CSV file path
output_file = './output.csv'

# Write the data to the CSV file
with open(output_file, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(data)

'''