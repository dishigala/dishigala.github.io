import os

def rename_files(folder_path):
    # Iterate over all items in the folder
    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)

        # Check if the item is a directory
        if os.path.isdir(item_path):
            # Recursively call the function for subdirectories
            rename_files(item_path)
        else:
            # Split the file name and extension
            name, extension = os.path.splitext(item)

            # Create the new file name with the desired numbering
            new_file_name = str(rename_files.counter) + extension

            # Construct the full paths for the old and new file names
            old_path = os.path.join(folder_path, item)
            new_path = os.path.join(folder_path, new_file_name)

            # Rename the file
            os.rename(old_path, new_path)

            # Increment the counter
            rename_files.counter += 1

# Set the initial counter value
rename_files.counter = 1

# Specify the path to the main folder
main_folder_path = "."  # Replace with the actual folder path

# Call the function to rename files in all subdirectories
rename_files(main_folder_path)
