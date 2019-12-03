const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  addressCoordinates: {
    type: [],
    // with 2 el, long & lat
    required: true
  },

  Date: {
    type: Date,
    required: true
  },
  Time: {
    type: String,
    required: true
  },

  photo: {
    type: String
  },

  description: {
    type: String
  },

  join: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Event = mongoose.model("User", eventSchema);

module.exports = Event;
