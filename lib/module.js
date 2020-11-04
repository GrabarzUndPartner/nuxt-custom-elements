import { resolve } from 'path'
import consola from 'consola'
import { getDefaultOptions, getEntriesDir, getEntryNamingMap, generateEntries, MODULE_NAME, onBuildDone, onGeneratedDone } from './utils'
import { build, prepareConfigs } from './utils/webpack'

module.exports = function (moduleOptions) {
  const options = getDefaultOptions({
    name: MODULE_NAME,
    ...moduleOptions,
    ...this.options[MODULE_NAME]
  })

  if ('polyfill' in options) {
    consola.error('nuxt-custom-elements:', 'Option polyfill was removed. Polyfill is included in the client build and use option modernPolyfill for modern build.')
  }
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

function registerHooks (nuxt, moduleOptions) {
  nuxt.hook('build:before', () => {
    const entries = generateEntries(nuxt, moduleOptions)
    moduleOptions.entry = entries.reduce((result, { name, template }) => {
      Object.keys(template).forEach((type) => {
        const { dst } = nuxt.moduleContainer.addTemplate(template[String(type)]);
        (result[name] || (result[name] = {}))[type] = dst
      })
      return result
    }, {})
  })

  if (!nuxt.options.dev) {
    let webpackConfigs = []
    nuxt.hook('webpack:config', configs => (webpackConfigs = configs))

    nuxt.hook('build:done', async () => {
      const configs = prepareConfigs(webpackConfigs, nuxt, moduleOptions)
      await build(configs, nuxt)
      if (!nuxt.options.target !== 'static') {
        await onBuildDone(nuxt, moduleOptions)
      }
    })
    nuxt.hook('generate:done', () => onGeneratedDone(nuxt, moduleOptions))
  }
}

module.exports.meta = require('../package.json')
