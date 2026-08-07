import sys, re, base64
from PIL import Image
import io

try:
    with open('logosold.svg', 'r') as f:
        content = f.read()
    
    match = re.search(r'data:image/png;base64,([^\"]+)', content)
    if not match:
        print('Base64 not found')
        sys.exit(1)
        
    b64_data = match.group(1)
    img_data = base64.b64decode(b64_data)
    
    # Load image
    img = Image.open(io.BytesIO(img_data))
    
    # Crop transparent borders
    bbox = img.getbbox()
    if bbox:
        print(f'Original size: {img.size}, cropped to: {bbox}')
        cropped = img.crop(bbox)
        cropped.save('logosold_cropped.png')
        print('Saved as logosold_cropped.png')
    else:
        print('Image is completely empty or getting bbox failed.')
        
except Exception as e:
    print(f'Error: {e}')
