import { resolve } from 'upath'

const express = require('express')
const { generatePort } = require('@nuxtjs/module-test-utils')
const HOST = 'localhost'

export function startStaticServer (dist, port = 3000, host = HOST) {
  const app = express()
  app.use(express.static(dist))
  return app.listen(port, host)
}

export async function getUrl (path) {
  return `http://${HOST}:${await generatePort()}${path}`
}

export function getBuildDir (generatesDir) {
  return resolve(generatesDir, '.nuxt')
}
export function getDistDir (generatesDir) {
  return resolve(generatesDir, 'dist')
}
export function getGeneratedDir (generatesDir) {
  return resolve(getDistDir(generatesDir), 'generated')
}
export function getCustomElementsDir (generatesDir, customBuildDir, generated = true) {
  if (customBuildDir) {
    return resolve(getDistDir(generatesDir), 'custom-build-dir')
  } else if (generated) {
    return resolve(getGeneratedDir(generatesDir), 'nuxt-custom-elements')
  } else {
    return resolve(getBuildDir(generatesDir), 'nuxt-custom-elements', 'dist')
  }
}

export function getGeneratesDir (...args) {
  return resolve(__dirname, 'generates', ...args)
}
