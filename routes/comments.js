const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Comment = require("../models/Comment")
const Event = require("../models/Events")

router.post("/:id", (req, res, next) => {
  const { content, date, imageUrl, author} = req.body;

  Comment.create({
    content, date, imageUrl, author
  }).then(newComment => {
    console.log("RESPONSE SERVER:", response);

    return Event.findByIdAndUpdate(req.params.id, {$push: {comments: newComment._id}}, {new: true}) 
  })
  .catch(err => {
    res.json(err)
  })
})

module.exports = router;