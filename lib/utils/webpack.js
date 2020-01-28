import path from 'path'
import fsExtra from 'fs-extra'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { getTagHTMLFromEntry } from './tags'
import { getBuildDir, MODULE_NAME } from './index'

const AVAILABLE_CONFIG_NAMES = ['client', 'modern']

export function build (webpackConfigs, nuxt) {
  return Promise.all(webpackConfigs.map(config => new Promise((resolve) => {
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        throw err
      }
      resolve(stats)
    })
  }))).then((statsList) => {
    const content = JSON.stringify(statsList.map(stats => getJSFilesFromStats(stats)))
    const filepath = path.resolve(getBuildDir(nuxt), 'release.json')
    return fsExtra.writeFile(filepath, content, 'utf-8')
  })
}

export function getConfigs (builder, options) {
  return getNuxtWebpackConfigs(builder).then((configs) => {
    return configs
      .filter(config => AVAILABLE_CONFIG_NAMES.includes(config.name))
      .map((config) => {
        return getWebpackConfig(builder.nuxt, config, options)
      })
  })
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

export function getWebpackConfig (nuxt, config, options) {
  const buildDir = getBuildDir(nuxt)
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

  plugins.splice(htmlWebpackPluginIndex, 0, ...createHtmlWebpackPlugins(options.entries))

  // BundleAnalyzerPlugin
  if (options.analyzer) {
    const analyzerOptions = Object.assign({
      reportFilename: path.resolve(`reports/webpack/${MODULE_NAME}/${config.name}.html`),
      statsFilename: path.resolve(`reports/webpack/${MODULE_NAME}/stats/${config.name}.json`),
      analyzerMode: 'static',
      generateStatsFile: true,
      openAnalyzer: false,
      logLevel: 'info',
      defaultSizes: 'gzip',
      statsOptions: 'normal'
    }, options.analyze)
    plugins.push(new BundleAnalyzerPlugin(analyzerOptions))
  }

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

function createHtmlWebpackPlugin (chunks, filename, tags) {
  filename = filename + '.html'
  return new HtmlWebpackPlugin({
    // inject: false,
    chunks,
    template: path.resolve(__dirname, '../tmpl', 'index.html.tmpl'),
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
        tags,
        base: path.relative(`/${path.dirname(filename)}`, '/')
      }
    }
  })
}

function createHtmlWebpackPlugins (entries) {
  const tags = entries.map(entry => createHtmlWebpackPlugin([entry.name], entry.name, getTagHTMLFromEntry(entry)))
  tags.unshift(createHtmlWebpackPlugin(entries.map(entry => entry.name), 'index', entries.reduce((result, entry) => {
    result.push(...getTagHTMLFromEntry(entry))
    return result
  }, [])))
  return tags
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
