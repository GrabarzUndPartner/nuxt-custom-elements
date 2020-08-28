import path from 'upath'
import fsExtra from 'fs-extra'
import { paramCase, pascalCase } from 'change-case'
import consola from 'consola'

export const MODULE_NAME = 'nuxt-custom-elements'

const BUILD_DIR = 'dist'
const ENTRIES_DIR = 'entries'

export function getEntriesDir (nuxt) {
  return path.toUnix(path.resolve(nuxt.options.buildDir, MODULE_NAME, ENTRIES_DIR))
}
export function getBuildDir (nuxt) {
  return path.toUnix(path.resolve(nuxt.options.buildDir, MODULE_NAME, BUILD_DIR))
}
export function getDistDir (nuxt) {
  return path.toUnix(path.resolve(nuxt.options.generate.dir, MODULE_NAME))
}

export function getDefaultOptions (options) {
  const webpackOutputOptions = getDefaultWebpackOutputOptions()

  if ('publicPath' in options) {
    consola.warn(`${MODULE_NAME}: option "publicPath" is deprecated, use "webpackOuput.publicPath"`)
    options.webpackOutput = Object.assign({
      publicPath: options.publicPath
    }, (options.webpackOutput || {}))
    delete options.publicPath
  }

  return Object.assign({
    buildDir: null,
    name: MODULE_NAME,
    analyzer: false,
    modern: undefined,
    polyfill: false,
    entries: [],
    shadow: false
  }, options, {
    webpackOutput: Object.assign(webpackOutputOptions, options.webpackOutput)
  })
}

/**
 * Prepare entry and its tags.
 * @param {Object} entry Endpoint-Entry
 * @param {Object} options Module-Options
 */
function prepareEntry (entry, options) {
  const tags = entry.tags.map((tag) => {
    const tagOptions = Object.assign({ shadow: Boolean(options.shadow) }, tag.options)
    return Object.assign(tag, {
      name: paramCase(tag.name),
      options: tagOptions,
      async: tag.async || false
    })
  })
  return Object.assign(entry, {
    name: paramCase(entry.name),
    tags
  })
}

/**
 * Create prepared entry list.
 * @param {Object} nuxt Nuxt
 * @param {Object} options Module-Options
 */
export function generateEntries (nuxt, options) {
  return options.entries.map((entry) => {
    entry = prepareEntry(entry, options)
    return {
      name: entry.name,
      template: {
        src: path.resolve(__dirname, '../tmpl', 'entry.js'),
        options: {
          tags: entry.tags,
          polyfill: options.polyfill
        },
        fileName: path.resolve(getEntriesDir(nuxt), `${entry.name}.js`)
      }
    }
  })
}

export async function onBuildDone (nuxt, options) {
  if (options.buildDir) {
    await fsExtra.copy(getBuildDir(nuxt), options.buildDir)
    consola.info(`Custom-Elements output directory: ${options.buildDir}`)
    consola.success('Generated Custom-Elements!')
  }
}

export async function onGeneratedDone (nuxt, options) {
  const buildDir = getBuildDir(nuxt)
  let distPath = getDistDir(nuxt)

  // Clean destination folder
  if (options.buildDir) {
    distPath = options.buildDir
  }

  await fsExtra.remove(distPath)
  await fsExtra.copy(buildDir, distPath)
  consola.info(`Custom-Elements output directory: ${distPath}`)
  consola.success('Generated Custom-Elements')
}

export function getEntryNamingMap (options) {
  return options.entries.reduce((result, { name }) => {
    result[String(pascalCase(name))] = paramCase(name)
    result[String(paramCase(name))] = paramCase(name)
    return result
  }, {})
}

function DEFAULT_FILENAME_FUNC (chunk, webpackConfig, moduleOptions) {
  if (moduleOptions.modern) {
    if (webpackConfig.name === 'modern') {
      return '[name].modern.js'
    } else {
      return '[name].client.js'
    }
  } else {
    return '[name].js'
  }
}

export function getDefaultWebpackOutputOptions () {
  return {
    filename: DEFAULT_FILENAME_FUNC,
    publicPath: './'
  }
}
