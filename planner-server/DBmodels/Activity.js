const mongoose = require('mongoose')


const activitySchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    require: true
  },
  note: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  from: {
    type: String,
    require: true
  },
  to: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  weather: {
    type: String,
    require: true
  },
},
  {
    timestamps: true,
  }

);




module.exports = mongoose.model('Activity', activitySchema)