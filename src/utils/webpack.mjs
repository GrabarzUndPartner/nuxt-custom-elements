import path from 'pathe';
import clone from 'clone';
import { kebabCase, pascalCase } from 'change-case';
import { webpackVueCESubStyle } from '@unplugin-vue-ce/sub-style';

import { getTagHTMLFromEntry } from './tags.mjs';

import {
  getBuildDir,
  MODULE_NAME,
  getDefaultWebpackOutputOptions
} from './index.mjs';

async function webpackBuild(config) {
  const Webpack = await import('webpack').then(module => module.default);
  return new Promise(resolve => {
    Webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        throw err;
      }
      resolve(stats);
    });
  });
}

async function build(webpackConfigs, statsList = []) {
  const configs = webpackConfigs.splice(0, Math.min(1, webpackConfigs.length));
  if (configs.length > 0) {
    const stats = await Promise.all(
      configs.map(async config => ({
        name: Object.keys(config.entry)[0],
        stats: await webpackBuild(config)
      }))
    );
    return build(webpackConfigs, statsList.concat(stats));
  } else {
    return statsList;
  }
}

async function getWebpackConfig(runtimeDir, entryName, nuxt, config, options) {
  const buildDir = path.normalize(path.join(getBuildDir(nuxt), entryName));

  const { VueLoaderPlugin } = await import('vue-loader');

  let rules = clone(config.module.rules);
  rules = setLoaderRulesForCustomElement(rules);

  const plugins = [
    new VueLoaderPlugin(),
    webpackVueCESubStyle(),
    ...(await createHtmlWebpackPlugins(
      runtimeDir,
      options.entries.filter(({ name }) => entryName === kebabCase(name)),
      options.publicPath
    )),
    ...(await getBundleAnalyzerPlugin(options, config, entryName))
  ];

  const output = getDefaultWebpackOutputOptions();

  const { filename, chunkFilename } = output;
  const webpackExtend =
    options.entries.find(({ name }) => kebabCase(name) === entryName)
      .webpackExtend || (config => config);
  return await webpackExtend(
    Object.assign({}, config, {
      target: 'web',
      entry: prepareEntries(config, options),
      output: Object.assign(output, {
        filename: resolveFilename(filename, config, options),
        chunkFilename: resolveFilename(chunkFilename, config, options),
        path: buildDir,
        chunkLoadingGlobal: getChunkLoadingGlobalName(entryName)
      }),
      optimization: {
        runtimeChunk: false
      },
      plugins,
      module: {
        ...config.module,
        rules
      }
    }),
    { client: true }
  );
}

function getChunkLoadingGlobalName(entryName) {
  return 'webpackChunkLoadingGlobalNuxtCustomElements' + pascalCase(entryName);
}

function resolveFilename(filename, config, options) {
  if (typeof filename === 'function') {
    return filename(config, options);
  }
  return filename;
}

function prepareEntries(config, options) {
  return Object.fromEntries(
    Object.keys(options.entry).map(key => {
      const files = config.entry.app.map(file => {
        if (file.endsWith('/entry')) {
          return options.entry[String(key)].client;
        }
        return file;
      });
      return [key, files];
    })
  );
}

async function getBundleAnalyzerPlugin(options, config, entryName) {
  const { BundleAnalyzerPlugin } = await import('webpack-bundle-analyzer');
  // BundleAnalyzerPlugin
  if (options.analyzer) {
    const analyzerOptions = Object.assign(
      {
        reportFilename: path.resolve(
          `.reports/webpack/${MODULE_NAME}/${entryName}/${config.name}.html`
        ),
        statsFilename: path.resolve(
          `.reports/webpack/${MODULE_NAME}/${entryName}/stats/${config.name}.json`
        ),
        analyzerMode: 'static',
        generateStatsFile: true,
        openAnalyzer: false,
        logLevel: 'info',
        defaultSizes: 'gzip',
        statsOptions: 'normal'
      },
      options.analyze
    );
    return [new BundleAnalyzerPlugin(analyzerOptions)];
  }
  return [];
}

async function createHtmlWebpackPlugin(
  runtimeDir,
  chunks,
  publicPath,
  filename,
  tags
) {
  const HtmlWebpackPlugin = await import('html-webpack-plugin').then(
    module => module.default
  );
  filename = filename + '.html';
  return new HtmlWebpackPlugin({
    title: chunks.join(' - '),
    chunks: 'all',
    template: path.resolve(runtimeDir, '../runtime/tmpl/webpack', 'index.html'),
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

async function createHtmlWebpackPlugins(runtimeDir, entries, publicPath) {
  return [
    await createHtmlWebpackPlugin(
      runtimeDir,
      entries.map(entry => entry.name),
      publicPath,
      'index',
      entries.reduce((result, entry) => {
        result.push(...getTagHTMLFromEntry(entry));
        return result;
      }, [])
    )
  ];
}

function setLoaderRulesForCustomElement(rules) {
  const vueLoaderRule = rules.find(({ test }) => test.test('.vue'));

  if (vueLoaderRule) {
    vueLoaderRule.use[0].options.customElement = true;
  } else {
    throw new Error("Can't find `vue-loader`…");
  }

  return rules;
}

export { build, getWebpackConfig };
export function prepareEntryConfigs(runtimeDir, webpackConfig, nuxt, options) {
  return Promise.all(
    Object.keys(options.entry).map(entryName => {
      return getWebpackConfig(
        runtimeDir,
        entryName,
        nuxt,
        webpackConfig,
        Object.assign({}, options, {
          entry: { [entryName]: options.entry[String(entryName)] }
        })
      );
    })
  );
}
