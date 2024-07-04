import cv2
from PIL import Image
import os
import shutil


aspect_ratio = (16, 9)  # Example aspect ratio: 16:9
image_directory = "../"
output_directory = "."

def auto_crop_image(image_path):
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert from BGR to RGB
    height, width, _ = img_rgb.shape

    target_width = int(height * aspect_ratio[0] / aspect_ratio[1])
    target_height = height

    left = (width - target_width) // 2
    top = 0
    right = left + target_width
    bottom = top + target_height

    cropped_img = img_rgb[top:bottom, left:right]
    return cropped_img

def webp_conversion():
    for person_folder in os.listdir(image_directory):
        person_folder_path = os.path.join(image_directory, person_folder)
        if os.path.isdir(person_folder_path):
            for filename in os.listdir(person_folder_path):
                if filename.endswith(".jpg") or filename.endswith(".jpeg") or filename.endswith(".png"):
                    image_path = os.path.join(person_folder_path, filename)
                    cropped_image = auto_crop_image(image_path)

                    output_path = os.path.join(person_folder_path, filename.replace(".jpg", ".webp").replace(".jpeg", ".webp").replace(".png", ".webp"))
                    cropped_image_pil = Image.fromarray(cropped_image)
                    cropped_image_pil.save(output_path, "webp")


def copy_images_with_new_names(image_directory, output_directory):
    for person_folder in os.listdir(image_directory):
        person_folder_path = os.path.join(image_directory, person_folder)
        if os.path.isdir(person_folder_path):
            for filename in os.listdir(person_folder_path):
                if filename.endswith(".jpg") or filename.endswith(".jpeg") or filename.endswith(".png"):
                    image_path = os.path.join(person_folder_path, filename)
                    filename, extension = filename.split('.')
                    output_filename = f"{filename}_{person_folder}.{extension}"
                    output_path = os.path.join(output_directory, output_filename)
                    shutil.copy2(image_path, output_path)

copy_images_with_new_names(image_directory, output_directory)