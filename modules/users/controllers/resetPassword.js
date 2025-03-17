const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, newPassword, resetCode } = req.body;

  if (!email) throw "Email is requires";
  if (!newPassword) throw "Please provide new password";
  if (!resetCode) throw "Reset code is required";
  if (newPassword < 5) throw "Password must be at least 5 characters";

  const getUserWithResetCode = await usersModel.findOne({
    email,
    resetCode,
  });

  if (!getUserWithResetCode) throw "Reset code does not match";

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await usersModel.updateOne(
    {
      email,
    },
    { password: hashedPassword, resetCode: "" },
    { runValidators: true }
  );

  await emailManager(
      email,
      `Your password reset successfully`,
      `Your password was reset. If you have not done that please contact us.`,
      "Password reset successfully"
    );

  res.status(200).json({
    status: "success",
    message: "Password reset successfully!",
  });
};

module.exports = resetPassword;
