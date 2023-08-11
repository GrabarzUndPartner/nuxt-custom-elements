import { defineNuxtConfig } from 'nuxt/config';
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/404.html']
    }
  },


  vite: {
    plugins: [
      svgLoader({
        svgo: false,
        defaultImport: 'component' // or 'raw'
      })
    ]
  },

  runtimeConfig: {},

  // @ts-ignore
  modules: [
    '@nuxtlabs/github-module',
    [
      '@nuxtjs/robots',
      {
        UserAgent: '*',
        Disallow: () => ['/reports']
      }
    ]
  ],
  // @ts-ignore
  github: {
    owner: 'GrabarzUndPartner',
    repo: 'nuxt-custom-elements',
    branch: 'main'
  }

});
