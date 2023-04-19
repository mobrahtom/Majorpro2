const express=require('express')
const router =express.Router();
const info=require('../model/user')
const bodyParser=require('body-parser');
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());

  
  router.post('/update', async (req, res) => {
    try {
      const fName = req.body.fname;
      const lName = req.body.lname;
      const Pass = req.body.newPass;
      const conPass = req.body.confirmPass;

      const user= new info({
        fName,
        lName,
        Pass,
        conPass
      });
       await user.save();
      res.render('home');
  
      //console.log('Successfully updated information:', updatedUser);
      //res.status(200).send('Information updated successfully.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating information.');
    }
  });
  
  
  module.exports = router;