const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get("privateAccesseKey"), {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, config.get("privateRefreshKey"));

    return { accessToken, refreshToken, expiresIn: 3600 };
  }

  async save(userId, refreshToken) {
    const data = await Token.findOne({ user: userId });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }

    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("privateRefreshKey"));
    } catch (e) {
      return null;
    }
  }

  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("privateAccesseKey"));
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();
