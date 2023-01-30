import Vue from 'vue'

const entryNamings = <%= JSON.stringify(options.entryMap) %>;


export default defineNuxtPlugin((nuxtApp) => {
 nuxtApp.hook('vue:setup', () => {

    const registerEntry = (name) => {
      if (process.client) {
        if (name in entryNamings){
          const filename = entryNamings[name]
          return import(<%= '`' + options.entriesDir + '/${filename}' + '.client`' %>)
        } else {
          throw new Error('Entry named "' + name + '" not found')
        }
      } else {
        return Promise.resolve();
      }
    };

  nuxtApp.provide('customElements', { registerEntry })


  })
})
