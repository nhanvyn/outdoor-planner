const Invite = require('../DBmodels/Invite')
const asyncHandler = require('express-async-handler')


const addInvite = asyncHandler(async (req, res) => {
  try {
    console.log("req body = ", req.body)
    const { activity, user, guest, name } = req.body;


    const newInvite = await Invite.create({
      activity: activity._id,
      host: user._id,
      guest: guest._id,
      name: name
    });
    return res.status(201).json(newInvite);
  } catch (error) {
    return res.status(400).json({ message: 'Error creating Invite', error: error.message });
  }
})


const getActivities = asyncHandler(async (req, res) => {
  try {
    const activities = await Invite.find({ host: req.user.id })

    return res.status(200).json(activities);
  } catch (error) {
    return res.status(400).json({ message: 'Error getting your activities', error: error.message });
  }
})

const deleteInvite = asyncHandler(async (req, res) => {
  try {
    const Invite = await Invite.findById(req.params.id)
    if (!Invite || !req.user) {
      return res.status(404).json({ message: 'Resources not found' });
    }
    if (Invite.host.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
    const deleted_Invite_name = Invite.name
    await Invite.remove()

    return res.status(200).json({
      message: "Deleted: " + deleted_Invite_name,
      id: req.params.id
    })

  } catch (error) {
    return res.status(400).json({ message: 'Error deleting your Invite', error: error.message });
  }
})

const updateInvite = asyncHandler(async (req, res) => {
  try {
    const Invite = await Invite.findById(req.params.id)
    if (!Invite || !req.user) {
      return res.status(404).json({ message: 'Resources not found' });
    }
    if (Invite.host.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }


    const updatedAct = await Invite.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })


    return res.status(200).json({
      message: "Successfully updated Invite",
      updated: updatedAct
    })

  } catch (error) {
    return res.status(400).json({ message: 'Error updating your Invite', error: error.message });
  }
})



module.exports = {
  addInvite,
  getActivities,
  deleteInvite,
  updateInvite
}