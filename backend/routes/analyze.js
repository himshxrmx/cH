const express = require("express");
const multer = require("multer");
const axios = require("axios");
const Record = require("../models/Record");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Call HuggingFace Cloud API
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/trpakov/vit-face-expression",
      req.file.buffer,
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/octet-stream"
        }
      }
    );

    const results = response.data;
    const sorted = results.sort((a, b) => b.score - a.score);
    const top_emotion = sorted[0].label.toLowerCase();

    let engaged = 0;
    let not_engaged = 0;

    if (["happy", "neutral", "surprise"].includes(top_emotion)) {
      engaged = 1;
    } else {
      not_engaged = 1;
    }

    const data = {
      total_students: 1,
      dominant_emotion: top_emotion,
      engaged,
      not_engaged,
      engagement_percentage: engaged * 100
    };

    const record = new Record(data);
    await record.save();

    res.json(data);

  } catch (error) {
    console.log("HF ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "AI processing failed" });
  }
});

module.exports = router;


