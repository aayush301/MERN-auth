const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ACCESS_TOKEN_SECRET } = process.env;


exports.verifyAccessToken = (req, res, next) => {

  const token = req.header("Authorization");
  if (!token) return res.status(400).json({ msg: "Token not found" });
  let user;
  try {
    user = jwt.verify(token, ACCESS_TOKEN_SECRET);
  }
  catch (err) {
    return res.status(400).json({ msg: "Invalid token" });
  }

  req.user = user;
  next();
}


exports.verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "admin") return res.status(400).json({ msg: "Not allowed to access this route" });
    next();
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server Error" });
  }
}