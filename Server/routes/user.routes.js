const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/:userId", auth, async (req, res) => {
  const { userId } = req.params;

  try {
    const content = await User.find({ _id: userId });
    res.status(200).json(content);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже." });
  }
});

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    if (currentUserId === userId) {
      const content = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.status(200).json(content);
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже." });
  }
});

module.exports = router;
