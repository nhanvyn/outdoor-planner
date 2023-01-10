const User = require('../DBmodels/User')
// const Activity = require('../DBmodels/Activity')

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// GET users
const getUsers = asyncHandler(async (req, res) => {
  // select('-password'): do not return password to client
  // lean(): only return json object without return the whole mongoose document
  // after using lean(), save() and remove() can't be used anymore because they are both inside the doc
  const users = await User.find().select('-password').lean()
  if (!(users?.length)) {
    // check if users exist first, if exist, check if length == 0
    return res.status(400).json({ message: 'No user record was found' })
  }
  return res.json(users)

})

// POST users
const createUser = asyncHandler(async (req, res) => {
  console.log("req body = ", req.body)
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      message: 'Either username or password was missing in request'
    })
  }

  // check for duplicate
  const duplicate = await User.findOne({ username })
  if (duplicate) {
    return res.status(409).json({ message: 'There is already a user with requested username' })
  }

  // hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const userObject = { "username": username, "password": hashedPassword };
  const user = await User.create(userObject)
  if (user) {
    res.status(201).json({ message: "new user created" })
  }
})


// PATCH users
const updateUser = asyncHandler(async (req, res) => {
  return res.status(400).json({
    message: 'Not implemented'
  })
})


// DELETE users
const deleteUser = asyncHandler(async (req, res) => {
  return res.status(400).json({
    message: 'Not implemented'
  })
})

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}