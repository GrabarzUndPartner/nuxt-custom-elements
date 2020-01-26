import Vue from 'vue'

function isProduction () {
  return process.env.NODE_ENV === 'production'
}

/**
 * Register placeholders for missing Nuxt components
 */
export function setup () {
  if (isProduction()) {
    Vue.component('NuxtLink', {
      extends: Vue.component('RouterLink')
    })
  }
}
