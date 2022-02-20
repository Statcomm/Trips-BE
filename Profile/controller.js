const { find } = require("../db/models/Profile");
const Profile = require("../db/models/Profile");

exports.getProfile = async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("profile.user");
    res.status(201).json(profiles);
  } catch (e) {
    console.log(e);
  }
};

exports.newProfile = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;
    const profileNew = await Profile.create(req.body);
    console.log(
      "🚀 ~ file: conterller.js ~ line 17 ~ exports.newProfile= ~ profileNew",
      profileNew
    );

    return res.json(profileNew);
  } catch (error) {
    console.log(error);
  }
};
