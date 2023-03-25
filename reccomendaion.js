const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'recommendedPlaces';

// Connect to MongoDB
MongoClient.connect(url, function(err, client) {
  if (err) throw err;
  console.log("Connected to MongoDB");

  const db = client.db(dbName);

  // Route to retrieve recommended places based on past experience
  app.get('/recommendations/:userId', function(req, res) {
    const userId = req.params.userId;

    // Query the database to retrieve user data and recommended places
    db.collection('users').findOne({ _id: userId }, function(err, user) {
      if (err) throw err;

      const pastExperience = user.pastExperience;
      const recommendedPlaces = [];

      // Query the database to retrieve recommended places based on past experience
      db.collection('places').find({ tags: { $in: pastExperience } }).toArray(function(err, places) {
        if (err) throw err;

        // Add recommended places to the array
        places.forEach(function(place) {
          recommendedPlaces.push({
            name: place.name,
            image: place.image,
            description: place.description
          });
        });

        // Return the recommended places as JSON
        res.json(recommendedPlaces);
      });
    });
  });

  app.listen(3000, function() {
    console.log("Server is running on port 3000");
  });
});
