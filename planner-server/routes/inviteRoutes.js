const express = require('express');
const router = express.Router()
const { protect } = require('../middleware/authMiddleware');
const inviteController = require('../controller/inviteController');
const app = express();
app.use(express.json())


router.post('/', protect, inviteController.addInvite)
      .get('/', protect, inviteController.getInvites)
      .delete('/byActivity/:id', protect, inviteController.deleteInvitesByActivityID)
  // .delete('/:id', protect, inviteController.deleteInvite)
  // .put('/:id', protect, inviteController.updateInvite)
module.exports = router