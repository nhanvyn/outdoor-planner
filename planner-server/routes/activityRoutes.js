const express = require('express');
const router = express.Router()
const { protect } = require('../middleware/authMiddleware');
const activityController = require('../controller/activityController');
const app = express();
app.use(express.json())


router.post('/addActivity', activityController.addActivity)
module.exports = router