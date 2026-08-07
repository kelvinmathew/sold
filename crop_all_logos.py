import os
import glob
from PIL import Image

def tight_crop(image_path):
    if not os.path.exists(image_path):
        return

    try:
        img = Image.open(image_path).convert("RGBA")
    except Exception as e:
        return

    width, height = img.size
    
    # Get bounding box based on alpha channel (> 5)
    alpha = img.split()[3]
    bbox = alpha.point(lambda p: 255 if p > 5 else 0).getbbox()
    
    if not bbox:
        return

    # If the bbox is smaller than the original image, crop it!
    if bbox != (0, 0, width, height):
        cropped = img.crop(bbox)
        cropped.save(image_path, "PNG")
        print(f"Cropped {os.path.basename(image_path)}: {width}x{height} -> {cropped.width}x{cropped.height}")
    else:
        print(f"Already tight: {os.path.basename(image_path)} ({width}x{height})")

if __name__ == "__main__":
    targets = [
        "assets/images/design-icon.png",
        "assets/images/launch-icon.png",
        "assets/images/sell-icon.png",
        "assets/images/banyan.png",
        "assets/images/banyan-cropped.png",
        "assets/images/ellington.png",
        "assets/images/ellington-cropped.png",
        "assets/images/regus.png",
        "assets/images/regus-cropped.png",
        "assets/images/logosold_white.png",
        "assets/images/footer_logo.png",
        "assets/images/fter_logo.png"
    ]
    for target in targets:
        tight_crop(target)
