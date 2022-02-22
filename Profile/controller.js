const { find } = require("../db/models/Profile");
const Profile = require("../db/models/Profile");
const Trip = require("../db/models/Trip");

exports.getProfile = async (req, res, next) => {
  try {
    const profiles = await Profile.find()
      .populate("owner trips")
      .populate({ path: "trips", populate: { path: "owner" } });
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

exports.createTrip = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.image = `/${req.file.path}`;
    // }
    const { profileid } = req.params;
    req.body.profile = profileid;
    req.body.owner = req.user._id;
    const newTrip = await Trip.create(req.body);
    await Profile.findByIdAndUpdate(
      { _id: profileid },
      { $push: { trips: newTrip._id } }
    );
    const profileTrip = await Profile.create({ trip: newTrip._id });
    return res.status(201).json(newTrip);
  } catch (err) {
    next(err);
  }
};
