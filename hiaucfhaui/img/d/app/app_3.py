import os
from PIL import Image, ImageOps

canvas_width = 900
canvas_height = 1600

image_directory = ".."

def create_canvas(image_path):
    img = Image.open(image_path)
    width, height = img.size

    # Calculate the new dimensions while maintaining the aspect ratio
    if width > height:
        new_width = canvas_width
        new_height = int(height * (canvas_width / width))
    else:
        new_width = int(width * (canvas_height / height))
        new_height = canvas_height

    # Resize the image with the calculated dimensions
    resized_img = img.resize((new_width, new_height))

    # Calculate the position to place the resized image in the center of the canvas
    x = (canvas_width - new_width) // 2
    y = (canvas_height - new_height) // 2

    # Create a new canvas with the desired size
    canvas = Image.new("RGB", (canvas_width, canvas_height), (255, 255, 255))

    # Paste the resized image onto the canvas at the calculated position
    canvas.paste(resized_img, (x, y))

    return canvas


def convert_images(image_directory):
    for person_folder in os.listdir(image_directory):
        person_folder_path = os.path.join(image_directory, person_folder)
        if os.path.isdir(person_folder_path):
            for filename in os.listdir(person_folder_path):
                if filename.endswith(".jpg") or filename.endswith(".jpeg") or filename.endswith(".png") or filename.endswith(".JPG") or filename.endswith(".PNG"):
                    image_path = os.path.join(person_folder_path, filename)
                    print(image_path)
                    canvas = create_canvas(image_path)

                    output_filename = f"{os.path.splitext(filename)[0]}.webp"
                    output_path = os.path.join(person_folder_path, output_filename)
                    canvas.save(output_path, "WEBP")

convert_images(image_directory)
