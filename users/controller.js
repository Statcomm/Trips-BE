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
    name: `${newUser.firstName} ${newUser.lastName}`,
    email: newUser.email,
  };
  return jwt.sign(payload, JWT_SECRET);
};
exports.signUp = async (req, res, next) => {
  try {
    //STEP ONE: encrypt the password
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
    });
    const profile = await Profile.create({
      owner: user._id,
      image: req.body.image,
      bio: req.body.bio,
    });

    //STEP THREE:the data that I want to send to the user in the inside Token and create it
    const token = generateToken(user);
    //STEP FOUR: Show the Token
    res.status(201).json({ token });
    res.status(201).json({ profile });
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  const token = generateToken(req.user);
  res.status(200).json({ token: token });
};
