const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  // required true also on the frontend-side!

  name: String,
  // required: true

  address: {
    type: Schema.Types.Mixed
  },

  date: Date,
  // required: true

  time: String,
  // required: true

  imageUrl: String,

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
