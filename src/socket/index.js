import io from 'socket.io'
import adapter from 'socket.io-redis'
import { authorize } from 'socketio-jwt'
import url from 'url'
import { CONNECTION } from '../helpers/constants'
import { USER_STATUS_CHANGE } from '../schema/subscription/pubsub/constants'
import pubsub from '../schema/subscription/pubsub'
import attachEventHandlers from '../events'
import config from '../config'
const redisUrl = url.parse(process.env.REDIS_CLOUD_URL)
const redisPw = redisUrl.auth.split(':')[1]

/**
 * @param {Object} server HTTP server instance
 * @returns {Object} socket.io instance
 */
const initIO = (server) => {
  const instance = io(server)
  instance.adapter(
    adapter({
      host: redisUrl.hostname,
      port: redisUrl.port,
      auth_pass: redisPw
    })
  )
  instance.use(
    authorize({
      handshake: true,
      secret: config.jwt.secret
    })
  )

  instance.on(CONNECTION, (socket) => {
    console.log(`socket connected to user ${socket.decoded_token.id}`)
    pubsub.publish(USER_STATUS_CHANGE, { userId: socket.decoded_token.id })
    attachEventHandlers(instance, socket)
  })

  return instance
}

export default initIO
