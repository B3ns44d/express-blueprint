import express from 'express'
import { requiresAuth } from 'express-openid-connect'
const userRouter = express.Router()

userRouter.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

export default userRouter
