from flask import Flask, request, jsonify
from transformers import pipeline
from PIL import Image
import io
import os

app = Flask(__name__)

# Load model (CPU only for Render free tier)
emotion_classifier = pipeline(
    "image-classification",
    model="trpakov/vit-face-expression",
    device=-1
)

@app.route('/analyze', methods=['POST'])
def analyze():

    if 'image' not in request.files:
        return jsonify({"error": "No image field received"}), 400

    file = request.files['image']
    image = Image.open(io.BytesIO(file.read())).convert("RGB")

    results = emotion_classifier(image)
    results = sorted(results, key=lambda x: x['score'], reverse=True)

    top_emotion = results[0]['label'].lower()

    if top_emotion in ['happy', 'neutral', 'surprise']:
        engaged = 1
        not_engaged = 0
    else:
        engaged = 0
        not_engaged = 1

    return jsonify({
        "total_students": 1,
        "dominant_emotion": top_emotion,
        "engaged": engaged,
        "not_engaged": not_engaged,
        "engagement_percentage": engaged * 100
    })


# 🔥 IMPORTANT FOR RENDER
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
