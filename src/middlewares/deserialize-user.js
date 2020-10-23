import Cookies from 'cookies'
import jwt from 'jsonwebtoken'
import config from '../config'

/**
 * Express middleware
 * @param {Express.Request} req request
 * @param {Express.Response} res response
 * @param {function} next callback on completion
 * @returns {undefined}
 */
const deserializeUser = async (req, res, next) => {
  let id
  const { key: cookieKey, secret: cookieSecret } = config.token.cookies
  const { secret: jwtSecret } = config.token.jwt
  const { tokenExpiration } = config.token

  try {
    req.cookies = new Cookies(req, res, {
      keys: [new Buffer.from(cookieSecret, 'utf-8')]
    })
    const token = req.cookies.get(cookieKey, { signed: true }) || ''
    if (!token) return next()
    const { id: tmp } = await jwt.verify(token, jwtSecret)
    id = tmp
    const user = await models.user.findById(id)
    req.cookies.set(cookieKey, token, {
      signed: true,
      maxAge: Date.now() + tokenExpiration
    })
    req.user = user
    next()
  } catch (err) {
    console.log(err)
    return next()
  }
  try {
    return await models.user.update({ lastInteractedAt: new Date() }, { where: { id } })
  } catch (err) {
    return console.log(err)
  }
}

export default deserializeUser
