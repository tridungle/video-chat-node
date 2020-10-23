export default () => ({
  bucket: process.env.S3_BUCKET || 'video-call-app',
  accessKeyId: process.env.AWS_ACCESS_KEY || 'AWS_ACCESS_KEY',
  secretAccessKey: process.env.AWS_SECRET_KEY || 'AWS_SECRET_KEY'
})
