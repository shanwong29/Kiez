const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  // required true on the frontend-side!!!!!!!!!!!!!
  name: String,

  addressCoordinates: [],
  // with 2 el, long & lat

  address: [],
  // with 2 el, long & lat

  street: String,
  houseNumber: Number,
  city: String,

  date: Date,
  // required: true
  time: String,
  // required: true

  photo: String,

  description: String,

  creater: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  join: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
