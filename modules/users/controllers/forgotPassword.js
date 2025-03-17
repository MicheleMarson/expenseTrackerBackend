const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager");

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email } = req.body;
  const getUser = await usersModel.findOne({ email });

  if (!email) throw "Email is required";
  if (!getUser) throw "THis email does not exist";

  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await usersModel.updateOne({ email }, { resetCode }, { runValidators: true });

  await emailManager(
    email,
    `Your password reset code is ${resetCode}`,
    `Reset your password</h1><p>Your password reset code is ${resetCode}</p>`,
    "Reset password - expense tracker pro"
  );

  res.status(200).json({
    status: "success",
    message: "Reset code sent",
  });
};

module.exports = forgotPassword;
