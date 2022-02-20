const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ProductSchema = new mongoose.Schema({
  name: { type: String, require: true },
  image: { type: String },
  description: { type: String },
  color: { type: String },
  quantity: { type: Number, min: 1, default: 1 },
  price: { type: Number, min: 0, default: 1.0 },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
});
ProductSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Product", ProductSchema);
