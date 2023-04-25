const express = require('express');
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose')
const connectToDB = require('./config/dbConfig.js')
const cookieParser = require('cookie-parser')

const whitelist = ["http://localhost:3000", "https://outplanner-frontend.onrender.com"]


const app = express();
// for reading environment variable
const dotenv = require('dotenv');
dotenv.config();
connectToDB();




const getOrigin = (origin, callback) => {
  if (!origin || whitelist.indexOf(origin) !== -1) {

    callback(null, true)
  } else {

    callback(new Error("Not allowed by CORS"))
  }
}

const corsOptions = {
  origin: getOrigin,
  credentials: true
}
const PORT = process.env.PORT || 3500;
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root'));
app.use('/users', require('./routes/userRoutes'));
app.use('/activity', require('./routes/activityRoutes'))
app.use('/invite', require('./routes/inviteRoutes'))

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

