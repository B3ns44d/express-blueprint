import express from 'express'
import { claimEquals } from 'express-openid-connect'
import { ROLES } from '@constants/index'
const adminRouter = express.Router()
const { isAdmin } = ROLES

adminRouter.get('/admin', claimEquals(isAdmin, true), (req, res) =>
  res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
)

export default adminRouter
