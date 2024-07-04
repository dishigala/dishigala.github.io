import os
import re
import shutil

# Directory where the files are located
directory = "C:\\Users\\aman\\Desktop\\Personal\\D\\birthday-master\\birthday-master\\game\\img\\d"

# Get a list of all the files in the directory
file_list = os.listdir(directory)

# Create a set to store the unique person names
person_names = set()

# Extract the person name from each file name and add it to the set
for file_name in file_list:
    file_path = os.path.join(directory, file_name)
    if os.path.isfile(file_path):  # Check if it's a file
        person_name = file_name.rsplit('.', 1)[0].rsplit('-', 1)[-1]
        person_names.add(person_name)

person_names = ['Sakshii']
# Create a folder for each person
for person_name in person_names:
    folder_path = os.path.join(directory, person_name)
    os.makedirs(folder_path, exist_ok=True)

# Move the files to their respective folders
for file_name in file_list:
    file_path = os.path.join(directory, file_name)
    if os.path.isfile(file_path):  # Check if it's a file
        person_name = file_name.rsplit('.', 1)[0].rsplit('-', 1)[-1]
        source_path = os.path.join(directory, file_name)
        destination_path = os.path.join(directory, person_name, file_name)
        shutil.move(source_path, destination_path)