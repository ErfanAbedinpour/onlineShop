require("dotenv").config();
const mongoose = require("mongoose");

//Create User model

(async () => {
  await mongoose.connect(process.env["URL"]);
})();

const banSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const banModel = mongoose.model("ban", banSchema);

module.exports = banModel;
