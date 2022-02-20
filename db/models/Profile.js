const mongoose = require("mongoose");
// const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ProfileSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, require: true },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
