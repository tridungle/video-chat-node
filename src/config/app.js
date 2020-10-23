export default () => ({
  env: process.env.ENV || 'development',
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || 8000,
  healthEndpoint: process.env.HEALTH_ENDPOINT || '/health'
})
