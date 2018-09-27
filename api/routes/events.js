const { Router } = require('express')
const router = Router()
const Parser = require('rss-parser')

const mcache = require('memory-cache')
const cache = (duration) => {
  return (req, res, next) => {
    let key = '_express_' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000)
        res.sendResponse(body)
      }
      next()
    }
  }
}

router.get('/events', cache(3600), async function (req, res, next) {
  const parser = new Parser({
    customFields: {
      item: ['summary']
    }
  })
  const feed = await parser.parseURL('https://fukuokago.connpass.com/ja.atom')

  let events = []
  const max = 3

  feed.items.reverse().forEach(item => {
    if (events.length < max) {
      const html = item.summary._
      const regex = /開催日時.*(\d{4}\/\d{2}\/\d{2})/
      const matches = html.match(regex)
      events.push({
        title: item.title,
        link: item.link,
        date: matches[1]
      })
    }
  })

  res.json(events)
})

module.exports = router
