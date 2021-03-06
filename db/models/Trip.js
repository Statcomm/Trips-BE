const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const TripSchema = new mongoose.Schema({
  title: { type: String, require: true },
  location: { type: String, require: true },
  description: { type: String },
  image: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
TripSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });
module.exports = mongoose.model("Trip", TripSchema);
