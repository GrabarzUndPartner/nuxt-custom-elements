
const esm = require('esm')
const { Nuxt } = require('@nuxt/core')
const { Builder } = require('@nuxt/builder')

const { getConfigPath } = esm(module)(require.resolve('./utils'))
const { MODULE_NAME, initDist } = esm(module)(require.resolve('../lib/utils'))

const config = esm(module)(getConfigPath())
config.dev = false
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)

function getModuleConfig (nuxtConfig, name) {
  const module = nuxtConfig.modules.find((module) => {
    return [].concat(module)[0].includes(name) || [].concat(module)[0].includes('@/../')
  })
  return Object.assign(module[1])
}

const options = getModuleConfig(config, MODULE_NAME)

// remove `nuxt-genereate-custom-element` module
config.modules = config.modules.filter((module) => {
  return ![].concat(module)[0].includes(MODULE_NAME)
})

createNuxtBuild(builder)
  .then(() => initDist(nuxt, options))
  .then(exit)
  .catch((err) => {
    throw err
  })

function createNuxtBuild (builder) {
  return builder.build()
}

function exit () {
  process.exit(0)
}
