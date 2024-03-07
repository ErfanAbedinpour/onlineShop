const productModel = require("../models/product");
const CommentModel = require("../models/comments");

const add = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const comment = await CommentModel.create({
    text,
    user: req.user._id,
  });
  await productModel.findByIdAndUpdate(id, {
    $push: { comments: comment._id },
  });
  res.redirect(`/product/details/${id}`);
};

module.exports = {
  add,
};
