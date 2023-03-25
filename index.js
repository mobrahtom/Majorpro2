const express = require('express');
const app = express();
require('dotenv').config();
const { isEmail}=require('validator');
const path =require("path");
const ejs= require('ejs');
const bodyParser = require("body-parser");
const bcrypt=require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const collection=require('./user');
const info = require('./routes/user')
const place=require('./routes/admin');

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
const session = require('express-session');
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

//const adminRoutes= require('./routes/admin');

//app.use('/admin', adminRoutes);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(place);
app.use(info);

app.post("/adminlogin", (req, res) => {

  const EMAIL = "baman@gmail.com";
const ADMIN_PASSWORD = 'Tilahun21';
const {email, password}=req.body;


      if (email !== EMAIL) {

        res.status(401).render('adminLogin', { message: 'The user not found in the database' });
        return;
      }
  

      try {
          if (password === ADMIN_PASSWORD) {
              res. status(200).render('adminAccount', {message:'Login successful'});
          } else {
              res.status(401).render('adminLogin', { message: "Password incorrect" });
          }
      } catch (e) {
          console.log(e);
          res.send(e);
      }
  res.render("adminAccount");
});

app.get("/adminlogin", (req, res) => {
  res.render("adminlogin",{message:null});
});

app.post('/adminlogout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      } else {
        res.redirect('/adminlogin');
      }
    });
  } else {
    res.redirect('/adminlogin');
  }
});


const Email= process.env.myemail;
const Password= process.env.mypassword;

app.get('/forgot-password', (req, res) => {
    res.render('forgot-password',{message:null});
  });
  
  
  app.get('/',(req,res)=>{
   res.render("mainPage", {message:null});
  });
  app.get('/HistoricNorth', (req, res) => {
    res.render('HistoricNorth');
  });
  app.get('/contact', (req, res) => {
    res.render('contact');
  });
  app.get('/culture', (req, res) => {
    res.render('culture');
  });
  app.get('/History', (req, res) => {
    res.render('History');
  });
  app.get('/lalibela', (req, res) => {
    res.render('lalibela');
  });
  app.get('/ashenda', (req, res) => {
    res.render('ashenda');
  });

  app.get('/lucy', (req, res) => {
    res.render('lucy');
  });

  app.get('/axum', (req, res) => {
    res.render('axum');
  });

  app.get('/adwa', (req, res) => {
    res.render('adwa');
  });

  app.get('/timket', (req, res) => {
    res.render('timket');
  });

  app.get('/eretale', (req, res) => {
    res.render('eretale');
  });
  app.get('/hareri', (req, res) => {
    res.render('hareri');
  });
  app.get('/irrecha', (req, res) => {
    res.render('irrecha');
  });
  
  app.get('/culturalSouth', (req, res) => {
    res.render('culturalSouth');
  });

  app.get('/arbaminch', (req, res) => {
    res.render('arbaminch');
  });

  app.get('/konso', (req, res) => {
    res.render('konso');
  });

  app.get('/mangoPark', (req, res) => {
    res.render('mangoPark');
  });

  app.get('/omoPark', (req, res) => {
    res.render('omoPark');
  });

  app.get('/lakeHawassa', (req, res) => {
    res.render('lakeHawassa');
  });

  app.get('/jinka', (req, res) => {
    res.render('jinka');
  });





  
  
  app.get('/signup',function(req,res){
    res.render('signup');
  
  });
  
  app.get('/login',function(req,res){
    res.render('login',{message:null});
    
    
  });

  
app.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      } else {
        res.redirect('/login');
      }
    });
  } else {
    res.redirect('/login');
  }
});

  app.post("/signup", async (req, res) => {
    const { firstname, lastname, email, mobile, gender, dob, country, password } = req.body;

    const errors = {};
    if (!isEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    try {
      const user = new collection({ firstname, lastname, email, mobile, gender, dob, country, password });
      await user.save();
      res.render("login", {message:null});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
    
 
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await collection.findOne({ email });
  
      if (!user) {
        res.status(401).render('login', { message: 'The user not found in the database' });
        return;
      }
  
      if (typeof password !== 'string' || typeof user.password !== 'string') {
        res.status(500).render('login', { message: 'Invalid password or user password' });
        return;
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        res.status(401).render('login', { message: 'You entered wrong password' });
        return;
      }
  
      // Login successful, redirect to dashboard
      res.render('home');
    } catch (err) {
      if (err.code === 11000) {
        errors.email = 'Email already in use';
      }
      res.render('signup', { errors });
    }
  
  });
  

  app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await collection.findOne({ email });
  
      if (!user) {
        res.render('forgot-password',{ message: 'Please Enter the correct username' });
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
  
  
  
  
  app.get('/reset-password/:token', async (req, res) => {
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
  
  
  app.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    
    try {
      const user = await collection.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(404).send('hello! the Password reset token is invalid or has expired.');
      }
  
      if (user.resetPasswordExpires < Date.now()) {
        return res.status(404).send('Password reset token has expired.');
      }
  
      
  
      user.password = password;
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

  
//     // Function to authenticate users
//      function authenticateUser  (email, password, done){

      
// const EMAIL = "baman@gmail.com";
// const ADMIN_PASSWORD = 'Tilahun21';

//       if (email !== EMAIL) {
//           return done(null, false, { message: "No user found with that email" });
//       }

//       try {
//           if (password === ADMIN_PASSWORD) {
//               return done(null, { email });
//           } else {
//               return done(null, false, { message: "Password incorrect" });
//           }
//       } catch (e) {
//           console.log(e);
//           return done(e);
//       }
//   }


app.use(express.urlencoded({extended:false}))
const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
console.log(`Server listening on your PORT`);
  });











