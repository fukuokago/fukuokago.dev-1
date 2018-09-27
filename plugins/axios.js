import * as axios from 'axios'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  if (process.env.NODE_ENV === 'production') {
    options.baseURL = 'https://fukuokago.tech:443'
  } else {
    options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
  }
}

export default axios.create(options)
