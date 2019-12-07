const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const referenceSchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  rating: {
    type: Number,
    default: 0
  },

  recieveCredit: Number
});

const Reference = mongoose.model("Reference", referenceSchema);

module.exports = Reference;
