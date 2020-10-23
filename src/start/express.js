import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import config from '@config'
import deserializeUser from '@middlewares/deserialize-user'

/**
 * @description express loader
 * @memberof module:Loader
 */
const expressLoader = async ({ app }) => {
  app.enable('trust proxy')
  // App middleware
  app.use(cors({ credentials: true }))
  app.use(bodyParser.urlencoded({ extended: false, limit: '2mb' }))
  app.use(bodyParser.json({ limit: '5mb' }))
  app.use(compression())
  app.use(deserializeUser)

  app.get(config.app.healthEndpoint, (req, res) => {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    }
    try {
      res.send(healthcheck)
    } catch (e) {
      healthcheck.message = e
      res.status(503).send()
    }
  })
  return app
}

export default expressLoader
