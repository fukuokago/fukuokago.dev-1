const pkg = require('./package')

const config = {
  mode: 'spa',
  head: {
    title: pkg.name,
    titleTemplate: `%s - ${pkg.name}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'keywords', content: '' },
      { property: 'og:title', content: pkg.name },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: pkg.homepage },
      { property: 'og:image', content: '/icons/ogimage.png' },
      { property: 'og:description', content: pkg.description },
      { property: 'og:site_name', content: pkg.name },
      { property: 'og:locale', content: 'ja_JP' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@golangjp' },
      { property: 'twitter:title', content: pkg.name },
      { property: 'twitter:description', content: pkg.description },
      { property: 'twitter:url', content: pkg.homepage },
      { property: 'twitter:image', content: '/icons/ogimage.png' },
      // Icons generated: https://www.favicon-generator.org/
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/icons/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Arvo:400,700' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Quicksand|Roboto+Slab' },
      // Icons generated: https://www.favicon-generator.org/
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/icons/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/icons/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/icons/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/icons/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/icons/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/icons/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/icons/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-icon-180x180.png' }
    ]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [],
  modules: [
    ['nuxt-imagemin'],
    ['@nuxtjs/google-analytics', { id: 'UA-328462-18' }],
    ['nuxt-i18n', {
      seo: false,
      parsePages: false,
      locales: [
        { name: 'English', code: 'en', iso: 'en-US', file: 'en.ts' },
        { name: '日本語', code: 'ja', iso: 'ja_JP', file: 'ja.ts' }
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'ja',
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        alwaysRedirect: false,
        fallbackLocale: 'ja'
      },
      vueI18n: {
        fallbackLocale: 'ja'
      },
      vueI18nLoader: true,
      silentTranslationWarn: true
    }],
    '@nuxtjs/axios',
    '@nuxtjs/bulma',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa'
  ],
  proxy: {
    '/events': 'http://localhost:9000',
    '/tweets': 'http://localhost:9000'
  },
  axios: {
  },
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    extend(config: any, _: any) {
      // i18n
      config.module.rules.push({
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: ['@kazupon/vue-i18n-loader', 'yaml-loader'],
      })
      // 5MB
      config.performance.maxAssetSize = 5000000
    }
  }
}

export default config
