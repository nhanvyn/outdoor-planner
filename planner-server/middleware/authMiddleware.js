const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../DBmodels/User')

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // decode and validate token
      const decoded = jwt.verify(token, process.env.JWT_KEY)

      // get user
      req.user = await User.findById(decoded.id).select('-password');
      next();
    }
    catch (err) {

      console.log(err);
      res.status(401);
      throw new Error('Not authorized')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }