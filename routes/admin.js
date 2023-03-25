if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Importing Libraries that we installed using npm
const express = require("express");
const router= express.Router();

const Places = require('../model/admin');



// Route for adding new place
router.post('/add', async (req, res) => {

    try {
        const { Pname, location, description } = req.body;

        // Create a new place document using the submitted data
        const place = new Places({
             name:Pname,
            location,
            description
        });

        // Save the document to the database
        await place.save();

        // Redirect the user to the home page
        res.render('adminAccount');
    } catch (err) {
        console.log(err);
        res.render('adminAccount');
    }
});

module.exports=router;




//   // Import required modules and dependencies
//   const multer = require('multer');
//   const path = require('path');
//   const mongoose = require('mongoose');
  
//   // Set up the storage engine for storing files
//   const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//           cb(null, './public/uploads/');
//       },
//       filename: function (req, file, cb) {
//           cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//       }
//   });
  
//   // Create a middleware function for uploading files
//   const upload = multer({
//       storage: storage
//   });
  
//   // Set up the MongoDB schema and model for the data
//   const Places = new mongoose.Schema({
//     name: String,
//     location: String,
//     description: String
//     });
  
//     const Place = mongoose.model('listofPlaces', Places);
  
//   router.post('/update', upload.single('file'), async (req, res) => {
//     try {
//       const name = req.body.name;
//       const location = req.body.location;
//       const description = req.body.description;
  
//       const existingPlace = await Place.findOne({ name: name });
  
//       if (!existingPlace) {
//         return res.status(404).send('Place not found.');
//       }
  
//       existingPlace.location = location;
//       existingPlace.description = description;
  
//       const updatedPlace = await existingPlace.save();
  
//       console.log('Successfully updated information:', updatedPlace);
//       res.status(200).send('Information updated successfully.');
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error updating information.');
//     }
//   });
  
  
//   module.exports = router;