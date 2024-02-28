const mailModel = require("../models/mail");
const sendEmail = require("../utils/sendMail");

const SendMail = async (req, res) => {
  //   if (!req.user.isLogin) {
  //     req.flash("error", "برای ارسال انتقاد پیشنهاد باید لاگین کنید");
  //     return res.redirect("/");
  //   }
  const { userName, email, text, phone } = req.body;
  await mailModel.create({
    userName,
    email,
    text,
    phone,
  });
  req.flash("succses", "با موفقیت ارسال شد");
  res.redirect("/");
};

const showMailBox = async (req, res) => {
  const mails = await mailModel.find({}).select("-__v");
  if (mails.length >= 1) {
    req.flash("mails", mails);
  }
  res.render("mailBox");
};

const deleteMail = async (req, res) => {
  const { id } = req.params;
  await mailModel.deleteOne({
    _id: id,
  });
  res.redirect("/mail/");
};

const showAnswerPage = async (req, res) => {
  const { id } = req.params;
  const user = await mailModel.findById(id).select("-__v");
  res.render("answerMail", {
    user,
  });
};

const sendAnswer = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const { email } = await mailModel.findById(id);
  if (await sendEmail(email, "خیلی ممنون از ثبت نظر شما", text)) {
    await mailModel.findByIdAndUpdate(id, {
      $set: { isAnswer: true },
    });
    return res.redirect("/mail/");
  } else {
    throw new Error("در اسال ایمیل مشکلی پیش امد");
  }
};

module.exports = {
  SendMail,
  showMailBox,
  deleteMail,
  showAnswerPage,
  sendAnswer,
};
