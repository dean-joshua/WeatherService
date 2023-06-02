const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); // Using dotenv to get our mongodb uri
const weatherRoutes = require('./routes/weatherRoutes');
const swaggerRoutes = require('./routes/swagger');
const WeatherAPI = require('./services/WeatherAPI');

const app = express();

// Middleware
app.use(express.json());

// Initialize the Weather API
dotenv.config();
const weatherAPI = new WeatherAPI(process.env.API_KEY);

// Routes
app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/', swaggerRoutes);
app.use('/weather', weatherRoutes(weatherAPI));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
