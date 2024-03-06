require("dotenv").config();
const mongoose = require("mongoose");
const JDate = require("jalali-date");

//Create User model

(async () => {
  await mongoose.connect(process.env["URL"]);
})();

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    date: {
      type: String,
      default: new JDate().format("dddd DD MMMM YYYY"),
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
