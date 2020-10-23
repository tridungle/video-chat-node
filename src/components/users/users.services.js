/**
 *
 * @param {Object} io instance of socket.io
 * @param {string} id socket id
 * @returns {Object} socket.io instance
 */
const getSocketById = (io, id) => {
  const { connected } = io.sockets.clients()
  const connectedSockets = Object.keys(connected).map((key) => connected[key])
  return connectedSockets.find((so) => so.id === id)
}

/**
 * @param {string} socketId to search for user with
 * @returns {Object} user instance
 */
const getUserBySocketId = (socketId) => {
  const socket = getSocketById(socketId)
  if (!socket || !socket.decoded_token) return null
  return models.user.findById(socket.decoded_token.id)
}

/**
 * @param {string} socketId1 first socketId
 * @param {string} socketId2 2nd socketId
 * @returns {number} contactId associated to that socketId pair
 */
const getContactIdBySocketIds = async (io, socketId1, socketId2) => {
  const socket1 = getSocketById(io, socketId1)
  if (!socket1) throw new Error(`Cannot find socket ${socketId1} in getContactIdBySocketId`)
  const socket2 = getSocketById(io, socketId2)
  if (!socket2) throw new Error(`Cannot find socket ${socketId2} in getContactIdBySocketId`)
  const userId1 = socket1.decoded_token.id
  const userId2 = socket2.decoded_token.id
  const contact = await models.contact.findOne({
    where: {
      user_1: { [Op.or]: [userId1, userId2] },
      user_2: { [Op.or]: [userId1, userId2] }
    },
    attributes: ['id']
  })
  return contact.id
}

/**
 * @param {Object} userId of user whose socket to search for
 * @param {Object} io socket.io instance
 * @returns {Object} socket for particular user
 */
const getSocketByUserId = (userId, io) => {
  const { connected } = io.sockets.clients()
  const connectedSockets = Object.keys(connected).map((key) => connected[key])
  return connectedSockets.find((so) => so.decoded_token.id === userId)
}

export { getSocketById, getSocketByUserId, getContactIdBySocketIds, getUserBySocketId }
