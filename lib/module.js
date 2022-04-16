const { resolve } = require('path');
const consola = require('consola');
const { getOptions, getEntriesDir, getEntryNamingMap, generateEntries, MODULE_NAME, onBuildDone, onGeneratedDone } = require('./utils');
const { build, getBuilderWebpackConfigs, prepareConfigs } = require('./utils/webpack');

let pkg;
try {
  pkg = require('./package.json');
} catch (error) {
  pkg = require('../package.json');
}

function deprecatedWarning (options) {
  if ('staticPath' in options) {
    consola.error('nuxt-custom-elements:', 'Option staticPath was removed. Use imports or other copy processes.');
  }
  if (options.entries.find(entry => entry.tags.find(tag => 'shadow' in (tag.options || {})))) {
    consola.error('nuxt-custom-elements:', 'Tag Option `shadow` was removed. Use entry options `shadow`. Learn more: https://nuxt-custom-elements.grabarzundpartner.dev/options/#entry');
  }
}

module.exports = function (moduleOptions) {
  const options = getOptions({
    name: MODULE_NAME,
    ...this.options.customElements,
    ...moduleOptions
  });

  deprecatedWarning(options);

  const nuxt = this.nuxt;

  if (options.modern === undefined) {
    options.modern = nuxt.options.modern === 'client';
  } else if (options.modern && nuxt.options.modern !== 'client') {
    consola.warn('nuxt-custom-elements:', 'Can\'t using modern, activate modern build in nuxt');
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-custom-elements-plugin.js',
    options: Object.assign({
      entriesDir: getEntriesDir(nuxt),
      entryMap: getEntryNamingMap(options)
    }, options)
  });

  registerHooks(nuxt, options);
};

function registerHooks (nuxt, moduleOptions) {
  nuxt.hook('build:before', () => {
    const entries = generateEntries(nuxt, moduleOptions);
    moduleOptions.entry = entries.reduce((result, { name, template }) => {
      Object.keys(template).forEach((type) => {
        const { dst } = nuxt.moduleContainer.addTemplate(template[String(type)]);
        (result[String(name)] || (result[String(name)] = {}))[String(type)] = dst;
      });
      return result;
    }, {});
  });

  if (!nuxt.options.dev) {
    let webpackConfigs = [];
    nuxt.hook('webpack:config', configs => (webpackConfigs = configs));

    nuxt.hook('build:done', async (builder) => {
      const builderConfigs = await getBuilderWebpackConfigs(builder);
      const configs = prepareConfigs(builderConfigs, webpackConfigs, nuxt, moduleOptions);
      await build(configs, nuxt);
      if (nuxt.options.target !== 'static') {
        await onBuildDone(nuxt, moduleOptions);
      }
    });
    nuxt.hook('generate:done', () => onGeneratedDone(nuxt, moduleOptions));
  }
}

module.exports.meta = pkg;
