const express = require('express');
const path = require('path')
const axios = require('axios');
const mongoose = require('mongoose')
const connectToDB = require('./config/dbConfig.js')
const cookieParser = require('cookie-parser')



const app = express();
// for reading environment variable
const dotenv = require('dotenv');
dotenv.config();
connectToDB();

const PORT = process.env.PORT || 3500;
const KEY = process.env.weather_api_key;

app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root'));
app.use('/users', require('./routes/userRoutes'));


app.all('*', (req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, 'views', '404.html'));
})



mongoose.connection.once('open', () => {
  console.log('Connected to mongoDB')
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})

mongoose.connection.on('error', err => {
  console.log("MongoDB connection error: ", err);
})

// app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// let city = 'Coquitlam'

// axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`)
//   .then(function (response) {
//     // handle success
//     console.log(response.data.weather[0]);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

