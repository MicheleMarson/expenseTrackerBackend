const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await usersModel.findOne({ email });
  console.log(!getUser);

  if (!getUser) throw "This email is not registered!";

  const hashedPassword = getUser.password;
  const comparePassword = await bcrypt.compare(password, hashedPassword);

  if (!comparePassword) throw "Email and password do not match";

  const accessToken = jwtManager(getUser)

  res.status(200).json({
    status: "success",
    message: "User loged in",
    accessToken,
  });
};

module.exports = login;
