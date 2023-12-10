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
      _flight,
      departure,
      destination,
      economyPricing,
      businessPricing,
      firstClassPricing,
      stops,
    } = req.body;

    const { _id } = req.user;

    console.log(_id, _flight);

    const flightExists = await Flight.findOne({
      _airline: _id,
      _id: _flight,
    });
    if (!flightExists) return BadRequest(res, "Flight data invalid!");

    const route = new Route({
      _flight,
      _airline: _id,
      departure,
      destination,
      economyPricing,
      businessPricing,
      firstClassPricing,
      stops,
    });
    let response = await route.save();
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    response = await Route.findById(response._id)
      .populate({
        model: "airline",
        path: "_airline",
      })
      .populate({
        model: "flight",
        path: "_flight",
      });
    res.send({ route: response });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.get("/", async (req, res) => {
  try {
    const { _id } = req.user;

    const routes = await Route.find({
      _airline: _id,
    })
      .populate({
        model: "airline",
        path: "_airline",
      })
      .populate({
        model: "flight",
        path: "_flight",
      });

    res.send({ routes });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.put("/", async (req, res) => {
  try {
    const { _id } = req.body;
    const _airline = req.user._id;

    console.log(req.body);

    const routeExists = await Route.findOne({
      _airline,
      _id,
    });
    if (!routeExists) return BadRequest(res, "Route Unavailable!");

    const response = await Route.findByIdAndUpdate(
      _id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    )
      .populate({
        model: "airline",
        path: "_airline",
      })
      .populate({
        model: "flight",
        path: "_flight",
      });
    if (!response) return ServerError(res, "Opps!Something went wrong!");

    res.send({ route: response, message: "Route updated successfully!" });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.delete("/:_route", async (req, res) => {
  try {
    const { _id } = req.user;
    const { _route } = req.params;

    const routeExists = await Route.findOne({
      _airline: _id,
      _id: _route,
    });
    if (!routeExists) return BadRequest(res, "Route Unavailable");

    const [responseRoute, scheduleRes] = await Promise.all([
      Route.findByIdAndRemove(_route),
      Schedule.deleteMany({
        _route,
      }),
    ]);
    if (!responseRoute || !scheduleRes)
      return ServerError(res, "Opps!Something went wrong!");

    res.send({ message: "Route deleted successfully!" });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
