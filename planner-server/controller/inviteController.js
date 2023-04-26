const Invite = require('../DBmodels/Invite')
const asyncHandler = require('express-async-handler')



const addInvite = asyncHandler(async (req, res) => {
  try {
    console.log("Invites req body = ", req.body);
    const { activity, invites } = req.body;

    const newInvites = await Promise.all(
      invites.map(async (invite) => {
        const newInvite = await Invite.create({
          activity: activity._id,
          host: req.user.id,
          hostname: req.user.username,
          guest: invite._id,
          guestname: invite.username,
          name: activity.name
        });
        return newInvite;
      })
    );

    return res.status(201).json(newInvites);
  } catch (error) {
    console.log("error creating invites: ", error)
    return res.status(400).json({ message: 'Error creating Invite', error: error.message });
  }
});






const getInvites = asyncHandler(async (req, res) => {
  try {
    console.log("check req user", req.user)
    const invites = await Invite.find({ host: req.user.id })
    const inviteds = await Invite.find({guest: req.user.id})
    
    console.log("check invites and invited: ", invites, inviteds)
    return res.status(200).json({
      invites, inviteds
    });
  } catch (error) {
    console.log("getInvites error:", error)
    return res.status(400).json({ message: 'Error getting your invites', error: error.message });
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
  getInvites,
  deleteInvite,
  updateInvite
}