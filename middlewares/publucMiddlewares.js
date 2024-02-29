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
  req.isLogin = true;
  const { id } = jsonwebtoken.verify(token, process.env["KEY"]);
  req.user = await userModel
    .findById(id)
    .select("-password -__v -createdAt -updatedAt");
  next();
};

//Get User Role
const isAdmin = async (req, res, next) => {
  if (req.user?.role === "ADMIN") {
    req.isAdmin = true;
    req.mailCount = await mailModel.countDocuments();
    return next();
  }
  req.isAdmin = false;
  next();
};

module.exports = {
  getUser,
  isAdmin,
};
