const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const zod = require("zod");
const generateToken=require("../utils/generateToken.js")
const authController=require("../controllers/authController")

const userValidationSchema = zod.object({
    fullname: zod.string(),
    email: zod.email(),
    password: zod.string().min(4),
});

router.get("/", (req, res) => {
    res.send("user section");
});

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logout);

module.exports = router;
