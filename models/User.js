const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  addressCoordinates: {
    type: [],
    // with 2 el, long & lat
    required: true
  },
  photo: {
    type: String
  },
  offerStuff: {
    type: []
  },
  offerService: {
    type: []
  },
  credits: {
    type: Number,
    default: 50
  },
  aboutMe: {
    type: String
  },
  reference: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reference"
    }
  ],
  event: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ],

  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
