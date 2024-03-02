//Auth controller Login Handler
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
require("dotenv").config();

//Singup Controller
const singup = async (req, res) => {
  //Get ReqBody
  const data = { ...req.body };
  //Check User identified
  const isExsistIdentified = await userModel.findOne({
    identified: data.identified,
  });

  if (isExsistIdentified) {
    req.flash(
      "error",
      "این شماره یا ایمیل قبلان  توسط یکی دیگر قبلان استفاده شده"
    );
    return res.redirect(req.originalUrl);
  }
  //Register User
  const HashPass = await bcrypt.hash(data.password, 11);
  const countOfDoc = await userModel.countDocuments();
  await userModel.create({
    userName: data.userName,
    password: HashPass,
    identified: data.identified,
    role: countOfDoc == 0 ? "ADMIN" : "USER",
  });
  //Send Response
  res.redirect("/auth/login");
};

//Login Controller
const login = async (req, res) => {
  //Check To if Token Exsist
  let token = req.cookies?.token;
  if (token) {
    return res.redirect("/");
  }
  const { identified, password } = req.body;
  //Check To veryfy identified
  const user = await userModel.findOne({
    identified,
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    req.flash("error", "ایمیل یا رمز عبور اشتباه است");
    return res.redirect(req.originalUrl);
  }
  if (user.isBan) {
    req.flash("error", "شما توسط ادمین بن شده اید");
    return res.redirect(req.originalUrl);
  }
  //Retuen User Object
  token = jsonwebtoken.sign({ id: user._id }, process.env["KEY"], {
    expiresIn: "30 day",
  });
  res.cookie("token", token);
  //Sending Response
  return res.redirect("/");
};

const resetPassword = async (req, res) => {
  //Get User identofied if exsist on DB Got To Change it
  const { identified } = req.body;
  const user = await userModel.findOne({
    identified,
  });
  if (!user) {
    req.flash("error", "ایمیل یا شماره تماس اشتباه است");
    return res.redirect(req.originalUrl);
  }
  const token = jsonwebtoken.sign({ identified }, process.env["KEY"], {
    expiresIn: "20min",
  });
  res.cookie("resetToken", token, {
    httpOnly: true,
  });
  if (
    await sendMail(
      identified,
      "ریکاوری پسورد",
      `http://localhost:3000/auth/change-password/${token}`
    )
  ) {
    req.flash("succses", "ایمیل با موفقیت ارسال شد");
    res.redirect(req.originalUrl);
  }
};

const changePassword = async (req, res) => {
  //Chenges Password
  const { resetToken } = req.cookies;
  try {
    const { identified } = jsonwebtoken.verify(resetToken, process.env["KEY"]);
    const { password } = req.body;
    const HashPass = await bcrypt.hash(password, 11);
    await userModel.findOneAndUpdate(
      {
        identified,
      },
      {
        $set: { password: HashPass },
      }
    );
    //Here  Must Render Page
    res.clearCookie("resetToken");
    res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
    res.redirect("/404");
  }
};

module.exports = {
  singup,
  login,
  resetPassword,
  changePassword,
};
