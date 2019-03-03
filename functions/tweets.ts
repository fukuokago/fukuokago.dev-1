import Parser from 'rss-parser'

exports.handler = async () => {
  const parser = new Parser()
  interface ITweet {
    link: string,
    date: string,
    body: string,
    user: string
  }
  let tweets: ITweet[] = []
  const max = 15

  try {
    const feed = await parser.parseURL('https://twitrss.me/twitter_search_to_rss/?term=%23fukuokago')
    if (feed && feed.items && feed.items.length > 0) {
      feed.items.forEach(item => {
        if (tweets.length < max) {
          tweets.push({
            link: item.link || '',
            date: item.isoDate || '',
            body: item.title || '',
            user: item.creator ? item.creator.replace(/[()]/g, '') : ''
          })
        }
      })
    }
  } catch(e) {
    console.error(e.message)
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tweets)
  }
}
