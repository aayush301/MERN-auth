const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendActivationEmail, sendResetPasswordEmail } = require("../utils/email");
const { createActivationToken, createAccessToken, createRefreshToken, } = require("../utils/token");
const { validateEmail } = require("../utils/validation");
const { CLIENT_BASE_URL, ACTIVATION_TOKEN_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;



exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    if (password.length < 4) {
      return res.status(400).json({ msg: "Password length must be atleast 4 characters" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "This email is already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = { name, email, password: passwordHash };
    const activationToken = createActivationToken(newUser);
    const url = `${CLIENT_BASE_URL}/auth/activate-account/${activationToken}`;
    await sendActivationEmail(email, url);
    res.status(200).json({ msg: "Please click on the activation link we sent to your email to complete your registration.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }

}


exports.activateAccount = async (req, res) => {
  let user;
  try {
    const { activationToken } = req.body;
    user = jwt.verify(activationToken, ACTIVATION_TOKEN_SECRET);
  }
  catch (err) {
    return res.status(400).json({ msg: "Wrong credentials" });
  }

  try {
    const { name, email, password } = user;
    const checkUser = await User.findOne({ email });
    if (checkUser) return res.status(400).json({ msg: "This email already exists!!" });
    await User.create({ name, email, password });
    res.status(200).json({ msg: "Congratulations!! Account has been activated.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "This email is not registered!!" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Password incorrect!!" });

    const refreshToken = createRefreshToken({ id: user._id });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/auth/renew-access-token",
      maxAge: 7 * 24 * 60 * 60 * 1000   // 7 days
    });
    res.status(200).json({ msg: "Login successful.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


exports.renewAccessToken = async (req, res) => {
  let user;
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(400).json({ msg: "Refresh token not found!! Please login first" });
    user = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  }
  catch (err) {
    return res.status(400).json({ msg: "Refresh token not valid!! Please login again" });
  }

  try {
    const accessToken = createAccessToken({ id: user.id });
    res.status(200).json({ accessToken });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "This email is not registered" });

    const accessToken = createAccessToken({ id: user._id });
    const url = `${CLIENT_BASE_URL}/auth/reset-password/${accessToken}`;
    sendResetPasswordEmail(email, url);
    res.json({ msg: "Please check your email so that you can reset your password!!" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(req.user.id, { password: passwordHash });
    res.status(200).json({ msg: "Password changed successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}


exports.logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", { path: "/api/auth/renew-access-token" });
    return res.json({ msg: "Logged out successfully" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}