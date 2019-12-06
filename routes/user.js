const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Reference = require("../models/Reference");

// return all users
router.get("/", (req, res) => {
  Users.find({})
    .populate({
      path: "reference" /* path is key of the data-field from the User Model */,
      // ^^^populates the `reference` field in the model user

      populate: {
        path: "author"
        // model: "User"
        // populates the `author` field in the User Model
      }
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// return one user
router.get("/:username", (req, res) => {
  Users.findOne({ username: req.params.username })
    .populate({
      path: "reference",

      populate: {
        path: "author"
      }
    })
    .then(doc => {
      if (!doc) {
        res.status(404).json({ message: "This user does not exist" });
      } else res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:username", (req, res) => {
  let user = req.params.username;
  let aboutMe = req.body.aboutMe;
  // let aboutMe = req.body.aboutMe;

  Users.findOneAndUpdate(
    { username: user },
    { aboutMe: aboutMe },
    { new: true }
  )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/profile-pic/:username", (req, res) => {
  let user = req.params.username;
  console.log(req.body.imageUrl);

  Users.findOneAndUpdate(
    { username: user },
    { imageUrl: req.body.imageUrl },
    { new: true }
  )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/offer-service/:username", (req, res) => {
  let user = req.params.username;

  Users.findOneAndUpdate(
    { username: user },
    { $push: { offerService: req.body.offerService } },
    { new: true }
  )
    .then(
      doc => {
        res.json(doc);
      }
      // () => console.log(doc)
    )
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
