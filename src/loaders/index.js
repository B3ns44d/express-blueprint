import expressLoader from './express'
import Logger from '@utils/logger'

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp })
  Logger.info('🤖 Express App loaded')
}
