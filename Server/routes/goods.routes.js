const express = require("express");
const Goods = require("../models/Goods");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
  try {
    const content = await Goods.find();
    res.status(200).json(content);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже." });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (userId) {
      const content = await Goods.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(content);
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже." });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user._id;
    if (userId) {
      const content = await Goods.findByIdAndDelete(id);
      res.status(200).json(content);
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже." });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;
    const existingProduct = await Goods.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({
        message: "THIS_PRODUCT_EXIST",
      });
    }
    const content = await Goods.create(req.body);
    res.status(200).json(content);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже." });
  }
});

module.exports = router;
