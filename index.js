const express = require('express');
const app = express();
require('dotenv').config();

const path =require("path");
const ejs= require('ejs');
const bodyParser = require("body-parser");

const userRoutes=require('./routes/user')
 

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())


const Email= process.env.myemail;
const Password= process.env.mypassword;

app.use('/user', userRoutes);

//handle errors
// const handleErrors=(err)=>{
//   console.log(err.message,err.code);
//   let error={ email:'',password:''}
  //duplicate email errors
  // if(err.code === 11000){
  //     error.email='That email is already registered';
  //     return error;
  // }
  //validation errors
//   if(err.message.includes('collection1 validation failed')){
//   Object.values(err.errors).forEach(({properties})=> {
//       error[properties.path]= properties.message;
//   });
  /*}*/

//    return error;
// }

app.use(express.urlencoded({extended:false}))
const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
console.log(`Server listening on your PORT`);
  });











