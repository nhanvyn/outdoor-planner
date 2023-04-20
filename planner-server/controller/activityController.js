const Activity = require('../DBmodels/Activity')
const asyncHandler = require('express-async-handler')


const addActivity = asyncHandler(async (req, res) => {
  try {
    console.log("req body = ", req.body)
    const { user, name, note, date, from, to, city, weather } = req.body;


    const newActivity = await Activity.create({
      host: user._id,
      name: name,
      note: note,
      date: date,
      from: from,
      to: to,
      city: city,
      weather: weather
    });
    return res.status(201).json(newActivity);
  } catch (error) {
    return res.status(400).json({ message: 'Error creating activity', error: error.message });
  }
})

module.exports = {
  addActivity
}