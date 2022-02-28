const express = require("express");
const Manufacturer = require("../models/Manufacturer");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const content = await Manufacturer.find();
    res.status(200).json(content);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже." });
  }
});

module.exports = router;
