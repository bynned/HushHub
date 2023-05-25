const mongoose = require("mongoose");
const date = require("date-and-time");

const now = new Date();
const UTC = date.addHours(now, 3);
const dateNtime = date.format(UTC, "DD/MM/YYYY HH:mm:ss");

const postsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    default: dateNtime,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      username: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: String,
        default: dateNtime,
      },
    },
  ],
});

module.exports = mongoose.model("posts", postsSchema);