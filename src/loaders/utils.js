import debuger from 'debug'
import consoleLogger from '@utils/logger'

const debug = debuger()('express-blueprint:server')

export const normalizePort = (val) => {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

export const onError = (error) => {
  if (error.syscall !== 'listen') {
    consoleLogger.error(error)
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      consoleLogger.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      consoleLogger.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

export const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}
