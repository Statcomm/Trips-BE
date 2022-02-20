const Product = require("../db/models/Product");

exports.fetchProduct = async (productId, next) => {
  try {
    const prodcut = await Product.findById(productId);
    return prodcut;
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    //this mothed take only what inside the ""
    const productArray = await Product.find();
    res.json(productArray);
  } catch (err) {
    next(err);
  }
};

exports.getDetail = async (req, res, next) => {
  try {
    const oneProduct = await Product.findById({ _id: req.prodcut.id });
    // const oneProduct = products.find((e) => e.id === +id);
    res.json(oneProduct);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete({
      _id: req.product.id,
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    console.log(req.body); //new:true to to show the update after change immiditly
    const product = await Product.findByIdAndUpdate(
      { _id: req.product.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(product);
  } catch (err) {
    next(err);
  }
};
