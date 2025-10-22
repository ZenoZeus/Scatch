const mongoose=require("mongoose")
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/scatch')
        console.log("Connection Successfull!")
    }
    catch(err)
    {
        console.log("Connection Error!")
    }
module.exports=mongoose.connection;
