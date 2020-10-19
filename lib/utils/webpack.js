import path from 'path'
import fsExtra from 'fs-extra'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { getTagHTMLFromEntry } from './tags'
import { getBuildDir, MODULE_NAME } from './index'

function webpackBuild (config) {
  return new Promise((resolve) => {
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        throw err
      }
      resolve(stats)
    })
  })
}

async function processBuilds (webpackConfigs, statsList = []) {
  const configs = webpackConfigs.splice(0, Math.min(1, webpackConfigs.length))
  if (configs.length > 0) {
    const stats = await Promise.all(configs.map(async config => ({ name: Object.keys(config.entry)[0], stats: await webpackBuild(config) })))
    return processBuilds(webpackConfigs, statsList.concat(stats))
  } else {
    return statsList
  }
}

export function build (webpackConfigs, nuxt) {
  const builds = processBuilds(webpackConfigs.flat())
  return builds.then((statsList) => {
    const releases = statsList.reduce((result, { name, stats }) => {
      const data = getJSFilesFromStats(stats)
      result[name] = Object.assign({}, result[name], { [data.name]: data })
      return result
    }, {})
    return Promise.all(Object.keys(releases).map((name) => {
      const content = JSON.stringify(releases[name])
      const filepath = path.resolve(getBuildDir(nuxt), name, 'release.json')
      return fsExtra.writeFile(filepath, content, 'utf-8')
    }))
  }).catch((err) => {
    throw err
  })
}

export function prepareConfigs (webpackConfigs, nuxt, options) {
  const configNames = ['client']
  if (options.modern) {
    configNames.push('modern')
  }
  return Object.keys(options.entry).map((entryName, i) => {
    return webpackConfigs.filter(config => configNames.includes(config.name))
      .map((config) => {
        return getWebpackConfig(entryName, nuxt, config, Object.assign({}, options, { entry: { [entryName]: options.entry[entryName] } }))
      })
  })
}

export function getWebpackConfig (entryName, nuxt, config, options) {
  const isModernBuild = config.name === 'modern'
  const buildDir = path.normalize(path.join(getBuildDir(nuxt), entryName))
  const pluginExcludes = [
    'VueSSRClientPlugin', 'CorsPlugin', 'HtmlWebpackPlugin', 'BundleAnalyzerPlugin',
    // FIXME: Remove all native Objects, PWA Modul registriert sich ohne identifizierbares Object (PWA)
    'Object'
  ]
  const htmlWebpackPluginIndex = config.plugins.indexOf(config.plugins.find(plugin => plugin.constructor.name === 'HtmlWebpackPlugin'))

  // ModernModePlugin
  const plugins = config.plugins.reduce((result, plugin) => {
    if (!pluginExcludes.includes(plugin.constructor.name)) {
      result.push(...pluginReplace(plugin, {
        ModernModePlugin: {
          targetDir: buildDir,
          isModernBuild
        }
      }))
    }
    return result
  }, [])

  plugins.splice(htmlWebpackPluginIndex, 0, ...createHtmlWebpackPlugins(options.entries.filter(({ name }) => entryName === name), options.publicPath))

  plugins.push(...getBundleAnalyzerPlugin(options, config, entryName))

  const { filename, chunkFilename } = options.webpackOutput

  function resolveFilename (filename, config, options) {
    if (typeof filename === 'function') {
      return filename(config, options)
    }
    return filename
  }

  return Object.assign({}, config, {
    target: 'web',
    entry: prepareEntries(config, options, isModernBuild),
    output: Object.assign({
      publicPath: './'
    }, options.webpackOutput, {
      filename: resolveFilename(filename, config, options),
      chunkFilename: resolveFilename(chunkFilename, config, options),
      path: buildDir
    }),
    optimization: {
      // minimize: false,
      runtimeChunk: false
    },
    plugins
  })
}

function prepareEntries (config, options, isModernBuild) {
  return Object.fromEntries(Object.keys(options.entry).map((key) => {
    const files = config.entry.app.map((file) => {
      if (file.endsWith('client.js')) {
        return options.entry[String(key)][isModernBuild ? 'modern' : 'client']
      }
      return file
    })
    return [key, files]
  }))
}

function getBundleAnalyzerPlugin (options, config, entryName) {
  // BundleAnalyzerPlugin
  if (options.analyzer) {
    const analyzerOptions = Object.assign({
      reportFilename: path.resolve(`reports/webpack/${MODULE_NAME}/${entryName}/${config.name}.html`),
      statsFilename: path.resolve(`reports/webpack/${MODULE_NAME}/${entryName}/stats/${config.name}.json`),
      analyzerMode: 'static',
      generateStatsFile: true,
      openAnalyzer: false,
      logLevel: 'info',
      defaultSizes: 'gzip',
      statsOptions: 'normal'
    }, options.analyze)
    return [new BundleAnalyzerPlugin(analyzerOptions)]
  }
  return []
}

function createHtmlWebpackPlugin (chunks, publicPath, filename, tags) {
  filename = filename + '.html'
  return new HtmlWebpackPlugin({
    title: chunks.join(' - '),
    chunks,
    template: path.resolve(__dirname, '../tmpl', 'index.html'),
    filename,
    templateParameters: (compilation, assets, assetTags) => {
      return {
        htmlWebpackPlugin: {
          tags: assetTags,
          files: assets,
          options: {
            title: assetTags.title
          }
        },
        publicPath,
        tags,
        base: path.relative(`/${path.dirname(filename)}`, '/')
      }
    }
  })
}

function createHtmlWebpackPlugins (entries, publicPath) {
  return [
    createHtmlWebpackPlugin(entries.map(entry => entry.name), publicPath, 'index', entries.reduce((result, entry) => {
      result.push(...getTagHTMLFromEntry(entry))
      return result
    }, []))
  ]
}

function pluginReplace (plugin, replacments) {
  const keys = Object.keys(replacments)
  for (let i = 0; i < keys.length; i++) {
    if (plugin.constructor.name === keys[Number(i)]) {
      return [].concat(replacments[String(keys[Number(i)])]).map(options => new plugin.constructor(options))
    }
  }
  return [plugin]
}

export function getJSFilesFromStats (stats) {
  const name = stats.compilation.name
  const assets = stats.toJson().assetsByChunkName
  const files = Object.keys(assets).map((name) => {
    return {
      name,
      file: assets[String(name)]
    }
  })
  return {
    timestamp: stats.endTime,
    hash: stats.hash,
    name,
    files
  }
}
