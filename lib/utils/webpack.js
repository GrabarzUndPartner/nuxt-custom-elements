import path from 'path'
import fsExtra from 'fs-extra'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { getTagHTMLFromEntry } from './tags'
import { getBuildDir, MODULE_NAME } from './index'

const AVAILABLE_CONFIG_NAMES = ['client', 'modern']
const DEFAULT_WEBPACK_PUBLIC_PATH = './'

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

async function parallelBuild (webpackConfigs, parallelBuilds = 1, statsList = []) {
  const configs = webpackConfigs.splice(0, Math.min(parallelBuilds, webpackConfigs.length))
  if (configs.length > 0) {
    const stats = await Promise.all(configs.map(config => webpackBuild(config)))
    return parallelBuild(webpackConfigs, parallelBuilds, statsList.concat(stats))
  } else {
    return statsList
  }
}

export function build (webpackConfigs, nuxt, parallelBuilds = 1) {
  const builds = parallelBuild(webpackConfigs.flat(), parallelBuilds)
  return builds.then((statsList) => {
    const releases = statsList.reduce((result, stats) => {
      const data = getJSFilesFromStats(stats)
      result[data.files[0].name] = Object.assign({}, result[data.files[0].name], { [data.name]: data })
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

export function getConfigs (builder, options) {
  return Promise.all(Object.keys(options.entry).map((entryName, i) => {
    const entry = options.entries.find(({ name }) => name === entryName)
    return getNuxtWebpackConfigs(builder).then((configs) => {
      return configs
        .filter(config => AVAILABLE_CONFIG_NAMES.includes(config.name))
        .map((config) => {
          return getWebpackConfig(entryName, builder.nuxt, config, Object.assign({}, options, { publicPath: entry.publicPath || DEFAULT_WEBPACK_PUBLIC_PATH, entry: { [entryName]: options.entry[entryName] } }))
        })
    })
  }))
}

export function getNuxtWebpackConfigs (builder) {
  const bundles = builder.bundleBuilder.compilers.map((compiler) => {
    const name = compiler.name.substring(0, 1).toUpperCase() + compiler.name.substring(1)
    return name
  })
  return Promise.all(bundles.map((name) => {
    return builder.bundleBuilder.getWebpackConfig(name)
  }))
}

export function getWebpackConfig (entryName, nuxt, config, options) {
  const buildDir = getBuildDir(nuxt) + '/' + entryName
  const pluginExcludes = [
    'VueSSRClientPlugin', 'CorsPlugin', 'HtmlWebpackPlugin', 'BundleAnalyzerPlugin',
    // FIXME: Remove all native Objects, PWA Modul registriert sich ohne identifizierbares Object (PWA)
    'Object'
  ]
  // const htmlWebpackPlugin =
  // const HtmlWebpackPlugin = htmlWebpackPlugin.constructor
  const htmlWebpackPluginIndex = config.plugins.indexOf(config.plugins.find(plugin => plugin.constructor.name === 'HtmlWebpackPlugin'))

  // ModernModePlugin
  const plugins = config.plugins.reduce((result, plugin) => {
    if (!pluginExcludes.includes(plugin.constructor.name)) {
      result.push(...pluginReplace(plugin, {
        ModernModePlugin: {
          targetDir: buildDir,
          isModernBuild: config.name === 'modern'
        }
      }))
    }
    return result
  }, [])

  plugins.splice(htmlWebpackPluginIndex, 0, ...createHtmlWebpackPlugins(options.entries.filter(({ name }) => entryName === name), options.publicPath))

  plugins.push(...getBundleAnalyzerPlugin(options, config, entryName))

  return Object.assign({}, config, {
    target: 'web',
    entry: options.entry,
    output: {
      path: buildDir,
      filename: '[name].[hash].js',
      publicPath: options.publicPath
    },
    optimization: {
      // minimize: false,
      runtimeChunk: false
    },
    plugins
  })
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
    // inject: false,
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
