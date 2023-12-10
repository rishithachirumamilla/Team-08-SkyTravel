const express = require("express");
const { GenerateError } = require("../../helpers/errors");
const Airline = require("../../models/Airline");
const Route = require("../../models/Route");
const Schedule = require("../../models/Schedule");
const router = express.Router();

router.get("/filteredFlights", async (req, res) => {
  try {
    let { from, to, date } = req.query;

    console.log(req.query);

    let filters = { departureTime: { $gt: new Date() } };

    if (from && to) {
      let routes = await Route.find({
        "departure.city": { $regex: new RegExp(from, "i") },
        "destination.city": { $regex: new RegExp(to, "i") },
      });

      routes = routes.map(rt => rt._id);
      filters._route = routes;
    }

    if (date) {
      date = new Date(date);
      // Set the start and end of the day for the selected date
      let dateStart = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()+1,
        0,
        0,
        0
      );
      let dateEnd = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()+1,
        23,
        59,
        59
      );
      console.log('dateStart:', dateStart);
console.log('dateEnd:', dateEnd);

      // Update the filters to use the selected date range
      filters.departureTime = { $gte: dateStart, $lte: dateEnd };
    }

    const schedules = await Schedule.find({
      ...filters,
    })
      .populate({
        path: "_airline",
        model: "airline",
      }).populate({
        path:"_flight",
        model:"flight",
      })
      .populate({
        path: "_route",
        model: "route",
      })
      .sort({
        departureTime: "-1",
      });

    res.send({ schedules });
  } catch (err) {
    GenerateError(res, err);
  }
});

router.get("/airlines", async (req, res) => {
  try {
    const airlines = await Airline.find({}).select("name");
    res.send({ airlines });
  } catch (err) {
    GenerateError(res, err);
  }
});

module.exports = router;
