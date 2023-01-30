import { resolve } from 'path';
import {
  defineNuxtModule,
  addPluginTemplate,
  addTemplate
} from '@nuxt/kit';
import { build, prepareConfigs } from './utils/webpack.mjs';
import { generateEntries, getDefaultOptions, getEntriesDir, getEntryNamingMap, onBuildDone, onGeneratedDone } from './utils/index.mjs';

export default defineNuxtModule({
  meta: {
    name: 'nuxt-custom-elements',
    configKey: 'customElements',
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.x'
    }
  },
  // Default configuration options for your module
  defaults: getDefaultOptions(),
  hooks: {},
  setup (moduleOptions, nuxt) {
    const entries = generateEntries(nuxt, moduleOptions);
    moduleOptions.entry = entries.reduce((result, { name, template }) => {
      Object.keys(template).forEach((type) => {
        const { dst } = addTemplate({
          ...template[String(type)],
          write: true
        });
        (result[String(name)] || (result[String(name)] = {}))[String(type)] = dst;
      });
      return result;
    }, {});

    addPluginTemplate({
      src: resolve(__dirname, 'runtime', 'plugin.tmpl.js'),
      fileName: 'nuxt-custom-elements-plugin.js',
      write: true,
      options: Object.assign({
        entriesDir: getEntriesDir(nuxt),
        entryMap: getEntryNamingMap(moduleOptions)
      }, moduleOptions)
    });

    registerHooks(nuxt, moduleOptions);
  }
});

function registerHooks (nuxt, moduleOptions) {
  if (!nuxt.options.dev) {
    let webpackConfigs = [];
    nuxt.hook('webpack:config', (configs) => {
      return (webpackConfigs = configs);
    });

    nuxt.hook('build:done', async () => {
      const configs = await prepareConfigs(webpackConfigs, nuxt, moduleOptions);

      await build(configs, nuxt);
      if (nuxt.options.target !== 'static') {
        await onBuildDone(nuxt, moduleOptions);
      }
    });
    nuxt.hook('generate:done', () => onGeneratedDone(nuxt, moduleOptions));
  }
}
