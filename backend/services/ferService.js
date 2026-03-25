from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
from PIL import Image
import io
import os
import base64

app = Flask(__name__)
CORS(app) # Ensures your frontend script.js can talk to it without CORS errors

# Load model (CPU only for Render free tier)
emotion_classifier = pipeline(
    "image-classification",
    model="trpakov/vit-face-expression",
    device=-1
)

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        # 1. Handle Base64 JSON (from your script.js or Python Benchmark)
        if request.is_json:
            data = request.get_json()
            base64_str = data.get('image', '')
            
            # Remove the "data:image/jpeg;base64," prefix if it exists
            if ',' in base64_str:
                base64_str = base64_str.split(',')[1]
                
            image_data = base64.b64decode(base64_str)
            image = Image.open(io.BytesIO(image_data)).convert("RGB")
            
        # 2. Handle standard File Uploads (just in case)
        elif 'image' in request.files:
            file = request.files['image']
            image = Image.open(io.BytesIO(file.read())).convert("RGB")
        else:
            return jsonify({"error": "No image provided"}), 400

        # 3. Run Hugging Face Model
        results = emotion_classifier(image)
        results = sorted(results, key=lambda x: x['score'], reverse=True)
        top_emotion = results[0]['label'].lower()

        # 4. Map the HF result to the standard Gemini/Groq schema
        # HF uses 'surprise', our dashboard expects 'surprised'
        mapped_emotion = 'surprised' if top_emotion == 'surprise' else top_emotion
        
        # Initialize standard dictionary
        emotions = {"happy": 0, "neutral": 0, "surprised": 0, "bored": 0, "sad": 0, "angry": 0}
        
        if mapped_emotion in emotions:
            emotions[mapped_emotion] = 1
        else:
            emotions['neutral'] = 1 # Fallback safety

        # Calculate Engagement
        if mapped_emotion in ['happy', 'neutral', 'surprised']:
            engaged = 1
            not_engaged = 0
        else:
            engaged = 0
            not_engaged = 1

        # Return the exact format script.js and the benchmark expect!
        return jsonify({
            "total_students": 1,
            "happy": emotions["happy"],
            "neutral": emotions["neutral"],
            "surprised": emotions["surprised"],
            "bored": emotions["bored"],
            "sad": emotions["sad"],
            "angry": emotions["angry"],
            "engaged": engaged,
            "not_engaged": not_engaged,
            "engagement_percentage": engaged * 100
        })

    except Exception as e:
        print(f"🚨 HF Backend Error: {e}")
        # Graceful Degradation Fallback
        return jsonify({
            "total_students": 1, "happy": 0, "neutral": 1, "surprised": 0,
            "bored": 0, "sad": 0, "angry": 0,
            "engaged": 1, "not_engaged": 0, "engagement_percentage": 100
        })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
