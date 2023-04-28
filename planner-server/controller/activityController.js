const Activity = require('../DBmodels/Activity')
const asyncHandler = require('express-async-handler')


const addActivity = asyncHandler(async (req, res) => {
  try {
    // console.log("req body = ", req.body)
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


const getActivities = asyncHandler(async (req, res) => {
  try {
    const activities = await Activity.find({ host: req.user.id })

    return res.status(200).json(activities);
  } catch (error) {
    return res.status(400).json({ message: 'Error getting your activities', error: error.message });
  }
})


const getActivitiesByInvites = asyncHandler(async (req, res) => {
  try {
    
   
    const invites = req.query.invites
    // console.log("In controller: print invites body", req.query.invites)
    const activities = await Promise.all(
      invites.map(async (invite) => {
        const activity = await Activity.findOne({ _id: invite.activity });
        return activity
      })
    )
   

    return res.status(200).json(activities);
  } catch (error) {
    return res.status(400).json({ message: 'Error getting your activities by invites', error: error.message });
  }
})


const deleteActivity = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
    if (!activity || !req.user) {
      return res.status(404).json({ message: 'Resources not found' });
    }
    if (activity.host.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
    const deleted_activity_name = activity.name
    await activity.remove()

    return res.status(200).json({
      message: "Deleted: " + deleted_activity_name,
      id: req.params.id
    })

  } catch (error) {
    return res.status(400).json({ message: 'Error deleting your activity', error: error.message });
  }
})

const updateActivity = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
    if (!activity || !req.user) {
      return res.status(404).json({ message: 'Resources not found' });
    }
    if (activity.host.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }


    const updatedAct = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })


    return res.status(200).json({
      message: "Successfully updated activity",
      updated: updatedAct
    })

  } catch (error) {
    return res.status(400).json({ message: 'Error updating your activity', error: error.message });
  }
})



module.exports = {
  addActivity,
  getActivities,
  deleteActivity,
  updateActivity,
  getActivitiesByInvites
}