// routes/weatherRoutes.js
const express = require('express');
const weatherController = require('../controllers/weatherController');

function weatherRoutes(weatherAPI) {
  const router = express.Router();

  router.get('/:zipcode', weatherController.getWeatherData(weatherAPI));
  router.delete('/:zipcode', weatherController.deleteWeatherData(weatherAPI));

  return router;
}

module.exports = weatherRoutes;
