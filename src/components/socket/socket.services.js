import { getSocketByUserId } from '../../helpers'

/**
 * getUserSocketId
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 * @returns {undefined}
 */
const getUserSocketId = async (req, res) => {
  const { userId } = req.params
  try {
    const socket = await getSocketByUserId(userId, req.app.io)
    if (socket) return res.json({ socketId: socket.id })
    return res.json({ socketId: null })
  } catch (err) {
    console.log(err)
    res.json({ socketId: null })
  }
}

/**
 * getUserStatus
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 * @returns {undefined}
 */
const getUserStatus = async (req, res) => {
  const { userId } = req.params
  try {
    const socket = await getSocketByUserId(userId, req.app.io)
    if (socket) return res.json({ status: 'available' })
    return res.json({ status: 'offline' })
  } catch (err) {
    console.log(err)
    res.json({ status: 'offline' })
  }
}
export default { getUserStatus, getUserSocketId }
