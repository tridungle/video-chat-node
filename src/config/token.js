export default () => ({
  cookies: {
    secret: process.env.COOKIE_SECRET || 'GYAuFsvTentsZ1FctBateX59AMcF44VMDK6',
    key: process.env.COOKIE_KEY || 'MmeWCWRuICt556'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'PPpKw6ePAD7QEMqtt5ife3coFDh1ibuKJ'
  },
  tokenExpiration: 24 * 60 * 60 * 1e3
})
