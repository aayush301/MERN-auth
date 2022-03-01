const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, body);
    res.status(200).json({ user, msg: "Profile updated successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}