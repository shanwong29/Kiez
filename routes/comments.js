const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Comment = require("../models/Comment");
const Event = require("../models/Events");

router.post("/:id", (req, response, next) => {
  const { content, date, author } = req.body;
  Comment.create({
    content,
    date,
    author
  }).then(newComment => {
    console.log("RESPONSE SERVER:", newComment);
    return Event.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: newComment._id } },
      { new: true }
    )
      .populate({ path: "comments", populate: { path: "author" } })
      .then(event => {
        console.log(event);
        response.json(event);
      })

      .catch(err => {
        response.json(err);
      });
  });
});

module.exports = router;
