const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { generateToken } = require("../utils/generateToken.js");
const zod = require("zod");

const userValidationSchema = zod.object({
  fullname: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(4),
});

exports.registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  const validation = userValidationSchema.safeParse({ fullname, email, password });

  if (!validation.success) {
    return res.status(400).json({ Error: "Invalid values" });
  }

  try {
    if (await userModel.findOne({ email })) {
      return res.status(401).send("User already exists, kindly login");
    }

    const hash = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({ fullname, email, password: hash });

    const token = generateToken(createdUser);
    res.cookie("token", token, { httpOnly: true });
    req.flash("success","User created!")
    res.redirect("/");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getUser = await userModel.findOne({ email });
    if (!getUser) return res.status(401).send("Invalid email or password!");

    const isMatch = await bcrypt.compare(password, getUser.password);
    if (!isMatch) return res.status(401).send("Invalid email or password!");

    const token = generateToken(getUser);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/shop");
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
