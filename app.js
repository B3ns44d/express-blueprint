import express from 'express'
import routes from '@router'
import logger from 'morgan'
import cors from 'cors'
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import helmet from 'helmet'
import { auth } from 'express-openid-connect'
import { authConfig } from '@auth/index'
import { createDirectories, isThisDirectoryExist } from '@utils/index'
import loggerBody from 'morgan-body'

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
    stream: fs.createWriteStream('./logs/app.log', { flags: 'a' }),
  })
)
app.use(logger('combined'))

const log = fs.createWriteStream('./logs/app_body.log', { flags: 'a' })

loggerBody(app, {
  noColors: true,
  stream: log,
})
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(auth(authConfig))

app.get('/', (req, res) => {
  res.status(200).send('Welcome to to this blueprint by B3ns44d, check /swagger')
})

app.use('/api', routes)

app.use(
  '/swagger',
  (req, res, next) => {
    swaggerDocument.host = req.get('host')
    swaggerDocument.schemes.http = req.protocol
    req.swaggerDoc = swaggerDocument
    next()
  },
  swaggerUi.serve,
  swaggerUi.setup()
)

module.exports = app
