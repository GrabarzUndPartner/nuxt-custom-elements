import { resolve } from 'path'
import { getDefaultOptions, getEntriesDir, getEntryNamingMap, generateEntries, initDist } from './utils'
import { getConfigs, build } from './utils/webpack'

module.exports = function (moduleOptions) {
  const options = getDefaultOptions({
    ...moduleOptions,
    ...this.options['nuxt-custom-elements']
  })

  const nuxt = this.nuxt

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-virtual-content.js',
    options: Object.assign({
      entriesDir: getEntriesDir(nuxt),
      entryMap: getEntryNamingMap(options)
    }, options)
  })

  nuxt.hook('build:before', () => {
    const entries = generateEntries(nuxt, options)
    options.entry = entries.reduce((result, { name, template }) => {
      const { dst } = this.addTemplate(template)
      result[String(name)] = dst
      return result
    }, {})
  })

  if (!this.nuxt.options.dev) {
    nuxt.hook('build:done', builder => getConfigs(builder, options).then(configs => build(configs, nuxt)))
    nuxt.hook('generate:done', () => initDist(nuxt, options))
  }
}

module.exports.meta = require('../package.json')
