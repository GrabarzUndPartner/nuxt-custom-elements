const path = require('path');
const fsExtra = require('fs-extra');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const clone = require('clone');
const { getTagHTMLFromEntry } = require('./tags');
const { getBuildDir, MODULE_NAME } = require('./index');

function webpackBuild (config) {
  return new Promise((resolve) => {
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        throw err;
      }
      resolve(stats);
    });
  });
}

async function processBuilds (webpackConfigs, statsList = []) {
  const configs = webpackConfigs.splice(0, Math.min(1, webpackConfigs.length));
  if (configs.length > 0) {
    const stats = await Promise.all(configs.map(async config => ({ name: Object.keys(config.entry)[0], stats: await webpackBuild(config) })));
    return processBuilds(webpackConfigs, statsList.concat(stats));
  } else {
    return statsList;
  }
}

function build (webpackConfigs, nuxt) {
  const builds = processBuilds(webpackConfigs.flat());
  return builds.then((statsList) => {
    const releases = statsList.reduce((result, { name, stats }) => {
      const data = getJSFilesFromStats(stats);
      result[String(name)] = Object.assign({}, result[String(name)], { [data.name]: data });
      return result;
    }, {});
    return Promise.all(Object.keys(releases).map((name) => {
      const content = JSON.stringify(releases[String(name)]);
      const filepath = path.resolve(getBuildDir(nuxt), name, 'release.json');
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      return fsExtra.writeFile(filepath, content, 'utf-8');
    }));
  }).catch((err) => {
    throw err;
  });
}

function setLoaderRulesForShadowMode (rules) {
  const vueLoaderRule = rules.find(({ test }) => test.test('.vue'));
  if (vueLoaderRule) {
    vueLoaderRule.options.shadowMode = true;
  } else {
    throw new Error('Can\'t find `vue-loader`…');
  }
  const ruleSets = ['css', 'postcss', 'scss', 'sass', 'less', 'stylus'];
  const vueStyleLoaderDefinitions = ruleSets.reduce((result, name) => [
    ...result,
    rules
      .find(({ test }) => test.test(`.${name}`))], [])
    .filter(Boolean)
    .map((v) => {
      if ('oneOf' in v) {
        const one = v.oneOf.find(v => Object.keys(v).length === 1);
        if (one && 'use' in one) {
          return one.use[0];
        }
      }
      return null;
    });
  if (vueStyleLoaderDefinitions.length) {
    vueStyleLoaderDefinitions.forEach(({ options }) => (options.shadowMode = true));
  } else {
    throw new Error('Can\'t find `vue-style-loader` rules…');
  }

  return rules;
}

function getWebpackConfig (entryName, nuxt, config, options) {
  const isModernBuild = config.name === 'modern';
  const buildDir = path.normalize(path.join(getBuildDir(nuxt), entryName));
  const pluginExcludes = [
    'VueSSRClientPlugin', 'CorsPlugin', 'HtmlWebpackPlugin', 'BundleAnalyzerPlugin',
    // Remove all native Objects, PWA Modul registriert sich ohne identifizierbares Object (PWA)
    'Object'
  ];

  const htmlWebpackPluginIndex = config.plugins.indexOf(config.plugins.find(plugin => plugin.constructor.name === 'HtmlWebpackPlugin'));

  let rules = clone(config.module.rules);
  if (options.entries.find(({ name }) => name === entryName).shadow) {
    rules = setLoaderRulesForShadowMode(rules);
  }
  rules = fixCSSLoaderRulesForExtractCSS(nuxt, rules);

  // ModernModePlugin
  let plugins = config.plugins.reduce((result, plugin) => {
    if (!pluginExcludes.includes(plugin.constructor.name)) {
      result.push(...pluginReplace(plugin, {
        ModernModePlugin: {
          targetDir: buildDir,
          isModernBuild
        }
      }));
    }
    return result;
  }, []);

  plugins.splice(htmlWebpackPluginIndex, 0, ...createHtmlWebpackPlugins(options.entries.filter(({ name }) => entryName === name), options.publicPath));

  plugins.push(...getBundleAnalyzerPlugin(options, config, entryName));

  plugins = plugins.concat(options.webpack.plugins || []);

  const { filename, chunkFilename } = options.webpack.output;

  return Object.assign({}, config, {
    target: 'web',
    entry: prepareEntries(config, options, isModernBuild),
    output: Object.assign({
      publicPath: './'
    }, options.webpack.output, {
      filename: resolveFilename(filename, config, options),
      chunkFilename: resolveFilename(chunkFilename, config, options),
      path: buildDir
    }),
    optimization: Object.assign({
      runtimeChunk: false
    }, options.webpack.optimization),
    plugins,
    module: {
      ...config.module,
      rules
    }
  });
}

