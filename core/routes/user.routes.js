import { Router } from 'express'
import { requiresAuth } from 'express-openid-connect'
const userRouter = Router()

userRouter.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

export default userRouter
