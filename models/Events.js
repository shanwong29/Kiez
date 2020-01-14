const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  // required true also on the frontend-side!

  type: { type: String, required: true },

  name: String,

  address: {
    type: Schema.Types.Mixed,
    required: true
  },

  date: { type: Date, required: true },

  time: String,

  imageUrl: String,

  description: String,

  creater: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],

  join: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
