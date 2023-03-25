const mongoose= require("mongoose")
const bcrypt = require("bcrypt");

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
        
    },
    lastname:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    mobile:{
        type:Number,
        
    },
    gender:{
        type:String,
        
    },
   
dob:{
    type:Date,
   
},
country:{ type:String,
    
        
},
password:{ 
    type:String,
    

        
},
resetPasswordToken: String,
resetPasswordExpires: Date,

});



signupUser.pre('save', async function (next) {
    const user = this;
  
    if (!user.isModified('password')|| !user.password) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
  
    user.password = hashedPassword;
    next();
    
  });

 

const collection = new mongoose.model("collection1", signupUser);

module.exports=collection;
  