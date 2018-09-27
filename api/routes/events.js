const { Router } = require('express')
const router = Router()
const Parser = require('rss-parser')
const crypto = require('crypto')
const sanitizeHtml = require('sanitize-html')
const { URL } = require('url')

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

const sha1 = (plaintext) => {
  let hash = crypto.createHash('sha1')
  hash.update(plaintext)
  return hash.digest('hex')
}

const allowHtmlTags = {
  allowedTags: [ 'br', 'b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'p', 'table', 'th', 'tr', 'td', 'tbody' ]
}

router.get('/events', cache(3600), async function (req, res, next) {
  const parser = new Parser({
    customFields: {
      item: ['summary']
    }
  })
  const feed = await parser.parseURL('https://fukuokago.connpass.com/ja.atom')

  let events = []
  const max = 5

  feed.items.reverse().forEach(item => {
    if (events.length < max) {
      const html = item.summary._
      const regex = /開催日時.*(\d{4}\/\d{2}\/\d{2})/
      const matches = html.match(regex)
      const link = new URL(item.link)
      events.push({
        id: sha1(item.id),
        title: item.title,
        link: `${link.origin}${link.pathname}`,
        date: matches[1],
        content: sanitizeHtml(html, allowHtmlTags)
      })
    }
  })

  res.json(events)
})

module.exports = router
