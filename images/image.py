import base64
import requests
from io import BytesIO

def image_to_base64(image_url):
    response = requests.get(image_url)
    if response.status_code == 200:
        image_data = BytesIO(response.content)
        encoded_string = base64.b64encode(image_data.read())
        return encoded_string.decode('utf-8')
    else:
        return None

# Example usage
image_url = "https://i.ibb.co/pjZ70Tf/logo-mfoundation.png"
base64_image = image_to_base64(image_url)
if base64_image:
    print(base64_image)
else:
    print("Failed to retrieve image.")
