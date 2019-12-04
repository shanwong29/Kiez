const express = require("express");
const mongoose = require("express");
const router = express.Router();
//const User = require("../models/User");
const Event = require("../models/Events");

// POST route => to create a new event

router.post("/events", (req, res, next) => {
  console.log(req.body);
  const {
    name,
    street,
    houseNumber,
    city,
    // addressCoordinates,
    date,
    time,
    photo,
    description
    //creater,
    //join
  } = req.body;
  Event.create(
    {
      // ToDo: addressCoordinates
      name,
      street,
      houseNumber,
      city,
      addressCoordinates: [53, 13], //???? geocoding-function
      date,
      time,
      photo,
      description,
      // creater: req.user._id,  /// undefined????????????
      join: []
    },
    {
      new: true
    }
  )
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET route => to get all the events
router.get("/events", (req, res, next) => {
  Event.find()
    .then(allTheEvents => {
      res.json(allTheEvents);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET route => to get a specific event detailed view
router.get("/events/:id", (req, res, next) => {
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
router.put("/events/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Event.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Event with ${req.params.id} is update successfully`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE route => to delete a specific event
router.delete("/events/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Event.findByIdAndRemove(req.paramd.id)
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
