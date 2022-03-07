const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/key");
const Profile = require("../db/models/Profile");

const generateToken = (newUser) => {
  const payload = {
    username: newUser.username,
    id: newUser.id,
    exp: Date.now() + JWT_EXPIRATION_MS,

    email: newUser.email,
  };
  return jwt.sign(payload, JWT_SECRET);
};
exports.signUp = async (req, res, next) => {
  try {
    //STEP ONE: encrypt the password
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
    req.body.password = hashedPassword;
    console.log(
      "🚀 ~ file: controller.js ~ line 23 ~ exports.signUp= ~ req.body",
      req.body
    );

    //STEP TWO: send the hash password
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      image: req.body.image,
    });
    const profile = await Profile.create({
      owner: user._id,
      bio: req.body.bio,
    });
    const profileAndUser = profile + user;
    console.log(
      "🚀 ~ file: controller.js ~ line 43 ~ exports.signUp= ~ profileAndUser",
      profileAndUser
    );

    //STEP THREE:the data that I want to send to the user in the inside Token and create it
    const token = generateToken(profileAndUser);
    //STEP FOUR: Show the Token
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  const token = generateToken(req.user);
  res.status(200).json({ token: token });
};
