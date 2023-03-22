const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const collection = require('../model/user');

router.get('/forgot-password', (req, res) => {
    res.render('forgot-password',{message:null});
  });
  
  
  router.get('/',(req,res)=>{
   res.render("mainPage", {message:null});
  });
  router.get('/HistoricNorth', (req, res) => {
    res.render('HistoricNorth');
  });
  router.get('/contact', (req, res) => {
    res.render('contact');
  });
  
  
  router.get('/signup',function(req,res){
    res.render('signup');
  
  });
  
  router.get('/login',function(req,res){
    res.render('login',{message:null});
    
    
  });

  

router.post("/signup",async (req,res)=>{


    const {firstname, lastname,email, mobile,gender, dob, country, password} = req.body;
  
   
   //     //await collection.insertMany([data])
    try{
      const user = new collection({firstname, lastname,email, mobile,gender, dob, country, password});
         
      await user.save();
      
       res.render("login",{message:null});
   }
   catch (err){
   
    // const errors=handleErrors(err);
    //  res.status(400).json({errors});
    //const errors = handleErrors(err);
    res.render('signup');
     
     
   }
  });
 
  // Login API endpoint
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by username
      const user = await collection.findOne({ email });
  
      if (!user) {
        res.status(401).render('login', { message: 'The user not found in the database' });
        return;
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        res.status(401).render('login', { message: 'You entered wrong password' });
        return;
      }
  
      // Successful login
      res.render("home");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await collection.findOne({ email });
  
      if (!user) {
        res.render('forgot-password',{ message: 'The user not found in the database' });
        return;
       
      }
  
      const token = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires =  Date.now() + 3600000; // 1 hour
  
      await user.save();
  
  
      const transporter = nodemailer.createTransport({
        service: 'GMAIL',
        auth: {
          user: Email,
          pass: Password,
        },
      });
      
  
      const mailOptions = {
        to:user.email,
        from:Email,
        subject: 'Password Reset',
        
       html:`<p>Please click <a href="http://localhost:5000/reset-password/${token}">here</a> to reset your
        password</p>`
  
  
  
      };
  
      await transporter.sendMail(mailOptions);
      
      res.status(200).send('An email has been sent to you with further instructions.');
    } catch (err) {
      console.error(err);
      res.render('forgot-password',{ message: "please enter the required data" });
      
    }
  });
  
  
  
  
  router.get('/reset-password/:token', async (req, res) => {
    try {
      const user = await collection.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now()},
      });
  
      if (!user) {
        return res.status(404).send('Password reset token is invalid or has expired.');
      }
  
      res.render('reset-password', { token: req.params.token });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    
    try {
      const user = await collection.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(404).send('Yoooo Password reset token is invalid or has expired.');
      }
  
      if (user.resetPasswordExpires < Date.now()) {
        return res.status(404).send('Password reset token has expired.');
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      
      await user.save();
  
      
  
          const transporter = nodemailer.createTransport({
            service:"GMAIL",
            auth: {
              user: Email,
              pass: Password,
            },
          });
      
          const mailOptions = {
            From:Email,
            to: user.email,
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' +
              'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
          };
      
          await transporter.sendMail(mailOptions);
      
          res.status(200).send('Your password has been reset successfully');
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
        
      
  });

  module.exports = router;
