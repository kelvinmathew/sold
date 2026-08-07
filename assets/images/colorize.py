import sys
from PIL import Image

try:
    img = Image.open('logosold_cropped.png').convert('RGBA')
    data = img.getdata()
    
    new_data = []
    # #263238 is rgb(38, 50, 56)
    target_color = (38, 50, 56)
    
    for item in data:
        # Check if the pixel is white-ish (high r, g, b)
        if item[0] > 200 and item[1] > 200 and item[2] > 200:
            # Replace with #263238, keeping the original alpha
            new_data.append((target_color[0], target_color[1], target_color[2], item[3]))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save('logosold_dark.png')
    print('Saved as logosold_dark.png')
except Exception as e:
    print(f'Error: {e}')
