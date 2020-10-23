import appConfig from './app'
import tokenConfig from './token'
import awsConfig from './aws'
import databaseConfig from './database'
import dotenv from 'dotenv'
dotenv.config()

export default {
  app: appConfig(),
  token: tokenConfig(),
  aws: awsConfig(),
  database: databaseConfig()
}
