const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const referenceSchema = new Schema({
  content: [],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  rating: {
    type: String,
    required: true
  },

  recieveCredit: Number
});

const Reference = mongoose.model("Reference", referenceSchema);

module.exports = Reference;
