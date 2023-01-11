const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/myntra',{useNewUrlParser:true,useCreateIndex:true });
var con=mongoose.Collection;
var userSchema=new mongoose.Schema({
    name:{
        type:String,

       
    },
    phoneno:{
        type:String,
        
      
    },
  

   





});
var userModel=mongoose.model('phoneno',userSchema);
module.exports=userModel;