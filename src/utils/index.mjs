import fs from 'fs';
import path from 'pathe';
import { kebabCase } from 'change-case';
import { useLogger } from '@nuxt/kit';

export const MODULE_NAME = 'nuxt-custom-elements';
export const logger = useLogger(MODULE_NAME);

const BUILD_DIR = 'dist';
const ENTRIES_DIR = 'entries';

export function getModuleDir(nuxt) {
  return path.resolve(nuxt.options.buildDir, MODULE_NAME);
}
export function getEntriesDir(nuxt) {
  return path.resolve(getModuleDir(nuxt), ENTRIES_DIR);
}
export function getBuildDir(nuxt) {
  return path.resolve(getModuleDir(nuxt), BUILD_DIR);
}
export function getDistDir(nuxt) {
  return path.resolve(nuxt._nitro.options.output.publicDir, MODULE_NAME);
}

export const getDefaultOptions = () => {
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
function prepareEntry(entry) {
  const tags = entry.tags.map(tag => {
    return Object.assign(tag, {
      name: kebabCase(tag.name),
      options: tag.options,
      async: tag.async || false
    });
  });
  return {
    ...entry,
    name: kebabCase(entry.name),
    tags
  };
}

/**
 * Create prepared entry list.
 * @param {Object} nuxt Nuxt
 * @param {Object} options Module-Options
 */
export function generateEntries(runtimeDir, nuxt, moduleOptions) {
  return moduleOptions.entries.map(entry => {
    entry = prepareEntry(entry);
    return {
      name: entry.name,
      template: Object.fromEntries(
        ['client'].map(type => {
          return [
            type,
            {
              src: path.resolve(runtimeDir, 'tmpl', 'entry.mjs'),
              options: {
                tags: entry.tags,
                // TODO: Hier muss auhc noch ist der dann auch für vite?
                webpackExtend: entry.webpackExtend
              },
              fileName: path.resolve(
                getEntriesDir(nuxt),
                `${entry.name}.${type}.mjs`
              )
            }
          ];
        })
      )
    };
  });
}

async function copyBuild(from, to) {
  try {
    await fs.promises.rm(to, { recursive: true, force: true });
  } catch (error) {
    // directory not found
  }
  try {
    await fs.promises.cp(from, to, { recursive: true });
    logger.info(`Entries output directory: \`${to}\``);
    logger.success('Generated entries!');
  } catch (error) {
    logger.warn('Generated entries `dist` is missing!');
  }
}

export async function onClose(nuxt, options) {
  const buildDir = getBuildDir(nuxt);
  let distPath = getDistDir(nuxt);

  // Clean destination folder
  if (options.buildDir) {
    distPath = options.buildDir;
  }

  await copyBuild(buildDir, distPath);
}

function DEFAULT_FILENAME_FUNC(webpackConfig, moduleOptions) {
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

function DEFAULT_CHUNK_FILENAME_FUNC(webpackConfig, moduleOptions) {
  if (moduleOptions.modern) {
    return '[name].[hash].js';
  } else {
    return '[name].js';
  }
}
export function getDefaultWebpackOutputOptions() {
  return {
    filename: DEFAULT_FILENAME_FUNC,
    chunkFilename: DEFAULT_CHUNK_FILENAME_FUNC,
    publicPath: './'
  };
}
