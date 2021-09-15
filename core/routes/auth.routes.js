import express from 'express'
import { ENDPOINTS } from '@constants/index'
const authRouter = express.Router()

const { API, USER, PROFILE } = ENDPOINTS

authRouter.get('/login', (req, res) => res.oidc.login({ returnTo: `${API}/${USER}/${PROFILE}` }))
authRouter.get('/logout', (req, res) => res.oidc.logout({ returnTo: '/' }))

export default authRouter
