import os
from PIL import Image

def crop_whitespace(image_path):
    if not os.path.exists(image_path):
        print(f"File not found: {image_path}")
        return

    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()

    min_x, min_y = width, height
    max_x, max_y = -1, -1

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # Consider transparent or near-white as whitespace/background
            is_whitespace = (a < 10) or (r > 240 and g > 240 and b > 240)
            if not is_whitespace:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y

    if max_x < min_x or max_y < min_y:
        print(f"{image_path}: No content found or image is completely white/transparent.")
        return

    print(f"{image_path}: Original size {width}x{height} -> Cropping to box ({min_x}, {min_y}, {max_x+1}, {max_y+1})")
    cropped_img = img.crop((min_x, min_y, max_x + 1, max_y + 1))
    cropped_img.save(image_path, "PNG")
    print(f"Saved cropped image: {image_path} (New size: {cropped_img.width}x{cropped_img.height})")

if __name__ == "__main__":
    icons = [
        "assets/images/design-icon.png",
        "assets/images/launch-icon.png",
        "assets/images/sell-icon.png"
    ]
    for icon in icons:
        crop_whitespace(icon)
