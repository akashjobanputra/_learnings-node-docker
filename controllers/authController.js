const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "failed",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username,
    });
    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "User not found." });
    }
    const isMatching = await bcrypt.compare(password, user.password);
    if (isMatching) {
      req.session.user = user;
      return res.status(200).json({ status: "success" });
    }
    res.status(400).json({
      status: "failed",
      message: "incorrect username password",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "failed",
    });
  }
};
