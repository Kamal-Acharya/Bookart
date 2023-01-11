var express = require('express');
var router = express.Router();

const fast2sms=require('fast-two-sms');
var jwt = require('jsonwebtoken');
const user=require('../module/user');
const userno=require('../module/phone');
const cart=require('../module/cart');

require('dotenv').config();



let rand = Math.random() *1000;
console.log(rand); // say 99.81321410836433

rand = Math.floor(rand); 

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');

  
}
function checkuserlogin(res, req, next) {
  var usertoken = localStorage.getItem('usertoken');
  try {
    var decoded = jwt.verify(usertoken, 'logintoken');
  } catch (err) {
    res.redirect("/login");
  }
  next();
}
/* GET home page. */
function checkname(req, res, next) {
  var username = req.body.name;
  var checkexistname = user.findOne({ name: username });
  checkexistname.exec((err, data) => {
    if (err) throw err;
    if (data) {
      return res.render('sign', { title: 'Signup', win: ' alerady exist name' });
    }
    next();
  });

}
router.get('/', function(req, res, next) {
  var getuser=localStorage.getItem('loginuser');
  console.log(getuser);
var no=userno.findOne({name:getuser});
no.exec((err,doc)=>{
  if(err) throw err;
  else if(doc){
    res.render('index', { title: 'Express' ,acc:getuser,num:doc.phoneno });
  }
  else{
    res.render('index', { title: 'Express' ,acc:"",num:"" });
  }
  
})



});
router.get('/login', function(req, res, next) {
  var getuser=localStorage.getItem('loginuser');
  res.render('login', { title: 'login',acc:getuser,num:" " });
});
router.post('/login',async function(req, res, next) {
  var name=req.body.name;
  var no=req.body.no;
  console.log(no); 
 
  const response= await fast2sms.sendMessage( {authorization : process.env.API_KEY , message : `Welcome to our Myntra Website Your otp is${rand} ` ,  numbers : [no]} );
var user=new userno({
  name:name,
  phoneno:no
});
user.save((err,doc)=>{
  if(err) throw err;
  res.redirect('/otp');
})
// res.send(response);

});

router.get('/sign', function(req, res, next) {
  var getuser=localStorage.getItem('loginuser');
  res.render('sign', { title: 'login' ,win:" ",acc:getuser ,num:" " });
});
router.post('/sign',checkname, function(req, res, next) {
var name=req.body.name;
var password=req.body.pass;
console.log(name);
console.log(password);
var users=new user({
  name:name,
  password:password
});

users.save((err,doc)=>{
  if(err)  throw err;
res.redirect('/myntra');
})
  
});

router.get('/otp', function(req, res, next) {
  var getuser=localStorage.getItem('loginuser');
  res.render('otp', { title: 'login',win:"" ,acc:getuser,num:"" });
});
router.post('/otp', function(req, res, next) {
var otp=req.body.otp;
if(otp==rand)
{
 res.redirect('/sign'); 
}
else{
  res.render('otp', { title: 'login',win:"Worng otp",acc:" ",num:" " });
}

});

router.get('/myntra', function(req, res, next) {
  var getuser=localStorage.getItem('loginuser');
  res.render('myntra', { title: 'login',win:"" ,acc:getuser ,num:"" });
});

router.post('/myntra', function(req, res, next) {

  var name=req.body.name;
  var pass=req.body.pass;

  var checkuser=user.findOne({name:name});
  checkuser.exec((err,doc)=>{
    if(err) throw err;
    var id=doc._id;
    if(doc.password==pass)
    {
var token=jwt.sign({userid:id},'logintoken');
localStorage.setItem('usertoken',token);
localStorage.setItem('loginuser',name);
res.redirect('/');
    }
    else{
      res.render('myntra', { title: 'login',win:"incorrect name or password" });
    }
  })


  
});

router.get('/bag',async function(req, res, next) {
  var getuser=localStorage.getItem('loginuser');
  var carts=cart.find({});
  carts.exec((err,doc)=>{
    if(err) throw err;
    if(doc)
    {
      res.render('bag', { title: 'login' ,win:" ",acc:getuser,num:"" ,imgs:doc,img:" " });
    }
    else
    {
      res.render('bag', { title: 'login' ,win:" ",acc:" ",num:"" ,imgs:" ",img:"" });
    }
    
  })
 
});
router.post('/bag', function(req, res, next) {
  var getuser=localStorage.getItem('loginuser');
  var img=req.body.img;
  var info=req.body.info;
 var cartdata=new cart({
  image:img,
  info:info,
 });
 cartdata.save((err,doc)=>{
  if(err) throw err;
 res.redirect('/');
 })


 
});

router.get('/logout', function(req, res, next) {
  localStorage.removeItem('loginuser');
  localStorage.removeItem('usertoken');
  res.redirect('/');
});

router.get('/rom',function(req,res,next){
  var getuser=localStorage.getItem('loginuser');
  res.render('rom',{ title: 'Express' ,acc:getuser,num:"" });
})

module.exports = router;











































































