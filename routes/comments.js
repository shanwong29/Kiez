const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Event = require("../models/Events");
const { loginCheck } = require("../service/loginCheck");

router.post("/:id", loginCheck(), (req, response, next) => {
  const { content, author } = req.body;
  Comment.create({
    content,
    date: new Date(),
    author,
  }).then((newComment) => {
    return Event.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: newComment._id } },
      { new: true }
    )
      .populate({
        path: "comments",
        populate: { path: "author", select: "username imageUrl" },
      })
      .then((event) => {
        response.json(event);
      })
      .catch((err) => {
        response.json(err);
      });
  });
});

router.put("/:id", loginCheck(), async (req, response, next) => {
  const commentId = req.body.commentId;
  const comment = await Comment.findById(commentId);

  if (comment.author.toString() !== req.user.id) {
    return response.status(403).json("forbidden");
  }

  Event.findByIdAndUpdate(req.params.id, { $pull: { comments: commentId } })
    .then((event) => {
      response.json(event);

      return Comment.deleteOne({ _id: commentId })
        .then((doc) => {
          console.log("deleled comment?", doc);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      response.json(err);
    });
});

module.exports = router;
