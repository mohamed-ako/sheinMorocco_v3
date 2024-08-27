const mongoose = require("mongoose");

const clothesSchema = new mongoose.Schema({
  name: { type: String },
  color: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: String, required: true },
  oldPrice: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Clothes", clothesSchema);
