const mongoose= require("mongoose")
const bcrypt = require("bcrypt");
const { isEmail}=require('validator');
const err = require("express");
let uri="mongodb://127.0.0.1:27017/mydb"


mongoose.set('strictQuery',false);
mongoose.connect(uri)
.then(()=>{
    console.log("Mongodb connected");
})
.catch(() =>{
    console.log("failed to login");
})
const signupUser= new mongoose.Schema({
    firstname:{
        type:String,
        //required:[true, 'Your first name should be filled']
    },
    lastname:{
        type:String,
        //required:[true,'Your last should be filled']
    },
    email:{
        type:String,
        // required:[true,'Please enter your email'],
         unique:true,
        // lowercase: true,
        // validate:[isEmail,'please Enter a valid email']
        
    },
    mobile:{
        type:Number,
        //required:[true, 'Please Enter your phone number']
    },
    gender:{
        type:String,
        //equired:[true,'please choose your gender']
    },
   
dob:{
    type:Date,
   // required:[true,'Enter your birthdate']
},
country:{ type:String,
    //required:[true,'choose your country please']
        
},
password:{ 
    type:String,
    //required:,

        
},
resetPasswordToken: String,
resetPasswordExpires: Date,

});

//static signup data
signupUser.statics.signup= async function(email, password){
    const exists= await this.findOne({email});
    if(exists)
   throw Error("email is already in use");

}

signupUser.pre('save', async function (next) {
    const user = this;
  
    if (!user.isModified('password')) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
  
    user.password = hashedPassword;
    next();
  });

const collection = new mongoose.model("collection1", signupUser);

module.exports=collection;
  