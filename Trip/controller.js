const Trip = require("../db/models/Trip");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findById(tripId);
    return trip;
  } catch (err) {
    next(err);
  }
};

exports.getTrips = async (req, res, next) => {
  try {
    //this mothed take only what inside the ""
    const tripArray = await Trip.find().populate("owner");
    res.json(tripArray);
  } catch (err) {
    next(err);
  }
};

exports.getDetail = async (req, res, next) => {
  try {
    const oneTrip = await Trip.findById({ _id: req.trip.id });
    // const oneTrip = trips.find((e) => e.id === +id);
    res.json(oneTrip);
  } catch (err) {
    next(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    await Trip.findByIdAndDelete({
      _id: req.trip.id,
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    // }
    console.log(req.body); //new:true to to show the update after change immiditly
    const trip = await Trip.findByIdAndUpdate({ _id: req.trip.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(trip);
  } catch (err) {
    next(err);
  }
};

exports.createTrip = async (req, res, next) => {
  console.log(
    "🚀 ~ file: controller.js ~ line 63 ~ exports.createTrip= ~ req.body",
    req.body
  );
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
    }

    req.body.owner = req.user._id;
    const newTrip = await Trip.create(req.body);
    return res.json(newTrip);
  } catch (err) {
    next(err);
  }
};
