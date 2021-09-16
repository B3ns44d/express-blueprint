import express from 'express'
import authRouter from '@routes/auth.routes'
import userRouter from '@routes/user.routes'
import staffRouter from '@routes/admin.routes'

const routes = express.Router()

export default () => {
  routes.get('/', (req, res) => {
    res.status(200).json({
      message: 'Main app routes endpoint',
    })
  })

  routes.use('/auth', authRouter)
  routes.use('/user', userRouter)
  routes.use('/staff', staffRouter)

  return routes
}
