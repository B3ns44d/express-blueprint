import express from 'express'
import { claimEquals } from 'express-openid-connect'
import { ROLES } from '@constants'
const adminRouter = express.Router()
const { isAdmin } = ROLES
import { celebrate } from 'celebrate'
import { validationSchema } from './schema'

const { adminRouterCreate: createSchema } = validationSchema

adminRouter.get('/admin', claimEquals(isAdmin, true), (req, res) =>
  res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
)

adminRouter.post(
  '/create',
  celebrate({
    body: createSchema,
  }),
  async (req, res) => {
    res.send('hello')
  }
)
export default adminRouter
