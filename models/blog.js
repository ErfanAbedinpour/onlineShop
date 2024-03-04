const mongoose = require("mongoose");
require("dotenv").config();
(async () => {
  await mongoose.connect(process.env["URL"]);
})();

const blogSchma = new mongoose.Schema({
  title: { type: String, required: true },
  describe: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true },
  image: {
    data: Buffer,
    contentType: String,
  },
  subject: { type: String, enums: ["Computer", "accounting", "graphic"] },
});

const blog = mongoose.model("Blog", blogSchma);

module.exports = blog;
