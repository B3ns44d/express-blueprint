import { Router } from 'express'
import { login, logout } from '@controllers/auth.controller'
const authRouter = Router()

authRouter.get('/login', login)
authRouter.get('/logout', logout)

export default authRouter
