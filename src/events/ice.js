import { ICE_CANDIDATE, ICE_DESCRIPTION } from '../helpers/constants'
import { getSocketById } from '../helpers'

/**
 * @param {Object} io socket.io instance
 * @param {Object} socket receiving event
 * @param {Object} payload from message
 * @returns {undefined}
 */
const handleIceCandidate = (io, socket, { toId, data }) => {
  console.log(`Sending ICE candidate from ${socket.id} to ${toId}`)
  const toSocket = getSocketById(io, toId)
  if (!toSocket) {
    // TODO emit hangup
    return
  }
  toSocket.emit(ICE_CANDIDATE, { data })
}

/**
 * @param {Object} io socket.io instance
 * @param {Object} socket receiving event
 * @param {Object} payload from message
 * @returns {undefined}
 */
const handleIceDescription = (io, socket, { toId, description }) => {
  console.log(`Sending session description from ${socket.id} to ${toId}`)
  const toSocket = getSocketById(io, toId)
  if (!toSocket) {
    // TODO emit hangup
    return
  }
  toSocket.emit(ICE_DESCRIPTION, { description })
}
export { handleIceCandidate, handleIceDescription }
