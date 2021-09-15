import express from 'express'
import { ENDPOINTS } from '@constants'
const authRouter = express.Router()

const { api, user, profile } = ENDPOINTS

authRouter.get('/login', (req, res) => res.oidc.login({ returnTo: `${api}/${user}/${profile}` }))
authRouter.get('/logout', (req, res) => res.oidc.logout({ returnTo: '/' }))

export default authRouter
