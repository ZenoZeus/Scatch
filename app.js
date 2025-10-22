// install package express mongoose jwt cookieparser bcrypt multer path crypto
// this project will be on industry standard and will be a benificial one handling in seperation of concern
//we will think of model

// we will use multer's proper structure folder format
// make config folder create multerconfig.js
// setup diskStorage
// export upload variable

//Multer and using crypto
// we install multer and then crypto multer can use disk storage code from net
// we use crypto and randomBytes to generate value for unique name of length 12
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto"); // Importing crypto
const mongoose=require("./config/mongooseConnection.js")
const indexRouter=require("./routes/indexRouter.js")
const userRouter=require("./routes/userRouter.js")
const ownerRouter=require("./routes/ownerRouter.js")
const productRouter=require("./routes/productRouter.js")
const generateToken=require("./utils/generateToken.js");
const flash = require("connect-flash");
const expressSession = require("express-session");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.set("view engine","ejs")
app.use(expressSession({resave:false,saveUninitialized:false,secret:"hey"}))
app.use(flash())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser());
app.use("/",indexRouter)
app.use("/user",userRouter);
app.use("/owner",ownerRouter);
app.use("/product",productRouter);


app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
