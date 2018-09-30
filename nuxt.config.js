const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  head: {
    title: 'fukuokago.tech',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The portal for Fukuoka.go' }
    ],
    link: [
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Quicksand|Roboto+Slab' },
      { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#000' },
  build: {
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
  ],
  serverMiddleware: [
    '~/api/index.js'
  ],
  axios: {
    prefix: '/api',
    host: isProd ? 'fukuokago.tech' : 'localhost',
    port: isProd ? 443 : 3000,
    https: isProd,
    debug: false
  }
}

