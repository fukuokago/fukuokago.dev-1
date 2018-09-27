const express = require('express')
const app = express()
const events = require('./routes/events')

app.use(events)

module.exports = {
  path: '/api',
  handler: app
}
