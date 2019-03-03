import * as crypto from 'crypto'
import Parser from 'rss-parser'
import sanitize from 'sanitize-html'
import {URL} from 'url'

const sha1 = (plaintext: string) => {
  let hash = crypto.createHash('sha1')
  hash.update(plaintext)
  return hash.digest('hex')
}

const allowHtmlTags = {
  allowedTags: [ 'img', 'br', 'b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'p', 'table', 'th', 'tr', 'td', 'tbody', 'ul', 'li' ],
  allowedAttributes: {
    img: ['src', 'width' ]
  }
}

exports.handler = async () => {
  const parser = new Parser({
    customFields: {
      item: ['summary']
    }
  })

  interface IEvent {
    id: string,
    title: string,
    link: string,
    date: string,
    content: string
  }

  let events: IEvent[] = []
  const max = 5

  try {
    const feed = await parser.parseURL('https://fukuokago.connpass.com/ja.atom')
    if (feed && feed.items && feed.items.length > 0) {
      feed.items.reverse().forEach((item) => {
        if (events.length < max) {
          const html = item.summary._
          const regex = /開催日時.*(\d{4}\/\d{2}\/\d{2})/
          const matches = html.match(regex)
          const link = new URL(item.link || '')
          events.push({
            id: sha1(item.id),
            title: item.title || '',
            link: `${link.origin}${link.pathname}`,
            date: matches[1],
            content: sanitize(html, allowHtmlTags)
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
    body: JSON.stringify(events)
  }
}
