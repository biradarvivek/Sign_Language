const express = require("express");
const router = express.Router();
const Word = require("../Models/Words");

router.get("/", async (req, res) => {
  try {
    const words = await Word.find().sort({ createdAt: -1 });
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const words = await Word.find({
      $or: [
        { word: { $regex: query, $options: "i" } },
        { definition: { $regex: query, $options: "i" } },
      ],
    });
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { word, definition, imageUrl, videoUrl } = req.body;

    if (!word || !definition) {
      return res
        .status(400)
        .json({ message: "Word and definition are required" });
    }

    const newWord = new Word({
      word,
      definition,
      imageUrl,
      videoUrl,
    });

    const savedWord = await newWord.save();
    res.status(201).json(savedWord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { word, definition, imageUrl, videoUrl } = req.body;

    const updatedWord = await Word.findByIdAndUpdate(
      req.params.id,
      { word, definition, imageUrl, videoUrl },
      { new: true, runValidators: true }
    );

    if (!updatedWord) {
      return res.status(404).json({ message: "Word not found" });
    }

    res.json(updatedWord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedWord = await Word.findByIdAndDelete(req.params.id);

    if (!deletedWord) {
      return res.status(404).json({ message: "Word not found" });
    }

    res.json({ message: "Word deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
