const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Events");
const { loginCheck } = require("../service/loginCheck");

const geocoder = require("google-geocoder");
let geo = geocoder({
  key: process.env.geocodeKey,
});

///////////////////////////////////////////////////////////////

geolocation = (street, houseNumber, postalCode, city) => {
  return new Promise((resolve, reject) => {
    geo.find(`${street} ${houseNumber}, ${postalCode} ${city}`, (err, res) => {
      if (err) return reject(err);
      resolve(res[0]);
    });
  });
};

/////////////////////////////////////////////////////////////

// POST route => to create a new event

router.post("/", loginCheck(), (req, res, next) => {
  const {
    type,
    name,
    street,
    houseNumber,
    city,
    postalCode,
    date,
    time,
    imageUrl,
    description,
  } = req.body;

  // function call:
  geolocation(street, houseNumber, postalCode, city)
    .then((geocodeData) => {
      // this location parameter comes from resolve(res[0].location);

      Event.create({
        type,
        name,
        address: {
          street,
          houseNumber,
          city,
          postalCode,
          coordinates: geocodeData.location,
          formattedAddress: geocodeData.formatted_address,
        },
        date,
        time,
        imageUrl,
        description,
        creater: req.user._id,
        join: [],
      })
        .then((response) => {
          res.json(response);
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      console.log("err from geocoding", err);
      res.json({
        errMessage:
          "Sorry! The geolocation feature is not supported anymore. You may play around with other features",
      });
    });
});

// GET route => to get all the events
router.get("/myevents", loginCheck(), (req, res, next) => {
  Event.find()
    .populate("creater", "username imageUrl")
    .then((allTheEvents) => {
      res.json(allTheEvents);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET route => to get a specific event detailed view
router.get("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  if (req.user) {
    Event.findById(req.params.id)
      .populate("creater", "username imageUrl")
      .populate("join", "username imageUrl")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username imageUrl" },
      })
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    Event.findById(req.params.id)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

router.put("/eventUpdate", loginCheck(), (req, res) => {
  const { event, userJoins } = req.body;

  if (userJoins) {
    Event.findByIdAndUpdate(
      event._id,
      { $push: { join: req.user._id } },
      { new: true }
    ).then((eventInfo) => {
      console.log("UPDATED EVENT INFO HERE", eventInfo);

      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { joinedEvents: eventInfo._id },
        },
        { new: true }
      )
        .populate("joinedEvents")
        .then((updatedUser) => {
          res.json(eventInfo);
        });
    });
  } else {
    Event.findByIdAndUpdate(
      event._id,
      {
        $pull: { join: req.user._id },
      },
      { new: true }
    ).then((eventInfo) => {
      console.log("UPDATED EVENT INFO HERE", eventInfo);

      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { joinedEvents: eventInfo._id },
        },
        { new: true }
      )
        .populate("joinedEvents")
        .then((updatedUser) => {
          res.json(eventInfo);
        });
    });
  }
});

// PUT route => to update a specific event
router.put("/:id", loginCheck(), async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const event = await Event.findById(req.params.id);
  if (event.creater.toString() != req.user.id) {
    return res.status(403).json("Only event owner can edit this event");
  }

  if (new Date() > event.date) {
    return res.status(409).json("Only future event can be edited");
  }
  const {
    name,
    street,
    houseNumber,
    city,
    postalCode,
    date,
    time,
    imageUrl,
    description,
  } = req.body;

  geolocation(street, houseNumber, postalCode, city)
    .then((geocodeData) => {
      Event.findByIdAndUpdate(req.params.id, {
        type: "event",
        name,
        address: {
          street,
          houseNumber,
          city,
          postalCode,
          coordinates: geocodeData.location,
          formattedAddress: geocodeData.formatted_address,
        },
        date,
        time,
        imageUrl,
        description,
      })
        .then(() => {
          res.json({
            message: `Event with ${req.params.id} is update successfully`,
          });
        })
        .catch((err) => {
          res.json({
            errMessage: err.error_message,
          });
        });
    })
    .catch((err) => {
      console.log("err from geocoding", err);
      res.json({
        errMessage:
          "Sorry! The geolocation feature is not supported anymore. You may play around with other features",
      });
    });
});

// DELETE route => to delete a specific event
router.delete("/:id", loginCheck(), async (req, res, next) => {
  let eventId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const event = await Event.findById(eventId);
  if (event.creater.toString() != req.user.id) {
    return res.status(403).json("Only event owner can delete this event");
  }

  User.updateMany(
    {},
    { $pull: { joinedEvents: eventId } },
    { multi: true },
    function (err, numberAffected) {
      console.log(numberAffected);
    }
  )
    .then(() => {
      Event.findByIdAndRemove(eventId)
        .then((doc) => {
          console.log("deleted doc: ", doc);
          res.json({
            message: `Event with ${eventId} is removed successfully.`,
          });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
