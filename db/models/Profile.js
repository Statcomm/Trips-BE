const mongoose = require("mongoose");
// const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ProfileSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
    bio: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
