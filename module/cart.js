const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/myntra',{useNewUrlParser:true,useCreateIndex:true });
var con=mongoose.Collection;
var userSchema=new mongoose.Schema({
    image:{
        type:String,

       
    },
    info:{
        type:String,
        
      
    },
  

   





});
var userModel=mongoose.model('cart',userSchema);
module.exports=userModel;