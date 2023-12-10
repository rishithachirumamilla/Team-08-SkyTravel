const express = require("express");
const {
  GenerateError,
  BadRequest,
  ServerError,
} = require("../../helpers/errors");
const Airline = require("../../models/Airline");
const Schedule = require("../../models/Schedule");
const router = express.Router();
const axios = require('axios');
router.post("/", async (req, res) => {
  try {
    let { _flight, _route, departureTime, arrivalTime, desc } = req.body;
    const { _id } = req.user;

    departureTime = new Date(departureTime);
    arrivalTime = new Date(arrivalTime);

    const scheduleExists = await Schedule.findOne({
      _flight,
      $and: [
        {
          departureTime: { $gte: departureTime },
          arrivalTime: { $lte: departureTime },
        },
      ],
    });
    if (scheduleExists)
      return BadRequest(res, "Schedule already exists at selected time!");

    const schedule = new Schedule({
      _airline: _id,
      _flight,
      _route,
      departureTime,
      arrivalTime,
      desc,
    });
    let response = await schedule.save();
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    response = await Schedule.findById(response._id)
      .populate({
        path: "_airline",
        model: "airline",
      })
      .populate({
        path: "_route",
        model: "route",
      });

    res.send({
      schedule: response,
    });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.get("/", async (req, res) => {
  try {
    const { _id } = req.user;

    const schedules = await Schedule.find({ _airline: _id })
      .sort({
        departureTime: "-1",
      })
      .populate({
        path: "_airline",
        model: "airline",
      })
      .populate({
        path: "_route",
        model: "route",
      });
    if (!schedules) return ServerError(res, "Opps! Something went wrong!");

    res.send({ schedules });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.put("/", async (req, res) => {
  try {
    const { _id } = req.body;

    const scheduleExists = await Schedule.findOne({
      _airline: req.user._id,
      _id: _id,
    });
    if (!scheduleExists) return BadRequest(res, "Schedule Unavailable!");

    const response = await Schedule.findByIdAndUpdate(
      _id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    )
      .populate({
        path: "_airline",
        model: "airline",
      })
      .populate({
        path: "_route",
        model: "route",
      });
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    res.send({ schedule: response, message: "Schedule updated successfully!" });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.delete("/:_schedule", async (req, res) => {
  try {
    const { _schedule } = req.params;
    const { _id } = req.user;
    const apiUrl = `http://localhost:5000/api/user/sendcancelledemailbulk/${_schedule}`;
      const apiResponse = await axios.post(apiUrl);
      if(apiResponse.status!=200){
        return ServerError(res, "Opps!Something went wrong!");
      }
    const scheduleExists = await Schedule.findOne({
      _id: _schedule,
      _airline: _id,
    });
    if (!scheduleExists) return BadRequest(res, "Schedule Unavailable!");

    const response = await Schedule.findByIdAndRemove(_schedule);
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    res.send({ message: "Schedule deleted successfully!" });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
