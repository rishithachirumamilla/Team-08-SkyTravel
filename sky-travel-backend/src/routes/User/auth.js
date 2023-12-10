const bcryptjs = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  BadRequest,
  ServerError,
  GenerateError,
} = require("../../helpers/errors");
const User = require("../../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userAlreadyExists = await User.findOne({
      $or: [
        {
          email: email.toLowerCase(),
        },
        {
          username: username.toLowerCase(),
        },
      ],
    });
    if (userAlreadyExists) return BadRequest(res, "User already exists!");

    const salt = await bcryptjs.genSalt(8);
    const encryptedPassword = await bcryptjs.hash(password, salt);

    const user = new User({
      ...req.body,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: encryptedPassword,
    });

    const response = await user.save();
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    const payload = {
      _id: response._id,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    res.send({ user: response, token, userType: "user" });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) return BadRequest(res, "Login failed!");

    const isMatch = await bcryptjs.compare(password, userExists.password);
    if (!isMatch) return BadRequest(res, "Login failed!");

    const payload = {
      _id: userExists._id,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    res.send({ user: userExists, token, userType: "user" });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
