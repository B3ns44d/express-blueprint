import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export default {
  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.DATABASE_URL,
  auth0: {
    secret: process.env.AUTH_SECRET,
    baseURL: process.env.AUTH_BASE_URL,
    clientID: process.env.AUTH_CLIENT_ID,
    issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
  },
  api: {
    prefix: '/api',
    docs: '/swagger',
  },
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
}
