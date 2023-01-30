import { resolve } from 'path';
import {
  defineNuxtModule,
  addPluginTemplate,
  addTemplate,
  isNuxt3
} from '@nuxt/kit';
import { build, prepareConfigs } from './utils/webpack.mjs';
import { generateEntries, getDefaultOptions, getEntriesDir, getEntryNamingMap, onBuildDone, onGeneratedDone } from './utils/index.mjs';

export default defineNuxtModule({
  meta: {
    name: 'nuxt-custom-elements',
    configKey: 'customElements',
    compatibility: {
      nuxt: '^3.0.x'
    }
  },
  defaults: getDefaultOptions(),

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
      src: resolve(__dirname, 'runtime', 'plugin.tmpl.mjs'),
      fileName: 'nuxt-custom-elements-plugin.mjs',
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

    if (isNuxt3() && nuxt.options.target !== 'static') {
      // TODO: alternative for the `generate:done` hook?
      nuxt.hook('close', () => {
        debugger;
        return onGeneratedDone(nuxt, moduleOptions);
      });
    } else {
      nuxt.hook('generate:done', () => onGeneratedDone(nuxt, moduleOptions));
    }
  }
}
