const jwt = require("jsonwebtoken");
const Airline = require("../models/Airline");
const User = require("../models/User");

const AuthAirLine = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      throw new Error("Access Denied!");
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const userExists = await Airline.findOne({
      _id: decoded._id,
      status: "active",
    });
    if (!userExists) {
      throw new Error("Access Denied!");
    }
    req.user = userExists;
    req.token = token;
    next();
  } catch (err) {
    res
      .status(401)
      .send(err.message ? { messages: [{ message: err.message }] } : err);
  }
};

const AuthUser = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      throw new Error("Access Denied!");
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const userExists = await User.findOne({
      _id: decoded._id,
      status: "active",
    });
    if (!userExists) {
      throw new Error("Access Denied!");
    }
    req.user = userExists;
    req.token = token;
    next();
  } catch (err) {
    res
      .status(401)
      .send(err.message ? { messages: [{ message: err.message }] } : err);
  }
};

module.exports = {
  AuthAirLine,
  AuthUser,
};
