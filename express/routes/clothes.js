const express = require("express");
const router = express.Router();
const Clothes = require("../models/Clothes");

// Create a new clothes item
router.post("/", async (req, res) => {
  try {
    const newClothes = new Clothes(req.body);
    await newClothes.save();
    res.status(201).json({ message: "Clothes added successfully", data: newClothes });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all clothes
router.get("/", async (req, res) => {
  try {
    const clothes = await Clothes.find().sort({ _id: -1 });
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
