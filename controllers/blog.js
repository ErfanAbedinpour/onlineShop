const BlogModel = require("../models/blog");

const shows = async (req, res) => {
  const blogs = await BlogModel.find({});
  res.render("blog", {
    blogs,
  });
};

const addBlog = async (req, res) => {
  try {
    if (
      req.file.mimetype != "image/jpeg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/gif"
    ) {
      req.flash("error", "لطفا فرمت فایل صحیح نیست");
      return res.redirect(req.originalUrl);
    }
    const { title, describe, subject } = req.body;
    const b = new BlogModel({
      title,
      describe: describe.trim(),
      subject,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      user: req.user._id,
    });
    await b.save();
    req.flash("succsess", "با موفقیت اضافه شد");
    res.redirect(req.originalUrl);
  } catch (err) {
    req.flash("error", err.message);
    res.redirect(req.originalUrl);
  }
};
module.exports = {
  shows,
  addBlog,
};
