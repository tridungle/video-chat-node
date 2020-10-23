import express from 'express'
import Logger from '@helpers/logger'
import config from '@config'
import loader from './loader'

export default async function startServer() {
  const app = express()

  const { apolloServer } = await loader({ expressApp: app }) // eslint-disable-line

  if (!apolloServer) {
    Logger.error(`Cannot init Apollo server. Please check your configuration and start server again.`)
    return
  }
  apolloServer.applyMiddleware({ app })

  app.listen(config.app.port, (error) => {
    if (error) {
      Logger.error(error)
      return
    }

    Logger.info('==================================')
    Logger.info(`   💪  💪 Environment: ${config.app.env} 💪  💪`)
    Logger.info(`🛡️  🚀 Server listening on port ${config.app.port} 🚀 🛡️`)
    Logger.info(`😷 Health checks available at ${config.app.host}:${config.app.port}${config.app.healthEndpoint} 😷`)
  })
}

startServer()
