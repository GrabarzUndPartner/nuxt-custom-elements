import fs from 'fs';
import path from 'pathe';
import { paramCase, pascalCase } from 'change-case';
import consola from 'consola';

const MODULE_NAME = 'nuxt-custom-elements';
const logger = consola.withTag(MODULE_NAME);

const BUILD_DIR = 'dist';
const ENTRIES_DIR = 'entries';

function getEntriesDir (nuxt) {
  return path.resolve(nuxt.options.buildDir, MODULE_NAME, ENTRIES_DIR);
}
function getBuildDir (nuxt) {
  return path.resolve(nuxt.options.buildDir, MODULE_NAME, BUILD_DIR);
}
function getDistDir (nuxt) {
  return path.resolve(nuxt._nitro.options.output.publicDir, MODULE_NAME);
}

const getDefaultOptions = () => {
  return {
    name: MODULE_NAME,
    buildDir: null,
    analyzer: false,
    entries: []
  };
};

/**
 * Prepare entry and its tags.
 * @param {Object} entry Endpoint-Entry
 */
function prepareEntry (entry) {
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
function generateEntries (runtimeDir, nuxt, moduleOptions) {
  return moduleOptions.entries.map((entry) => {
    entry = prepareEntry(entry);
    return {
      name: entry.name,
      template: Object.fromEntries(['client'].map((type) => {
        return [type, {
          src: path.resolve(runtimeDir, 'tmpl/webpack', 'entry.mjs'),
          options: {
            tags: entry.tags,
            webpackExtend: entry.webpackExtend
          },
          fileName: path.resolve(getEntriesDir(nuxt), `${entry.name}.${type}.mjs`)
        }];
      }))
    };
  });
}

async function copyBuild (from, to) {
  try {
    await fs.promises.rm(to, { recursive: true, force: true });
  } catch (error) {
    // directory not found
  }
  try {
    await fs.promises.cp(from, to, { recursive: true });
    logger.info(`Entries output directory: ${to}`);
    logger.success('Generated entries!');
  } catch (error) {
    logger.warn('Generated entries `dist` is missing!');
  }
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export {
  MODULE_NAME,
  getEntriesDir,
  getBuildDir,
  getDistDir,
  getDefaultOptions,
  generateEntries,
  onBuildDone,
  onGeneratedDone,
  getEntryNamingMap,
  getDefaultWebpackOutputOptions
};
