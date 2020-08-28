import { resolve } from 'path'
import consola from 'consola'
import { getDefaultOptions, getEntriesDir, getEntryNamingMap, generateEntries, MODULE_NAME, onBuildDone, onGeneratedDone } from './utils'
import { getConfigs, build } from './utils/webpack'

module.exports = function (moduleOptions) {
  const options = getDefaultOptions({
    name: MODULE_NAME,
    ...moduleOptions,
    ...this.options[MODULE_NAME]
  })

  if ('staticPath' in options) {
    consola.error('nuxt-custom-elements:', 'Option staticPath was removed. Use imports or other copy processes.')
  }

  const nuxt = this.nuxt

  if (options.modern === undefined) {
    options.modern = nuxt.options.modern === 'client'
  } else if (options.modern && nuxt.options.modern !== 'client') {
    consola.error('nuxt-custom-elements:', 'Can\'t using modern, activate modern build in nuxt')
  }

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
    nuxt.hook('build:done', async (builder) => {
      await getConfigs(builder, options).then(configs => build(configs, nuxt))
      if (!nuxt.options.target !== 'static') {
        await onBuildDone(nuxt, options)
      }
    })
    nuxt.hook('generate:done', () => onGeneratedDone(nuxt, options))
  }
}

module.exports.meta = require('../package.json')
