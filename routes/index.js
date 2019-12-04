const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const Reference = require("../models/Reference");

router.get("/users", (req, res) => {
  // return all users
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

// return profile owner
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

module.exports = router;
