import mongoose from 'mongoose'
import config from '@config'

/**
 * @description db loader
 * @memberof module:Loader
 */
const dbLoader = async () => {
  const dbURI = config.database.uri || buildMongoUri()
  console.log(`Database URI`, dbURI)
  const connection = await mongoose.connect(dbURI, config.database.options)

  if (config.app.env === 'development') mongoose.set('debug', true)
  return connection.connection.db
}

const buildMongoUri = () => {
  return `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.database}`
}
export default dbLoader
