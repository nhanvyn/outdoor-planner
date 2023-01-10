const express = require('express');
const router = express.Router()
const usersController = require('../controller/usersController');
const app = express();
app.use(express.json())
router.route('/')
  .get(usersController.getUsers)
  .post(usersController.createUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser)

module.exports = router