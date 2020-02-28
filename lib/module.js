import { resolve } from 'path'
import { getDefaultOptions, getEntriesDir, getEntryNamingMap, generateEntries, initDist, MODULE_NAME } from './utils'
import { getConfigs, build } from './utils/webpack'

module.exports = function (moduleOptions) {
  const options = getDefaultOptions({
    name: MODULE_NAME,
    ...moduleOptions,
    ...this.options[MODULE_NAME]
  })

  const nuxt = this.nuxt

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-custom-elements-plugin.js',
    options: Object.assign({
      entriesDir: getEntriesDir(nuxt),
      entryMap: getEntryNamingMap(options)
    }, options)
  })

  registerHooks(nuxt, options)
}

function registerHooks (nuxt, options) {
  nuxt.hook('build:before', () => {
    const entries = generateEntries(nuxt, options)
    options.entry = entries.reduce((result, { name, template }) => {
      const { dst } = nuxt.moduleContainer.addTemplate(template)
      result[String(name)] = dst
      return result
    }, {})
  })

  if (!nuxt.options.dev) {
    nuxt.hook('build:done', builder => getConfigs(builder, options).then(configs => build(configs, nuxt, options.parallelBuilds)))
    nuxt.hook('generate:done', () => initDist(nuxt, options))
  }
}

module.exports.meta = require('../package.json')
