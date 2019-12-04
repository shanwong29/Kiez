const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const referenceSchema = new Schema({
  content: [],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  evaluation: {
    type: String,
    required: true
  },
  typeOfHelp: {
    type: String,
    requied: true
  },
  hours: Number
});

const Reference = mongoose.model("Reference", referenceSchema);

module.exports = Reference;
