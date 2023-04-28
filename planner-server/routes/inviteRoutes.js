const express = require('express');
const router = express.Router()
const { protect } = require('../middleware/authMiddleware');
const inviteController = require('../controller/inviteController');
const app = express();
app.use(express.json())


router.post('/', protect, inviteController.addInvite)
      .get('/', protect, inviteController.getInvites)
      .delete('/byActivity/:id', protect, inviteController.deleteInvitesByActivityID)
      .delete('/', protect, inviteController.deleteInvited)
      .put('/', protect, inviteController.updateInvites)
module.exports = router