const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (!req.cookies?.token) {
      return res.status(401).json({ error: "Token missing or user not logged in" });
    }

    const decoded = jwt.verify(req.cookies.token, "hey");
    const getUser = await userModel.findOne({ email: decoded.email }).select("-password");

    if (!getUser) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = getUser;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
