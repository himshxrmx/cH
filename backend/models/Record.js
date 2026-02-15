const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  total_students: Number,
  engaged: Number,
  not_engaged: Number,
  engagement_percentage: Number
});

module.exports = mongoose.model("Record", recordSchema);
