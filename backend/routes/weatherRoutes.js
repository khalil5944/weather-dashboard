const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../config/db');

// Get current weather by city name
router.get('/current/:city', async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    
    const weatherData = response.data;
    
    const cityName = weatherData.name;
    const country = weatherData.sys.country;
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    
    const query = `
      INSERT INTO search_history (city, country, search_count, last_searched) 
      VALUES ($1, $2, 1, NOW())
      ON CONFLICT (city, country) 
      DO UPDATE SET 
        search_count = search_history.search_count + 1, 
        last_searched = NOW()
      RETURNING *
    `;
    const values = [cityName, country];
    await pool.query(query, values);
    
    res.json({
      city: cityName,
      country: country,
      temp: temperature,
      humidity: humidity,
      windSpeed: windSpeed,
      description: description,
      icon: icon,
      lastUpdated: new Date()
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// NEW: Get weather by coordinates (for geolocation)
router.get('/coordinates/:lat/:lon', async (req, res) => {
  const { lat, lon } = req.params;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    
    const weatherData = response.data;
    const cityName = weatherData.name;
    const country = weatherData.sys.country;
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    
    const query = `
      INSERT INTO search_history (city, country, search_count, last_searched) 
      VALUES ($1, $2, 1, NOW())
      ON CONFLICT (city, country) 
      DO UPDATE SET 
        search_count = search_history.search_count + 1, 
        last_searched = NOW()
      RETURNING *
    `;
    const values = [cityName, country];
    await pool.query(query, values);
    
    res.json({
      city: cityName,
      country: country,
      temp: temperature,
      humidity: humidity,
      windSpeed: windSpeed,
      description: description,
      icon: icon,
      lastUpdated: new Date()
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get 5-day forecast
router.get('/forecast/:city', async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    
    const forecastData = response.data;
    
    const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0);
    
    const formattedForecast = dailyForecast.map(day => ({
      date: day.dt_txt,
      temp: day.main.temp,
      tempMin: day.main.temp_min,
      tempMax: day.main.temp_max,
      humidity: day.main.humidity,
      windSpeed: day.wind.speed,
      description: day.weather[0].description,
      icon: day.weather[0].icon
    }));
    
    res.json(formattedForecast);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

module.exports = router;