const bcryptjs = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  BadRequest,
  ServerError,
  GenerateError,
} = require("../../helpers/errors");
const Airline = require("../../models/Airline");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userAlreadyExists = await Airline.findOne({
      $or: [
        {
          email: email.toLowerCase(),
        },
        {
          username: username.toLowerCase(),
        },
      ],
    });
    if (userAlreadyExists) return BadRequest(res, "Airline already exists!");

    const salt = await bcryptjs.genSalt(8);
    const encryptedPassword = await bcryptjs.hash(password, salt);

    const user = new Airline({
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

    res.send({ user: response, token, userType: "airline" });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await Airline.findOne({ email });
    if (!userExists) return BadRequest(res, "Login failed!");

    const isMatch = await bcryptjs.compare(password, userExists.password);
    if (!isMatch) return BadRequest(res, "Login failed!");

    const payload = {
      _id: userExists._id,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    res.send({ user: userExists, token, userType: "airline" });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
