require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const analyzeRoute = require("./routes/analyze");
const Record = require("./models/Record");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// Analyze route
app.use("/analyze", analyzeRoute);

// Fetch records
app.get("/records", async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    console.log("FETCH ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Use dynamic port for deployment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


