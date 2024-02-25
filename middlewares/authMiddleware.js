//Check auth Method To Check User input For Auth in WebSite
const CheckMethod = (req, res, next) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const identified = req.body?.identified;
  if (!identified) {
    return res.status(400).json({
      status: false,
      msg: "identifid is required",
    });
  } else if (identified.match(emailRegex)) {
    req.body["method"] = "email";
  } else {
    req.body["method"] = "phone";
  }
  next();
};

module.exports = {
  CheckMethod,
};
