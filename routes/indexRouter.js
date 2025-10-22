const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/isLoggedIn.js");
const productModel = require("../models/productModel.js");
const userModel = require("../models/userModel.js");


router.get("/", (req, res) => {
    let getFlashError=req.flash("error")
    let getSuccessMsg=req.flash("success")
    res.render("index15",{error:getFlashError,isloggerin:false,success:getSuccessMsg})
});

router.get("/shop",isLoggedIn,async (req,res)=>{
    let getProduct =await productModel.find()
    let success=req.flash("success")
    res.render("shop",{products:getProduct,success});
});
router.get("/cart",isLoggedIn,async (req,res)=>{
    let getUser=await userModel.findOne({email:req.user.email}).populate("cart")
    let remove=req.flash("remove")
    res.render("cart",{getUser,remove})
});

router.get("/addtocart/:productid",isLoggedIn,async (req,res)=>{
    console.log(req.user.email)
    let getUser=await userModel.findOne({email:req.user.email})
    console.log(getUser)
    getUser.cart.push(req.params.productid)
    await getUser.save()
    req.flash("success","Added to cart!")
    res.redirect("/shop")
})

router.get("/removefromcart/:productid", isLoggedIn, async (req, res) => {
  const getUser = await userModel.findOne({ email: req.user.email });
  getUser.cart = getUser.cart.filter(
    (item) => item.toString() !== req.params.productid
  );
  await getUser.save();
  res.redirect("/cart");
});

module.exports = router;
