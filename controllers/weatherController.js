// GET Weather data and save it to a file
function getWeatherData(weatherAPI) {
  return async (req, res) => {
    const zipcode = req.params.zipcode;
    try {
      const weatherData = await weatherAPI.fetchWeatherData(zipcode);
      const entry = {
        zipcode,
        weatherData,
      };
      const updated = weatherAPI.saveOrUpdateWeatherData(entry);
      res.json(
        updated ? entry : { message: 'Weather data updated successfully' }
      );
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  };
}

// DELETE weather data from an existing file
function deleteWeatherData(weatherAPI) {
  return (req, res) => {
    const zipcode = req.params.zipcode;
    try {
      const deleted = weatherAPI.removeWeatherData(zipcode);
      if (deleted) {
        res.json({ message: 'Weather data deleted successfully' });
      } else {
        res.status(404).json({ error: 'Weather data not found' });
      }
    } catch (error) {
      console.error('Error deleting weather data:', error);
      res.status(500).json({ error: 'Failed to delete weather data' });
    }
  };
}

module.exports = {
  getWeatherData,
  deleteWeatherData,
};
