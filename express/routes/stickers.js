const express = require("express");
const router = express.Router();
const Stickers = require("../models/Stickers");

// Create a new sticker
router.post("/", async (req, res) => {
  try {
    const newSticker = new Stickers(req.body);
    await newSticker.save();
    res.status(201).json({ message: "Sticker added successfully", data: newSticker });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all stickers
router.get("/", async (req, res) => {
  try {
    const stickers = await Stickers.find().sort({ _id: -1 });
    res.json(stickers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
