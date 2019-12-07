const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Reference = require("../models/Reference");

router.post("/", (req, res, next) => {
  Reference.create({
    content: req.body.content,
    author: req.body.author,
    rating: req.body.rating
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/credits/profile-owner", (req, res, next) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { credits: req.body.credits },
    { new: true }
  )

    .then(response => {
      res.json(response);
      console.log(response);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/credits/author", (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.author,
    { credits: req.body.authorCredits },
    { new: true }
  )

    .then(response => {
      res.json(response);
      console.log(response);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;

// User.findOneAndUpdate(
//   { username: req.body.name },
//   { credits: req.body.credits },
//   { new: true }
// )
