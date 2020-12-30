const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

const { loginCheck } = require("../service/loginCheck");

router.post("/chat-msg", loginCheck(), (req, res, next) => {
  Chat.create({
    chatMsg: req.body.chatMsg,
    sender: req.user._id,
    reciever: req.body.reciever,
  })
    .then((newMsg) => {
      res.json(newMsg);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/chat-msg", loginCheck(), (req, res) => {
  Chat.find({ $or: [{ sender: req.user._id }, { reciever: req.user._id }] })
    .sort({ createdAt: 1 })
    .populate({ path: "sender", select: "username imageUrl" })
    .populate({ path: "reciever", select: "username imageUrl" })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
