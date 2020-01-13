const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

router.post("/chat-msg", (req, res, next) => {
  Chat.create({
    chatMsg: req.body.chatMsg,
    sender: req.user._id,
    reciever: req.body.reciever
  })
    .then(newMsg => {
      res.json(newMsg);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/chat-msg", (req, res) => {
  Chat.find({})
    .populate({ path: "sender" })
    .populate({ path: "reciever" })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
