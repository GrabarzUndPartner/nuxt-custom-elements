import path from 'path'
import { paramCase } from 'change-case'
const { defaultNuxtConfigFile } = require('@nuxt/config')

export function getArg (name) {
  name = paramCase(name)
  const args = process.argv.slice(2)
  let value = !!args[args.indexOf(`--${name}`)]
  if (args.includes(`--${name}`) && args[args.indexOf(`--${name}`) + 1]) {
    value = args[args.indexOf(`--${name}`) + 1]
  }
  return value
}

export function getConfigPath () {
  const configPath = getArg('configFile')
  if (configPath) {
    return path.resolve(configPath)
  } else {
    return path.resolve(process.cwd(), defaultNuxtConfigFile)
  }
}
