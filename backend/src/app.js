const express =  require("express");
const app = express();
require("./db/mongo");
const port= process.env.PORT || 3000;
const path=require('path');
const Register = require('./models/registerid.js');
const { connection } = require("mongoose");


const template_path= path.join(__dirname,'../template/views');
app.set('view engine','hbs');
app.set('views',template_path);

app.use(express.static(path.join(__dirname,'../public')));
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res) => {
    res.render('index')
    
})
app.get('/register',(req,res) => {
  res.render('index')
  
})
app.get('/',(req,res)=>{
  res.render('register')
})
app.get('/login',(req,res)=>{
  res.render('register');
})

app.post('/ids',async(req,res) =>{
   try{
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;


    if(password==cpassword){
    const registerid = new Register({
    fullname: req.body.fullname,
    email: req.body.email,
    gender:req.body.gender,
    dateofbirth:req.body.dateofbirth,
    password:password,
    confirmpassword:cpassword
   
  })
  const registered = await registerid.save();
  res.status(201).render('register');
  }else{
    res.send("passwords not matching")
  }  
  
} catch(error){
  console.log(error);
  res.status(400).send(error);
}
})

app.post('/login', async (req, res) => {
  try {
    const email = req.body.logemail;
    const password = req.body.logpassword;

const user = await Register.findOne({ email: email });

    if (user) {
      if (user.password==password) {
        console.log("Login successful");
        res.status(201).render("main");
      } else {
        console.log("Password does not match");
        res.send("Password does not match");
      }
    } else {
      console.log("User not found");
      res.send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid");
  }
});





app.listen(port,()=>{
    console.log (`listing to the port ${port}`);
})