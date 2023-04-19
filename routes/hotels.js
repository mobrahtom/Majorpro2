const express = require( "express");
const {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} = require("../controller/hotel");
//import Hotel from "../models/Hotel.js";
//import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.get("/",(req, res)=>{
  res.render("hotel.ejs");
});


router.post("/",  createHotel);

//UPDATE
router.put("/:id", updateHotel);
//DELETE
router.delete("/:id", deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

module.exports = router;