const express = require('express'),
  routes = require('@router'),
  logger = require('morgan'),
  app = express(),
  cors = require('cors'),
  fs = require('fs'),
  swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json'),
  helmet = require('helmet'),
  { auth } = require('express-openid-connect'),
  authConfig = require('@auth/index')

const loggerBody = require('morgan-body')

app.use(
  cors({
    origin: '*',
  })
)
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
