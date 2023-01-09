const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose);


const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },

  name: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    required: true
  },

},
  {
    timestamps: true // automatically added createdAt and updatedAt fields
})

activitySchema.plugin(autoIncrement, { field: 'serialID', startAt: 1 });


module.exports = mongoose.model('Activity', activitySchema)