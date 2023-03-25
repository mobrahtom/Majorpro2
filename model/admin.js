const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  location: {
    type: String,
    
  },
  description: {
    type: String,
    
  }
});

const Places = mongoose.model('Places', placeSchema);

module.exports = Places;

