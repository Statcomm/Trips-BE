const mongoose = require("mongoose");
// const mongooseSlugPlugin = require("mongoose-slug-plugin");

const OrderSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    order: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, min: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);

/*
items: [
  {
   products: id1,
   quantity: number of 👆🏼 product
  },
  {
    products: id2,
    quantity: number of 👆🏼 product

  },
] 
*/
