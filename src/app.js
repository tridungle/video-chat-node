import express from 'express'

import models from './models'

// globals
global.models = models

const app = express()

export default app
