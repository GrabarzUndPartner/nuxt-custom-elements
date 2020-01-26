import path from 'path'
import fsExtra from 'fs-extra'
import { paramCase, pascalCase } from 'change-case'

export const MODULE_NAME = 'nuxt-custom-elements'
export const PATH_CACHE_DIR = path.resolve(process.cwd(), '.tmp', MODULE_NAME)

const BUILD_DIR = 'dist'
const ENTRIES_DIR = 'entries'

export function getEntriesDir (nuxt) {
  return path.resolve(nuxt.options.buildDir, MODULE_NAME, ENTRIES_DIR)
}
export function getBuildDir (nuxt) {
  return path.resolve(nuxt.options.buildDir, MODULE_NAME, BUILD_DIR)
}
export function getDistDir (nuxt) {
  return path.resolve(nuxt.options.generate.dir, MODULE_NAME)
}

export function getDefaultOptions (options) {
  return Object.assign({
    name: MODULE_NAME,
    analyzer: false,
    polyfill: false,
    publicPath: '/',
    staticPath: null,
    entries: [],
    shadowDom: false
  }, options)
}

/**
 * Prepare entry and its tags.
 * @param {Object} entry Endpoint-Entry
 * @param {Object} options Module-Options
 */
function prepareEntry (entry, options) {
  const tags = entry.tags.map((tag) => {
    const tagOptions = Object.assign({ shadow: Boolean(options.shadowDom) }, tag.options)
    return Object.assign(tag, {
      name: paramCase(tag.name),
      options: tagOptions
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
        src: path.resolve(__dirname, 'tmpl', 'entry.js.tmpl'),
        options: {
          tags: entry.tags,
          polyfill: options.polyfill
        },
        fileName: path.resolve(getEntriesDir(nuxt), `${entry.name}.js`)
      }
    }
  })
}

export async function initDist (nuxt, options) {
  const buildDir = getBuildDir(nuxt)
  const distPath = getDistDir(nuxt)

  // Clean destination folder
  await fsExtra.remove(distPath)

  // Copy static and built files
  if ('staticPath' in options) {
    if (await fsExtra.exists(options.staticPath)) {
      await fsExtra.copy(options.staticPath, distPath)
    }
  }
  await fsExtra.copy(buildDir, distPath)
}

export function getEntryNamingMap (options) {
  return options.entries.reduce((result, { name }) => {
    result[String(pascalCase(name))] = paramCase(name)
    result[String(paramCase(name))] = paramCase(name)
    return result
  }, {})
}
