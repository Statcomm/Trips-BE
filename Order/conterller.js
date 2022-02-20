const { find } = require("../db/models/Order");
const Order = require("../db/models/Order");

exports.getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("order.product");
    res.status(201).json(orders);
  } catch (e) {
    console.log(e);
  }
};

exports.newOrder = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;
    const orderNew = await Order.create(req.body);
    console.log(
      "🚀 ~ file: conterller.js ~ line 17 ~ exports.newOrder= ~ orderNew",
      orderNew
    );

    return res.json(orderNew);
  } catch (error) {
    console.log(error);
  }
};
