const express = require('express')
const adminRouter = express.Router()
const { claimEquals } = require('express-openid-connect')
const { ROLES } = require('@constants/index')
const { isAdmin } = ROLES

adminRouter.get('/admin', claimEquals(isAdmin, true), (req, res) =>
  res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
)

module.exports = adminRouter
