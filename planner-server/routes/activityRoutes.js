const express = require('express');
const router = express.Router()
const { protect } = require('../middleware/authMiddleware');
const activityController = require('../controller/activityController');
const app = express();
app.use(express.json())


router.post('/', protect, activityController.addActivity)
  .get('/', protect, activityController.getActivities)
  .get('/invites', protect, activityController.getActivitiesByInvites)
  .delete('/:id', protect, activityController.deleteActivity)
  .put('/:id', protect, activityController.updateActivity)
module.exports = router