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

        res.status(500).send('Error adding new place.');
       // res.render('adminAccount');
    }
});


router.get('/search', async (req, res) => {
    try {
      const places = await Places.find();
      res.render('search', { places });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving places.' });
    }
});


module.exports=router;

