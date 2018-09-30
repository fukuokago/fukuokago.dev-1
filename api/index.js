const express = require('express')
const app = express()
const events = require('./routes/events')
const tweets = require('./routes/tweets')

app.use(events)
app.use(tweets)

module.exports = {
  path: '/api',
  handler: app
}
