const express = require('express')
const authRouter = express.Router()
const { ENDPOINTS } = require('@constants/index')

const { API, USER, PROFILE } = ENDPOINTS

authRouter.get('/login', (req, res) => res.oidc.login({ returnTo: `${API}/${USER}/${PROFILE}` }))
authRouter.get('/logout', (req, res) => res.oidc.logout({ returnTo: '/' }))

module.exports = authRouter
