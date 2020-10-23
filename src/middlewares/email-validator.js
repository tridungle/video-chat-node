import { isEmail } from 'validator'
import dns from 'dns'

const resolveMx = Promise.promisify(dns.resolveMx, { context: dns })

/**
 * @param {string} email to validate with mx lookup
 * @returns {Object} { success } is true if email is valid
 */
const validateEmail = async (email) => {
  if (!isEmail(email)) return { success: false }
  try {
    const result = await resolveMx(email.split('@')[1])
    return { success: Boolean(result.length) }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
export default validateEmail
