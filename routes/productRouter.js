const express = require('express');
const router = express.Router();
const multerConfig = require("../config/multerConfig.js");
const productModel = require("../models/productModel.js");

router.post('/create', multerConfig.upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    if (!req.file) {
      return res.status(400).send("Image file is required");
    }

    // ✅ If using memoryStorage:
    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor
    });

    // Optional flash message (works only if you use express-flash & session)
    req.flash("success", "Product created successfully!");

    res.redirect("/owner/admin");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
