const mongoose = require('mongoose')

  

  // Set up the MongoDB schema and model for the data
  const Info = new mongoose.Schema({
    fname: String,
    lname:String,
    newPass:String,
    confirmPass:String,
    
    });
  
    const info = mongoose.model('information', Info);
    module.exports=info;