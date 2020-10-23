import AWS from 'aws-sdk'
import crypto from 'crypto'
import config from '../config'
AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey
})

const s3 = new AWS.S3()
const putObject = Promise.promisify(s3.putObject, { context: s3 })

/**
 * @param {string} imgUrl url encoded image
 * @param {string} extension of image
 * @returns {string} filename in AWS bucket
 */
export async function uploadImage(imgUrl, extension) {
  const data = imgUrl.replace(/^data:image\/\w+;base64,/, '')
  const buffer = new Buffer.from(data, 'base64')
  const filename = `${crypto
    .createHash('sha1')
    .update(String(Date.now() * Math.random()))
    .digest('hex')}.${extension}`
  await putObject({
    Bucket: config.aws.bucket,
    Body: buffer,
    ACL: 'public-read',
    Key: filename
  })
  return filename
}
