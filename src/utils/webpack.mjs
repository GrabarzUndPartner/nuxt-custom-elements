import path from 'pathe';
import clone from 'clone';
import { paramCase } from 'change-case';

import { getTagHTMLFromEntry } from './tags.mjs';
import { getBuildDir, MODULE_NAME, getDefaultWebpackOutputOptions } from './index.mjs';

async function webpackBuild (config) {
  const Webpack = await import('webpack').then(module => module.default);
  return new Promise((resolve) => {
    Webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        throw err;
      }
      resolve(stats);
    });
  });
}

async function build (webpackConfigs, statsList = []) {
  const configs = webpackConfigs.splice(0, Math.min(1, webpackConfigs.length));
  if (configs.length > 0) {
    const stats = await Promise.all(configs.map(async config => ({ name: Object.keys(config.entry)[0], stats: await webpackBuild(config) })));
    return build(webpackConfigs, statsList.concat(stats));
  } else {
    return statsList;
  }
}

async function getWebpackConfig (runtimeDir, entryName, nuxt, config, options) {
  const buildDir = path.normalize(path.join(getBuildDir(nuxt), entryName));
  const pluginExcludes = [
    'VueSSRClientPlugin', 'CorsPlugin', 'HtmlWebpackPlugin', 'BundleAnalyzerPlugin',
    // Remove all native Objects, PWA Modul registriert sich ohne identifizierbares Object (PWA)
    'Object'
  ];

  const htmlWebpackPluginIndex = config.plugins.indexOf(config.plugins.find(plugin => plugin.constructor.name === 'HtmlWebpackPlugin'));

  let rules = clone(config.module.rules);
  rules = setLoaderRulesForShadowMode(rules);

  const plugins = config.plugins.filter(plugin => !pluginExcludes.includes(plugin.constructor.name));

  plugins.splice(htmlWebpackPluginIndex, 0, ...(await createHtmlWebpackPlugins(runtimeDir, options.entries.filter(({ name }) => entryName === paramCase(name)), options.publicPath)));

  plugins.push(...(await getBundleAnalyzerPlugin(options, config, entryName)));

  const output = getDefaultWebpackOutputOptions();

  const { filename, chunkFilename } = output;
  const webpackExtend = options.entries.find(({ name }) => paramCase(name) === entryName).webpackExtend || (config => config);
  return await webpackExtend(Object.assign({}, config, {
    target: 'web',
    entry: prepareEntries(config, options),
    output: Object.assign(output, {
      filename: resolveFilename(filename, config, options),
      chunkFilename: resolveFilename(chunkFilename, config, options),
      path: buildDir
    }),
    optimization: {
      runtimeChunk: false
    },
    plugins,
    module: {
      ...config.module,
      rules
    }
  }), { client: true });
}

function resolveFilename (filename, config, options) {
  if (typeof filename === 'function') {
    return filename(config, options);
  }
  return filename;
}

function prepareEntries (config, options) {
  return Object.fromEntries(Object.keys(options.entry).map((key) => {
    const files = config.entry.app.map((file) => {
      if (file.endsWith('/entry')) {
        return options.entry[String(key)].client;
      }
      return file;
    });
    return [key, files];
  }));
}

async function getBundleAnalyzerPlugin (options, config, entryName) {
  const { BundleAnalyzerPlugin } = await import('webpack-bundle-analyzer');
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

async function createHtmlWebpackPlugin (runtimeDir, chunks, publicPath, filename, tags) {
  const HtmlWebpackPlugin = await import('html-webpack-plugin').then(module => module.default);
  filename = filename + '.html';
  return new HtmlWebpackPlugin({
    title: chunks.join(' - '),
    chunks: 'all',
    template: path.resolve(runtimeDir, '../runtime/tmpl/webpack', 'index.html'),
    filename,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

async function createHtmlWebpackPlugins (runtimeDir, entries, publicPath) {
  return [
    await createHtmlWebpackPlugin(runtimeDir, entries.map(entry => entry.name), publicPath, 'index', entries.reduce((result, entry) => {
      result.push(...getTagHTMLFromEntry(entry));
      return result;
    }, []))
  ];
}

function setLoaderRulesForShadowMode (rules) {
  const vueLoaderRule = rules.find(({ test }) => test.test('.vue'));

  if (vueLoaderRule) {
    vueLoaderRule.use[0].options.customElement = true;
  } else {
    throw new Error('Can\'t find `vue-loader`…');
  }

  return rules;
}

export {
  build,
  getWebpackConfig

};

export function prepareEntryConfigs (runtimeDir, webpackConfig, nuxt, options) {
  return Promise.all(Object.keys(options.entry).map((entryName) => {
    return getWebpackConfig(runtimeDir, entryName, nuxt, webpackConfig, Object.assign({}, options, { entry: { [entryName]: options.entry[String(entryName)] } }));
  }));
}
