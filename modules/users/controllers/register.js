const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { name, email, password, confirm_password, balance } = req.body;

  const getDuplicateEmail = await usersModel.findOne({ email });

  //validations
  if (!email) throw "Email must be provided";
  if (!name) throw "Name must be provided";
  if (!password) throw "Password must be provided";
  if (password.length < 5) throw "Password must be at least 5 characters";
  if (password !== confirm_password) throw "Passwords do not match";
  if (getDuplicateEmail) throw "This email already exists";

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    name,
    email,
    password: hashedPassword,
    balance,
  });

  const accessToken = jwtManager(createdUser);

  await emailManager(
    createdUser.email,
    "Weclome to expense tracker",
    "<h1>Welcom to expense tracker. We are happy you chose our service.",
    "Welcome to expense tracker pro"
  );

  res.status(200).json({
    status: "success",
    message: "User registered",
    accessToken,
  });
};

module.exports = register;
