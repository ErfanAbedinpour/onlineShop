const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../models/user");
const mailModel = require("../models/mail");

require("dotenv").config();

//Get User With Token
const getUser = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    req.isLogin = false;
    return next();
  }
  const { id } = jsonwebtoken.verify(token, process.env["KEY"]);
  const user = await userModel
    .findById(id)
    .select("-password -__v -createdAt -updatedAt");
  if (user) {
    req.isLogin = true;
    req.user = user;
  }
  next();
};

//Get User Role
const isAdmin = async (req, res, next) => {
  if (req.user?.role === "ADMIN") {
    req.isAdmin = true;
    req.mailCount = (await mailModel.countDocuments()).toString() || "0";
    return next();
  }
  req.isAdmin = false;
  next();
};

module.exports = {
  getUser,
  isAdmin,
};
