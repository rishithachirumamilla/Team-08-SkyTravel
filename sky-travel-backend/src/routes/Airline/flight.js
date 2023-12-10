const express = require("express");
const router = express.Router();
const Flight = require("../../models/Flight");
const {
  GenerateError,
  BadRequest,
  ServerError,
} = require("../../helpers/errors");
const Route = require("../../models/Route");
const Schedule = require("../../models/Schedule");

router.post("/", async (req, res) => {
  try {
    const {
      title,
      flightNumber,
      economyCapacity,
      businessCapacity,
      firstClassCapacity,
    } = req.body;

    const { _id } = req.user;

    const flight = new Flight({
      _airline: _id,
      title,
      flightNumber,
      economyCapacity,
      businessCapacity,
      firstClassCapacity,
      economyAvailable:economyCapacity,
      businessAvailable:businessCapacity,
      firstClassAvailable:firstClassCapacity,
    });

    let response = await flight.save();

    response = await response.populate({
      model: "airline",
      path: "_airline",
    });

    res.send({ airline: response });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.get("/", async (req, res) => {
  try {
    const { _id } = req.user;

    const flights = await Flight.find({ _airline: _id })
      .sort({
        createdAt: "-1",
      })
      .populate({
        model: "airline",
        path: "_airline",
        select: "name image",
      });

    res.send({ flights });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.delete("/:_flight", async (req, res) => {
  try {
    const { _flight } = req.params;
    const { _id } = req.user;

    const flightExists = await Flight.findOne({
      _id: _flight,
      _airline: _id,
    });
    if (!flightExists) return BadRequest(res, "Flight does not exists!");

    const [flightRes, routeRes, scheduleRes] = await Promise.all([
      Flight.findByIdAndRemove(_flight),
      Route.deleteMany({ _flight }),
      Schedule.deleteMany({
        _flight,
      }),
    ]);
    if (!flightRes || !routeRes || !scheduleRes)
      return ServerError(res, "Opps!Something went wrong!");

    res.send({ message: "Flight deleted successfully!" });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.put("/", async (req, res) => {
  try {
    const { _id } = req.body;
    const _airline = req.user._id;

    const flightExists = await Flight.findOne({
      _id,
      _airline: _airline,
    });
    if (!flightExists) return BadRequest(res, "Flight does not exists!");

    const response = await Flight.findByIdAndUpdate(
      _id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    ).populate({
      model: "airline",
      path: "_airline",
      select: "name image",
    });
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    res.send({ flight: response, message: "Flight updated successfully!" });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
