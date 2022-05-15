const catchAsync = require("../middlewares/async");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const ApiError = require("../utils/ApiError");
const MailService = require("../utils/MailService");
const Token = require("../models/Token");

exports.register = catchAsync(async (req, res) => {
  const { name, email, password, age, role } = req.body;
  const user = await User.create({ name, email, password, age, role });
  res.status(201).json({ success: true, data: user });
  await MailService.sendMail(
    email,
    "Wellcome to MyBook",
    `You have successfully registered an account ${email}`
  );
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  // kiem tra email tren db
  const existedUser = await User.findOne({ email });
  if (!existedUser) {
    throw new ApiError(400, "Email or password is incorrect");
  }

  const isMatch = bcrypt.compareSync(password, existedUser.password);
  if (!isMatch) {
    throw new ApiError(400, "Email or password is incorrect");
  }

  const token = jwt.sign(
    {
      email: existedUser.email,
      name: existedUser.name,
      role: existedUser.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.json({
    success: true,
    token,
  });
});

exports.updatePassword = catchAsync(async (req, res) => {
  const email = req.user.email;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "Not Found");
  const hashPassword = user.password;
  const { oldPassword, newPassword } = req.body;
  const isMatch = bcrypt.compareSync(oldPassword, hashPassword);
  if (!isMatch) {
    throw new ApiError(400, "Password invalid");
  }
  user.password = newPassword;
  await user.save();
  res.json({
    success: true,
    message: "Your password updated",
  });
});

exports.forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "Not Email !!!");
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User does not exist !!!");
  const token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }
  const tokenReset = crypto.randomBytes(32).toString("hex");
  await Token.create({
    userId: user._id,
    token: bcrypt.hashSync(tokenReset, bcrypt.genSaltSync()),
  });
  const link = `http://localhost:3000/auth/passwordReset?token=${tokenReset}&id=${user._id}`;
  res.json({
    success: true,
    message: "Have sent reset link to your email",
  });
  await MailService.sendMail(email, "Password Reset", link);
});

exports.resetPassword = catchAsync(async (req, res) => {
  const { userId, token, newPassword } = req.body;
  const userToken = await Token.findOne({ userId });

  // kiem tra xem trong db con token khong => vi sau 5p db xoa
  if (!userToken) throw new ApiError(400, "Invalid Token");

  // kiem tra token trong db co giong khong
  const isMatchToken = bcrypt.compareSync(token, userToken.token);
  if (!isMatchToken || !token) {
    throw new ApiError(400, "Invalid Token");
  }

  const user = await User.findOne({ _id: userId });
  user.password = newPassword;
  const result = await user.save();
  if (result) {
    await userToken.remove();
  }

  res.json({
    success: true,
    message: "Your password updated",
  });
});
