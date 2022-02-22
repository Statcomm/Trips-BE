const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

module.exports = mongoose.model("User", UserSchema);
