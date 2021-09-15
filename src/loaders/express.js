import express from 'express'
import routes from '@router'
import logger from 'morgan'
import cors from 'cors'
import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import helmet from 'helmet'
import { auth } from 'express-openid-connect'
import { authConfig } from '@auth'
import { createDirectories, isThisDirectoryExist } from '@utils'
import loggerBody from 'morgan-body'
import { swaggerConfig } from '@middleware/swagger'
import compression from 'compression'
import { onError, onListening, normalizePort } from './utils'
import config from '@config'
import consoleLogger from '@utils/logger'
import { endpointsLogger } from '@middleware/endpointsLogger'
import { notFound, Unauthorized, genericErrorRes } from '@middleware'

export default () => {
  const app = express()
  const port = normalizePort(process.env.PORT || '3000')
  app.set('port', port)

  if (!isThisDirectoryExist('./logs')) {
    createDirectories('./logs', false)
  }

  loggerBody(app, {
    noColors: true,
    stream: fs.createWriteStream('./logs/full-report.log', { flags: 'a' }),
  })

  app.use(
    cors({
      origin: '*',
    })
  )
  app.use(
    logger('combined', {
      stream: fs.createWriteStream('./logs/short-report.log', { flags: 'a' }),
    })
  )
  app.use(endpointsLogger())
  app.use(compression())
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(auth(authConfig))
  app.use(notFound())
  app.use(Unauthorized())
  app.use(genericErrorRes())
  app.disable('x-powered-by')

  app.get('/', (req, res) => {
    res.status(200).send('Welcome to to this blueprint by B3ns44d, check /swagger')
  })

  app.use(config.api.prefix, routes)

  app.use(config.api.docs, swaggerConfig(), swaggerUi.serve, swaggerUi.setup())

  app.listen(port, () => {
    consoleLogger.info(`app running on port http://127.0.0.1:${port}`, { category: 'express app' })
    consoleLogger.info(`swagger running on port http://127.0.0.1:${port}/swagger/`, {
      category: 'express app',
    })
    consoleLogger.info('Press Ctrl+C to quit.', { category: 'express app' })
  })

  app.on('error', onError)
  app.on('listening', onListening)
}
