const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/myntra',{useNewUrlParser:true,useCreateIndex:true });
var con=mongoose.Collection;
var userSchema=new mongoose.Schema({
    name:{
        type:String,
     },
    password:{
        type:String,
},
});
var userModel=mongoose.model('myntra',userSchema);
module.exports=userModel;