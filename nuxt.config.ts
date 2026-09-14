// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxtjs/sitemap'],

  site: {
    url: 'https://jeffreyz.nl',
    name: 'Jeffrey Zschot - Digital Builder',
  },

  sitemap: {
    strictNuxtContentPaths: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'nl' },
      title: 'Jeffrey Zschot - Digital Builder | Amsterdam',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Jeffrey Zschot is een digital builder uit Amsterdam. Expertise in software development, AI engineering, automation, content creation en creative direction.' },
        { name: 'author', content: 'Jeffrey Zschot' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#1a3fe0' },

        // Geo meta tags
        { name: 'geo.region', content: 'NL-NH' },
        { name: 'geo.placename', content: 'Amsterdam' },
        { name: 'geo.position', content: '52.3676;4.9041' },
        { name: 'ICBM', content: '52.3676, 4.9041' },

        // Language
        { name: 'language', content: 'Dutch, English' },
        { name: 'content-language', content: 'nl, en' },

        // Keywords
        { name: 'keywords', content: 'Jeffrey Zschot, digital builder, software developer, AI engineer, Amsterdam, Noord-Holland, web development, automation, creative direction, content creation, AITJE, Zschot Media' },

        // Verification & ownership
        { name: 'creator', content: 'Jeffrey Zschot' },
        { name: 'publisher', content: 'Jeffrey Zschot' },
      ],
      link: [
        { rel: 'canonical', href: 'https://jeffreyz.nl' },
        { rel: 'author', href: '/humans.txt' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' },
      ],
    },
  },
})
