const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Reference = require("../models/Reference");

router.post("/", (req, res, next) => {
  Reference.create({
    content: req.body.content,
    author: req.body.author /* it is author's id */,
    rating: req.body.rating,
    recievedCredit: req.body.recievedCredit
  }).then(newReference => {
    return User.findByIdAndUpdate(
      req.body.profileOwner,
      { $push: { reference: newReference._id } },
      { new: true }
    )
      .populate({ path: "reference", populate: { path: "author" } })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.json(err);
      });
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
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
