const mongoose = require('mongoose')


const inviteSchema = new mongoose.Schema({

  activity: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Activity',
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  hostname: {
    type: String,
    require: true
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  guestname: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
},
  {
    timestamps: true,
  }

);




module.exports = mongoose.model('Invite', inviteSchema)