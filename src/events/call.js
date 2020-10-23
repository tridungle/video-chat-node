import Twilio from 'twilio'
import {
  CALL_ACCEPTED,
  CALL_CANCELED,
  ICE_SERVER_CONFIG,
  CALL_HANG_UP,
  CALL_UNAVAILABLE,
  CALL_REQUEST
} from '../helpers/constants'
import { getSocketById } from '../helpers'

const twilio = Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

/**
 * @param {Object} io socket.io instance
 * @param {Object} socket which received the event
 * @param {Object} payload from the call accepted event
 * @returns {undefined}
 */
const handleCallAccepted = async (io, socket, { toId }) => {
  console.log(`Call from ${toId} to ${socket.id} accepted. Establishing peer connection`)
  try {
    const toSocket = getSocketById(io, toId)
    if (!toSocket) {
      socket.emit(CALL_CANCELED)
      return
    }
    const token = await twilio.tokens.create()
    toSocket.emit(CALL_ACCEPTED, { iceServerConfig: token.iceServers })
    socket.emit(ICE_SERVER_CONFIG, { iceServerConfig: token.iceServers })
  } catch (err) {
    console.log(err)
    socket.emit(CALL_CANCELED)
  }
}

/**
 * @param {Object} io socket.io instance
 * @param {Object} socket receiving event
 * @param {Object} payload from message
 * @returns {undefined}
 */
const handleCallCanceled = async (io, socket, { toId }) => {
  console.log(`Call from ${socket.id} to ${toId} canceled by caller`)
  const toSocket = getSocketById(io, toId)
  return toSocket && toSocket.emit(CALL_CANCELED)
}

/**
 * @param {Object} io socket.io instance
 * @param {Object} socket receiving event
 * @param {Object} payload from message
 * @returns {undefined}
 */
const handleCallHangup = (io, socket, { toId }) => {
  const toSocket = getSocketById(io, toId)
  if (!toSocket) return
  toSocket.emit(CALL_HANG_UP)
}

/**
 * @param {Object} io socket.io instance
 * @param {Object} socket receiving event
 * @param {Object} payload from message
 * @returns {undefined}
 */
const handleCallIgnored = (io, socket, { toId }) => {
  console.log(`Call from ${toId} ignored by ${socket.id}`)
  const toSocket = getSocketById(io, toId)
  return toSocket && toSocket.emit(CALL_UNAVAILABLE)
}

/**
 * @param {Object} io socket.io instance
 * @param {Object} socket receiving event
 * @param {Object} payload from message
 * @returns {undefined}
 */
const handleCallRequest = async (io, socket, { toId }) => {
  console.log(`Call request from ${socket.id} to call ${toId}`)
  const toSocket = getSocketById(io, toId)
  if (!toSocket) socket.emit(CALL_UNAVAILABLE)
  let contactId
  try {
    contactId = await getContactIdBySocketIds(io, toId, socket.id)
    console.log(contactId)
  } catch (err) {
    console.log(err)
    socket.emit(CALL_UNAVAILABLE)
  }
  toSocket.emit(CALL_REQUEST, { fromId: socket.id, contactId })
}
export { handleCallAccepted, handleCallCanceled, handleCallIgnored, handleCallRequest, handleCallHangup }
