const userModel = require("../models/user");
const banModel = require("../models/ban");
const bcrypt = require("bcrypt");
const showUsers = async (req, res) => {
  const users = await userModel.find({});
  res.render("usersList", {
    users,
  });
};

const ban = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() == id) {
    req.flash("error", "شما نمیتوانید خودتان را بن کنید");
    return res.redirect("/user/");
  }
  const user = await userModel.findByIdAndUpdate(id, {
    $set: { isBan: true },
  });
  await banModel.create({
    user: user._id,
  });
  res.redirect("/user/");
};

const unBan = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() == id) {
    req.flash("error", "شما نمیتوانید خودتان را بن کنید");
    return res.redirect("/user/");
  }
  const user = await userModel.findByIdAndUpdate(id, {
    $set: { isBan: false },
  });
  await banModel.deleteOne({
    user: user._id,
  });
  res.redirect("/user/");
};

const remove = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() == id) {
    req.flash("error", "شما نمیتوانید خودتان را حذف کنید");
    return res.redirect("/user/");
  }
  await userModel.findByIdAndDelete(id);
  res.redirect("/user/");
};

const addUser = async (req, res) => {
  //Get ReqBody
  const { userName, identified, role, password } = req.body;
  console.log("ROle is", role);
  //Check User identified
  const isExsistIdentified = await userModel.findOne({
    identified,
  });
  if (isExsistIdentified) {
    req.flash(
      "error",
      "این شماره یا ایمیل قبلان  توسط یکی دیگر قبلان استفاده شده"
    );
    return res.redirect(req.originalUrl);
  }
  //Register User
  const HashPass = await bcrypt.hash(password, 11);
  await userModel.create({
    userName,
    password: HashPass,
    identified,
    role,
  });
  //Send Response
  res.redirect("/");
};

const search = async (req, res) => {};
module.exports = {
  showUsers,
  ban,
  remove,
  addUser,
  unBan,
  search,
};
