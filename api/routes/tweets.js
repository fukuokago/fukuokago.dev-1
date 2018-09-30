const { Router } = require('express')
const router = Router()
const Parser = require('rss-parser')
const cache = require('../middleware/cache')

router.get('/tweets', cache(3600), async function (req, res, next) {
  const parser = new Parser()
  const feed = await parser.parseURL('https://twitrss.me/twitter_search_to_rss/?term=%23fukuokago')

  let tweets = []
  const max = 15

  feed.items.forEach(item => {
    if (tweets.length < max) {
      tweets.push({
        link: item.link,
        date: item.isoDate,
        body: item.title,
        user: item.creator.replace(/[()]/g, '')
      })
    }
  })

  res.json(tweets)
})

module.exports = router
