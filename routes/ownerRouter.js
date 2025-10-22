const express = require('express')
const ownerModel=require("../models/ownerModel")
const router = express.Router()
const bcrypt=require("bcrypt")
const path=require("path")



// router.post('/create',async (req, res) => {
//   let getOwner=await ownerModel.find()
//   if(getOwner.length>0){res.send("No new owner creation allowed")}
//   else
//   {
//     try{let {fullname ,email ,password}=req.body;
//     bcrypt.hash(password,10,async(err,hash)=>{
//         let createdOwner=ownerModel.create({fullname,email,password})
        
//     res.send("User creation successfull!")
//     })
//     }
//     catch(err)
//     {console.log(err.msg)}
//   }
// })

router.get("/admin",(req,res)=>{
  let success=req.flash("success")
  res.render("createproducts",{success:success})
})

module.exports =router;
