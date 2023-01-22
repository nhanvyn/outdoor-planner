const express = require('express');
const router = express.Router()
const usersController = require('../controller/usersController');
const { protect } = require('../middleware/authMiddleware');
const app = express();
app.use(express.json())
router.route('/')
  .get(usersController.getUsers)
  .post(usersController.createUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser)

router.post('/register', usersController.registerUser)
router.post('/login', usersController.loginUser)
router.get('/myAccount', protect, usersController.myAccount)
module.exports = router