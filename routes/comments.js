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
    return Event.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: newComment._id } },
      { new: true }
    )
      .populate({ path: "comments", populate: { path: "author" } })
      .then(event => {
        response.json(event);
      })

      .catch(err => {
        response.json(err);
      });
  });
});

router.put("/:id", (req, response, next) => {
  const commentId = req.body.commentId;
  Event.findByIdAndUpdate(req.params.id, { $pull: { comments: commentId } })
    .then(event => {
      response.json(event);

      return Comment.deleteOne({ _id: commentId })
        .then(doc => {
          console.log("deleled comment?", doc);
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      response.json(err);
    });
});

module.exports = router;
