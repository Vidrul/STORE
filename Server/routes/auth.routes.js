const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");
const bcrypt = require("bcryptjs");
const tokenService = require("../service/tokenService.service");
const { generateUserData } = require("../util/helpers");
const jwt = require("jsonwebtoken");
const config = require("config");
const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

router.post("/singUp", [
  check("email", "Некорректный Email").isEmail(),
  check("password", "Минимальная длина пароля 8 символов").isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({
          message: "INVALID_DATA",
          code: 400,
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          message: "EMAIL_ALREADY_EXIST",
          code: 400,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);

      return res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка попробуйте позже." });
    }
  },
]);

router.post("/signInWithPassword", [
  check("email", "Некорректный Email").isEmail(),
  check("password", "Минимальная длина пароля 8 символов").isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({
          message: "INVALID_DATA",
          code: 400,
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;
      const currentUser = await User.findOne({ email });

      if (!currentUser) {
        return res.status(400).send({
          message: "EMAIL_NOT_FOUND",
          code: 400,
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        currentUser.password
      );

      if (!isPasswordEqual) {
        return res.status(400).send({
          message: "INCORRECT_PASSWORD",
          code: 400,
        });
      }

      const tokens = tokenService.generate({ _id: currentUser._id });
      await tokenService.save(currentUser._id, tokens.refreshToken);

      return res.status(201).send({
        ...tokens,
        userId: currentUser._id,
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка попробуйте позже." });
    }
  },
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const data = tokenService.validateRefreshToken(refreshToken); // ?
    const dbToken = await tokenService.findToken(refreshToken);
    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({
        message: "Unautorized",
      });
    }

    const tokens = tokenService.generate({ _id: data._id });
    await tokenService.save(data._id, tokens.refreshToken);
    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже." });
  }
});

router
  .post("/forgotPassword", async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send({
          message: "EMAIL_NOT_FOUND",
          code: 400,
        });
      }

      const data = await PasswordReset.findOne({ email });
      const token = jwt.sign({ email }, config.get("privatePasswordKey"), {
        expiresIn: "1h",
      });

      if (data) {
        data.token = token;
        data.save();
      } else {
        const passwordReset = await PasswordReset.create({ email, token });
        await passwordReset.save();
      }

      const url = `http://localhost:3000/reset/${token}`;

      await transporter.sendMail({
        to: email,
        from: "dsaley601@gmail.com",
        subject: "Reset your password!",
        html: `Click <a href=${url}>here</a> to reset your password!`,
      });

      res.status(200).send({
        message: "Check your email!",
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка попробуйте позже." });
    }
  })
  .post("/resetPassword", async (req, res) => {
    try {
      const { password, confirmPassword, token } = req.body;

      const data = await PasswordReset.findOne({ token });
      if (!data) {
        return res
          .status(400)
          .send({ message: "THIS_LINK_IS_NOT_ACTIVE", code: 400 });
      }

      if (password !== confirmPassword) {
        return res
          .status(400)
          .send({ message: "PASSWORD_DONT_MATCH", code: 400 });
      }

      const { email } = data;
      const user = await User.findOne({ email });

      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      user.save();

      res.send({ message: "Success" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка попробуйте позже." });
    }
  });

module.exports = router;
