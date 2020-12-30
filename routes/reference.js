const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Reference = require("../models/Reference");
const { loginCheck } = require("../service/loginCheck");

router.post("/", loginCheck(), async (req, res, next) => {
  if (req.body.recievedCredit < 0) {
    return res.status(409).json("Cannot give negative credit");
  }

  if (req.body.profileOwner == req.user.id) {
    return res.status(409).json("Cannot leave reference to your own profile");
  }

  try {
    const newReference = await Reference.create({
      content: req.body.content,
      author: req.user._id /* it is author's id */,
      rating: req.body.rating,
      recievedCredit: req.body.recievedCredit,
    });

    // add reference to the profile owner + increment profile owner's credit
    const profileOwner = await User.findByIdAndUpdate(
      req.body.profileOwner,
      {
        $push: { reference: newReference._id },
        $inc: { credits: req.body.recievedCredit },
      },
      { new: true }
    ).populate({
      path: "reference",
      populate: { path: "author", select: "username imageUrl" },
    });

    // decrement author's credit
    const author = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { credits: -1 * req.body.recievedCredit } },
      { new: true }
    );

    res.json({
      profileOwnerData: {
        credits: profileOwner.credits,
        reference: profileOwner.reference,
      },
      authorData: { credits: author.credits },
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
