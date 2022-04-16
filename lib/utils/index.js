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
    webpack: {
      output: Object.assign(getDefaultWebpackOutputOptions(), options.webpackOutput),
      publicPathInject: undefined,
      optimization: undefined,
      plugins: []
    }
  }, {
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
        let webpackPublicPathInject;
        if (typeof moduleOptions.webpack.publicPathInject === 'function') {
          webpackPublicPathInject = moduleOptions.webpack.publicPathInject.toString();
        }
        return [type, {
          src: path.resolve(__dirname, '../tmpl', 'entry.js'),
          options: {
            tags: entry.tags,
            shadow: entry.shadow || false,
            modern: type === 'modern',
            polyfill: moduleOptions.polyfill,
            modernPolyfill: moduleOptions.modernPolyfill,
            webpackPublicPathInject
          },
          fileName: path.resolve(getEntriesDir(nuxt), `${entry.name}.${type}.js`)
        }];
      }))
    };
  });
}

async function onBuildDone (nuxt, options) {
  if (options.buildDir) {
    await fsExtra.copy(getBuildDir(nuxt), options.buildDir);
    consola.info(`Custom-Elements output directory: ${options.buildDir}`);
    consola.success('Generated Custom-Elements!');
  }
}

async function onGeneratedDone (nuxt, options) {
  const buildDir = getBuildDir(nuxt);
  let distPath = getDistDir(nuxt);

  // Clean destination folder
  if (options.buildDir) {
    distPath = options.buildDir;
  }

  await fsExtra.remove(distPath);
  await fsExtra.copy(buildDir, distPath);
  consola.info(`Custom-Elements output directory: ${distPath}`);
  consola.success('Generated Custom-Elements');
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
