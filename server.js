const express = require('express');
const axios = require('axios');

const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3500;
const KEY = process.env.weather_api_key;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

let city = 'Coquitlam'

axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`)
  .then(function (response) {
    // handle success
    console.log(response.data.weather[0]);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });