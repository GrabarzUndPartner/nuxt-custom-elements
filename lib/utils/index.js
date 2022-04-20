const path = require('upath');
const { defu } = require('defu');
const fsExtra = require('fs-extra');
const { paramCase, pascalCase } = require('change-case');
const consola = require('consola');

const MODULE_NAME = 'nuxt-custom-elements';

const BUILD_DIR = 'dist';
const ENTRIES_DIR = 'entries';

function getEntriesDir (nuxt) {
  return path.toUnix(path.resolve(nuxt.options.buildDir, MODULE_NAME, ENTRIES_DIR));
}
function getBuildDir (nuxt) {
  return path.toUnix(path.resolve(nuxt.options.buildDir, MODULE_NAME, BUILD_DIR));
}
function getDistDir (nuxt) {
  return path.toUnix(path.resolve(nuxt.options.generate.dir, MODULE_NAME));
}

function optionsMigration (options) {
  const webpack = options.webpack || { output: {} };

  if ('staticPath' in options) {
    consola.error('nuxt-custom-elements:', 'Option staticPath was removed. Use imports or other copy processes.');
  }

  if (options.entries.find(entry => entry.tags.find(tag => 'shadow' in (tag.options || {})))) {
    consola.error('nuxt-custom-elements:', 'Tag Option `shadow` was removed. Use entry options `shadow`. Learn more: `https://nuxt-custom-elements.grabarzundpartner.dev/options/#entry`');
  }

  if ('webpack' in options) {
    throw new Error('[nuxt-custom-elements]: `webpack` option is deprecated, use `webpackExtend` from entry options. \n\nFor `webpack.publicPathInject` look here `https://nuxt-custom-elements.grabarzundpartner.dev/usage#webpack-public-path` \nLearn more: `https://nuxt-custom-elements.grabarzundpartner.dev/options#webpackextend`');
  }

  // webpackOutput
  if ('webpackOutput' in options) {
    consola.warn(`${MODULE_NAME}: option "webpackOutput" is deprecated, use "webpack.output"`);
    webpack.output = options.webpackOutput;
    delete options.webpackOutput;
  }

  if ('publicPath' in options) {
    consola.warn(`${MODULE_NAME}: option "publicPath" is deprecated, use "webpack.output.publicPath"`);
    webpack.output = Object.assign({
      publicPath: options.publicPath
    }, (options.output || {}));
    delete options.publicPath;
  }

  // webpackPublicPathInject
  if ('webpackPublicPathInject' in options) {
    consola.warn(`${MODULE_NAME}: option "webpackPublicPathInject" is deprecated, use "webpack.publicPathInject"`);
    webpack.publicPathInject = options.webpackPublicPathInject;
    delete options.webpackPublicPathInject;
  }

  return options;
}

function getOptions (options) {
  optionsMigration(options);

  return defu(options, {
    name: MODULE_NAME,
    buildDir: null,
    analyzer: false,
    modern: undefined,
    polyfill: true,
    modernPolyfill: false,
    entries: []
  });
}

/**
 * Prepare entry and its tags.
 * @param {Object} entry Endpoint-Entry
 * @param {Object} options Module-Options
 */
function prepareEntry (entry, options) {
  const tags = entry.tags.map((tag) => {
    return Object.assign(tag, {
      name: paramCase(tag.name),
      options: tag.options,
      async: tag.async || false
    });
  });
  return Object.assign(entry, {
    name: paramCase(entry.name),
    tags
  });
}

/**
 * Create prepared entry list.
 * @param {Object} nuxt Nuxt
 * @param {Object} options Module-Options
 */
function generateEntries (nuxt, moduleOptions) {
  return moduleOptions.entries.map((entry) => {
    entry = prepareEntry(entry, moduleOptions);
    return {
      name: entry.name,
      template: Object.fromEntries(['client', 'modern'].map((type) => {
        return [type, {
          src: path.resolve(__dirname, '../tmpl', 'entry.js'),
          options: {
            tags: entry.tags,
            shadow: entry.shadow || false,
            modern: type === 'modern',
            polyfill: moduleOptions.polyfill,
            modernPolyfill: moduleOptions.modernPolyfill,
            webpackExtend: entry.webpackExtend
          },
          fileName: path.resolve(getEntriesDir(nuxt), `${entry.name}.${type}.js`)
        }];
      }))
    };
  });
}

async function copyBuild (from, to) {
  await fsExtra.remove(to);
  await fsExtra.copy(from, to);
  consola.info(`Custom-Elements output directory: ${to}`);
  consola.success('Generated Custom-Elements!');
}

async function onBuildDone (nuxt, options) {
  if (options.buildDir) {
    await copyBuild(getBuildDir(nuxt), options.buildDir);
  }
}

async function onGeneratedDone (nuxt, options) {
  const buildDir = getBuildDir(nuxt);
  let distPath = getDistDir(nuxt);

  // Clean destination folder
  if (options.buildDir) {
    distPath = options.buildDir;
  }

  await copyBuild(buildDir, distPath);
}

function getEntryNamingMap (options) {
  return options.entries.reduce((result, { name }) => {
    result[String(pascalCase(name))] = paramCase(name);
    result[String(paramCase(name))] = paramCase(name);
    return result;
  }, {});
}

function DEFAULT_FILENAME_FUNC (webpackConfig, moduleOptions) {
  if (moduleOptions.modern) {
    if (webpackConfig.name === 'modern') {
      return '[name].modern.js';
    } else {
      return '[name].client.js';
    }
  } else {
    return '[name].js';
  }
}

function DEFAULT_CHUNK_FILENAME_FUNC (webpackConfig, moduleOptions) {
  if (moduleOptions.modern) {
    return '[name].[hash].js';
  } else {
    return '[name].js';
  }
}
function getDefaultWebpackOutputOptions () {
  return {
    filename: DEFAULT_FILENAME_FUNC,
    chunkFilename: DEFAULT_CHUNK_FILENAME_FUNC,
    publicPath: './'
  };
}

module.exports = {
  MODULE_NAME,
  getEntriesDir,
  getBuildDir,
  getDistDir,
  getOptions,
  generateEntries,
  onBuildDone,
  onGeneratedDone,
  getEntryNamingMap,
  getDefaultWebpackOutputOptions
};
