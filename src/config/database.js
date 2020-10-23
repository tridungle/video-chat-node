export default () => ({
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/video-chat',
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
})