function resolveFilename (filename, config, options) {
  if (typeof filename === 'function') {
    return filename(config, options);
  }
  return filename;
}

function prepareEntries (config, options, isModernBuild) {
  return Object.fromEntries(Object.keys(options.entry).map((key) => {
    const files = config.entry.app.map((file) => {
      if (file.endsWith('client.js')) {
        return options.entry[String(key)][isModernBuild ? 'modern' : 'client'];
      }
      return file;
    });
    return [key, files];
  }));
}

function getBundleAnalyzerPlugin (options, config, entryName) {
  // BundleAnalyzerPlugin
  if (options.analyzer) {
    const analyzerOptions = Object.assign({
      reportFilename: path.resolve(`.reports/webpack/${MODULE_NAME}/${entryName}/${config.name}.html`),
      statsFilename: path.resolve(`.reports/webpack/${MODULE_NAME}/${entryName}/stats/${config.name}.json`),
      analyzerMode: 'static',
      generateStatsFile: true,
      openAnalyzer: false,
      logLevel: 'info',
      defaultSizes: 'gzip',
      statsOptions: 'normal'
    }, options.analyze);
    return [new BundleAnalyzerPlugin(analyzerOptions)];
  }
  return [];
}

function createHtmlWebpackPlugin (chunks, publicPath, filename, tags) {
  filename = filename + '.html';
  return new HtmlWebpackPlugin({
    title: chunks.join(' - '),
    chunks: 'all',
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
      };
    }
  });
}

function createHtmlWebpackPlugins (entries, publicPath) {
  return [
    createHtmlWebpackPlugin(entries.map(entry => entry.name), publicPath, 'index', entries.reduce((result, entry) => {
      result.push(...getTagHTMLFromEntry(entry));
      return result;
    }, []))
  ];
}

function pluginReplace (plugin, replacments) {
  const keys = Object.keys(replacments);
  for (let i = 0; i < keys.length; i++) {
    if (plugin.constructor.name === keys[Number(i)]) {
      return [].concat(replacments[String(keys[Number(i)])]).map(options => new plugin.constructor(options));
    }
  }
  return [plugin];
}

function getJSFilesFromStats (stats) {
  const name = stats.compilation.name;
  const assets = stats.toJson().assetsByChunkName;
  const files = Object.keys(assets).map((asset) => {
    return {
      asset,
      file: assets[String(asset)]
    };
  });
  return {
    timestamp: stats.endTime,
    hash: stats.hash,
    name,
    files
  };
}

function normalizeConfigs (builderConfigs, webpackConfigs) {
  return builderConfigs.map((buildConfig) => {
    const webpackConfig = webpackConfigs.find(config => config.name === buildConfig.name);
    buildConfig.entry = webpackConfig.entry;
    return buildConfig;
  });
}

function prepareConfigs (builderConfigs, webpackConfigs, nuxt, options) {
  const configs = normalizeConfigs(builderConfigs, webpackConfigs);

  const configNames = ['client'];
  if (options.modern) {
    configNames.push('modern');
  }
  return Object.keys(options.entry).map((entryName, i) => {
    return configs.filter(config => configNames.includes(config.name))
      .map((config) => {
        return getWebpackConfig(entryName, nuxt, config, Object.assign({}, options, { entry: { [entryName]: options.entry[String(entryName)] } }));
      });
  });
}

function getBuilderWebpackConfigs (builder) {
  const bundles = builder.bundleBuilder.compilers.map((compiler) => {
    return compiler.name.substring(0, 1).toUpperCase() + compiler.name.substring(1);
  });
  return Promise.all(bundles.map((name) => {
    return builder.bundleBuilder.getWebpackConfig(name);
  }));
}

/**
 * Property "use.options.modules.exportOnlyLocals" must be removed if static is defined as the target and "nuxt.options.extractCSS" is active.
 */
function fixCSSLoaderRulesForExtractCSS (nuxt, rules) {
  if (nuxt.options.build.extractCSS) {
    return rules.map((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach(oneOf => oneOf.use && oneOf.use.forEach((use) => {
          if (use.options && use.options.modules) {
            delete use.options.modules.exportOnlyLocals;
          }
        }));
      }
      return rule;
    });
  }
  return rules;
}

module.exports = {
  build,
  getWebpackConfig,
  getJSFilesFromStats,
  prepareConfigs,
  getBuilderWebpackConfigs
};
