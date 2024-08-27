const mongoose = require("mongoose");

const stickersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Stickers", stickersSchema);
