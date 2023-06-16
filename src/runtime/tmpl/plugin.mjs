import { registerEntry } from '#build/nuxt-custom-elements/entries.mjs';

export default defineNuxtPlugin((nuxtApp) => {
 nuxtApp.hook('vue:setup', () => {
    nuxtApp.provide('customElements', { registerEntry });
  })
})
