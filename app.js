import express from 'express'
import routes from '@router'
import logger from 'morgan'
import cors from 'cors'
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import helmet from 'helmet'
import { auth } from 'express-openid-connect'
import { authConfig } from '@auth/index'
import { createDirectories, isThisDirectoryExist } from '@utils/index'
import loggerBody from 'morgan-body'
import { swaggerConfig } from '@middleware/swagger'
import compression from 'compression'

const app = express()

app.use(
  cors({
    origin: '*',
  })
)

if (!isThisDirectoryExist('./logs')) {
  createDirectories('./logs', false)
}

app.use(
  logger('combined', {
    stream: fs.createWriteStream('./logs/short-report.log', { flags: 'a' }),
  })
)
app.use(logger('combined'))

const log = fs.createWriteStream('./logs/full-report.log', { flags: 'a' })

loggerBody(app, {
  noColors: true,
  stream: log,
})

app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(auth(authConfig))
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.status(200).send('Welcome to to this blueprint by B3ns44d, check /swagger')
})

app.use('/api', routes)

app.use('/swagger', swaggerConfig(), swaggerUi.serve, swaggerUi.setup())

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err['status'] = 404
  next(err)
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status).send({ message: err.message }).end()
  }
  return next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message,
    },
  })
})

module.exports = app
