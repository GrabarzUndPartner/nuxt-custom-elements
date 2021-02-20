const path = require('upath');
const defu = require('defu');
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
function getOptions (options) {
  const webpackOutputOptions = getDefaultWebpackOutputOptions();

  if ('publicPath' in options) {
    consola.warn(`${MODULE_NAME}: option "publicPath" is deprecated, use "webpackOuput.publicPath"`);
    options.webpackOutput = Object.assign({
      publicPath: options.publicPath
    }, (options.webpackOutput || {}));
    delete options.publicPath;
  }

  return defu(options, {
    webpackOutput: Object.assign(webpackOutputOptions, options.webpackOutput)
  }, {
    buildDir: null,
    name: MODULE_NAME,
    analyzer: false,
    modern: undefined,
    modernPolyfill: false,
    entries: [],
    shadow: false,
    webpackPublicPathInject: undefined
  });
}

/**
 * Prepare entry and its tags.
 * @param {Object} entry Endpoint-Entry
 * @param {Object} options Module-Options
 */
function prepareEntry (entry, options) {
  const tags = entry.tags.map((tag) => {
    const tagOptions = Object.assign({ shadow: Boolean(options.shadow) }, tag.options);
    return Object.assign(tag, {
      name: paramCase(tag.name),
      options: tagOptions,
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
        if (typeof moduleOptions.webpackPublicPathInject === 'function') {
          webpackPublicPathInject = moduleOptions.webpackPublicPathInject.toString();
        }
        return [type, {
          src: path.resolve(__dirname, '../tmpl', 'entry.js'),
          options: {
            tags: entry.tags,
            modern: type === 'modern',
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
