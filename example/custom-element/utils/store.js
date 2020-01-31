import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => new Vuex.Store({
  modules: getModules()
})

/**
 * Adds modules to the store.
 */
function getModules () {
  const moduleReq = require.context('../store', true, /\.js$/)
  return moduleReq.keys().reduce((result, key) => {
    const name = key.replace(/\.\/(.*)\.js/, '$1')
    result[String(name)] = Object.assign({ namespaced: true }, moduleReq(key))
    return result
  }, {})
}
