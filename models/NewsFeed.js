const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsFeedSchema = new Schema({
  content: String,
  Date: {
    type: Date,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  Like: { type: Number, default: 0 }
});

const NewsFeed = mongoose.model("Comment", newsFeedSchema);

module.exports = NewsFeed;
