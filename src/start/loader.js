import expressLoader from './express'
import mongooseLoader from './database'
import apolloLoader from './apollo'
import Logger from '@helpers/logger'

export default async ({ expressApp }) => {
  try {
    const mongodbConnection = await mongooseLoader()
    Logger.info('✌️ MongoDB Initialized')

    const expressServer = await expressLoader({ app: expressApp })
    Logger.info('✌️ Express loaded')

    const apolloServer = await apolloLoader()
    Logger.info('✌️ The  graphql schema and resolver definitions are loaded.')

    return { apolloServer, expressServer, mongodbConnection }
  } catch (error) {
    Logger.error(error)
    return {}
  }
}
