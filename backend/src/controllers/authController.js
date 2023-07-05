const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// Login
// POST /auth
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Please Enter Credentials' })
  }

  const foundUser = await User.findOne({ username }).exec()

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const match = await bcrypt.compare(password, foundUser.password)

  if (!match) return res.status(401).json({ message: 'Unauthorized' })

  const accessToken = jwt.sign(
    {
      UserInfo: {
        uid: foundUser._id.toString(),
        username: foundUser.username,
        roles: foundUser.roles
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '60m' }
  )
  res.json({ accessToken })
})

module.exports = {
  login
}
