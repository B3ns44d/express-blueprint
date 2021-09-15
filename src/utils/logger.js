import winston from 'winston'
import config from '@config'
import { COLORS, DEFAULT_DATE_FORMAT } from '@shared/constants'

const transports = []

if (process.env.NODE_ENV !== 'development') {
  transports.push(new winston.transports.Console())
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli(), winston.format.splat()),
    })
  )
}

const logConfiguration = {
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: DEFAULT_DATE_FORMAT.datetime,
    }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, category, timestamp }) => {
      return (
        winston.format
          .colorize({ all: true, colors: COLORS })
          .colorize(
            level,
            `[${timestamp}] [${level.toUpperCase()}] ${category ? category : 'winston'}`
          ) + ` - ${message}`
      )
    })
  ),

  colorize: true,
  prettyPrint: true,
  transports,
}

const LoggerInstance = winston.createLogger(logConfiguration)

export default LoggerInstance
