const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const Record = require("../models/Record");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  try {

    // 🔴 Check if file exists
    if (!req.file) {
      console.log("No file received from frontend");
      return res.status(400).json({ error: "No file uploaded" });
    }

    const form = new FormData();
    form.append("image", req.file.buffer, {
      filename: "upload.jpg",
      contentType: req.file.mimetype
    });

    console.log("Sending file to Python...");

    const response = await axios.post(
      "http://localhost:5000/analyze",
      form,
      { headers: form.getHeaders() }
    );

    const data = response.data;

    console.log("Python response:", data);

    const record = new Record(data);
    await record.save();

    res.json(data);

  } catch (error) {
    console.log("ANALYZE ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Error analyzing image" });
  }
});

module.exports = router;

