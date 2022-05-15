const catchAsync = require("../middlewares/async");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find({});
  res.json({ success: true, data: users });
});

exports.getUserDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "Not Found");
  res.json({ success: true, data: user });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ApiError(404, "Not Found");
  res.json({ success: true, data: user });
});

exports.updateRoleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: id },
    { role },
    { new: true }
  );

  res.json({
    success: true,
    data: user,
  });
});
