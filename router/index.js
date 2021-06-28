const express = require('express'),
  routes = express.Router(),
  authRouter = require('@routes/auth.routes'),
  userRouter = require('@routes/user.routes'),
  staffRouter = require('@routes/admin.routes')

routes.get('/', (req, res) => {
  res.status(200).json({
    message: 'Main app routes endpoint',
  })
})

routes.use('/auth', authRouter)
routes.use('/user', userRouter)
routes.use('/staff', staffRouter)

module.exports = routes
