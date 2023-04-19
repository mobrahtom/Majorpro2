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

// Create a text index on the "description" field
placeSchema.index({ description: 'text' });
const Places = mongoose.model('Places', placeSchema);

module.exports = Places;

