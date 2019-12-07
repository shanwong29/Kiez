const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
//const User = require("../models/User");
const Event = require("../models/Events");
//const geocoder = require("geocoder");
const geocoder = require("google-geocoder");
let geo = geocoder({
  key: process.env.geocodeKey
});

// const convertAddressToCoordinates = (street, houseNumber, postalCode, city) => {

// }

geolocation = (street, houseNumber, postalCode, city) => {
  return new Promise((resolve, reject) => {
    geo.find(
      `${street} ${houseNumber}, ${postalCode} ${city} Germany`,
      (err, res) => {
        if (err) return reject(err);
        console.log(
          "GEOCODE RESULT-array-element:",
          // res[0].formatted_address,
          res[0]
        );
        resolve(res[0]);
      }
    );
  });
};

// POST route => to create a new event

router.post("/", (req, res, next) => {
  // console.log("Event DATA:", req.body);
  const {
    name,
    street,
    houseNumber,
    city,
    postalCode,
    date,
    time,
    imageUrl,
    description
  } = req.body;


  // function call:
  geolocation(street, houseNumber, postalCode, city).then(geocodeData => {
    // this location parameter comes from resolve(res[0].location);

    Event.create({
      type: "event",
      name,
      address: {
        street,
        houseNumber,
        city,
        postalCode,
        //coordinates: [],
        coordinates: geocodeData.location,
        formattedAddress: geocodeData.formatted_address
      },
      date,
      time,
      imageUrl,
      description,
      creater: req.user._id,
      join: []
    })
      .then(response => {
        console.log(response);
        res.json(response);
      })
      .catch(err => {
        res.json(err);
      });
  });
});

// GET route => to get all the events
router.get("/myevents", (req, res, next) => {
  //console.log('hi')

  Event.find()
    .then(allTheEvents => {
      //console.log("allEVENTSSSSSSSSS:", allTheEvents);
      res.json(allTheEvents);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET route => to get a specific event detailed view
router.get("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Event.findById(req.params.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT route => to update a specific event
router.put("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
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
    description
  } = req.body;

  geolocation(street, houseNumber, postalCode, city).then(geocodeData => {
    console.log("hereee");
    Event.findByIdAndUpdate(req.params.id, {
      type: "event",
      name,
      address: {
        street,
        houseNumber,
        city,
        postalCode,
        coordinates: geocodeData.location,
        formattedAddress: geocodeData.formatted_address
      },
      date,
      time,
      imageUrl,
      description
    })
      .then(() => {
        res.json({
          message: `Event with ${req.params.id} is update successfully`
        });
      })
      .catch(err => {
        res.json(err);
      });
  });
});

// DELETE route => to delete a specific event
router.delete("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Event.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        message: `Event with ${req.params.id} is removed successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
