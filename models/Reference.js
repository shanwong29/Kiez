const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const referenceSchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },

  recievedCredit: { type: Number, required: true }
});

const Reference = mongoose.model("Reference", referenceSchema);

module.exports = Reference;
