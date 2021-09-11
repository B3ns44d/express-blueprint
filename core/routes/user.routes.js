const express = require('express')
const userRouter = express.Router()
const { requiresAuth } = require('express-openid-connect')

userRouter.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

module.exports = userRouter
