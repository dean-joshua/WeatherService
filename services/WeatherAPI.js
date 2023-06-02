const axios = require('axios');
const fs = require('fs');

class WeatherAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  // Fetch request
  async fetchWeatherData(zipcode) {
    const url = `http://api.weatherstack.com/current?access_key=${this.apiKey}&query=${zipcode}`;

    const response = await axios.get(url);
    return response.data;
  }

  // Save some data as a file
  saveOrUpdateWeatherData(entry) {
    const filename = 'weather.json';

    let entries = [];
    if (fs.existsSync(filename)) {
      const fileContent = fs.readFileSync(filename, 'utf8');
      entries = JSON.parse(fileContent);
    }

    const existingEntryIndex = entries.findIndex(
      (item) => item.zipcode === entry.zipcode
    );
    if (existingEntryIndex !== -1) {
      entries[existingEntryIndex] = entry;
    } else {
      entries.push(entry);
    }

    fs.writeFileSync(filename, JSON.stringify(entries));
    return existingEntryIndex !== -1;
  }

  // Delete some data from a file based on a "zipcode"
  removeWeatherData(zipcode) {
    const filename = 'weather.json';

    if (fs.existsSync(filename)) {
      const fileContent = fs.readFileSync(filename, 'utf8');
      let entries = JSON.parse(fileContent);

      const index = entries.findIndex((entry) => entry.zipcode === zipcode);
      if (index !== -1) {
        entries.splice(index, 1);
        fs.writeFileSync(filename, JSON.stringify(entries));
        return true;
      }
    }

    return false;
  }
}

module.exports = WeatherAPI;
