import { resolve } from 'pathe';
import {
  createResolver,
  defineNuxtModule,
  addPluginTemplate,
  addTemplate,
  logger
} from '@nuxt/kit';
import {
  generateEntries,
  getDefaultOptions,
  getEntriesDir,
  getEntryNamingMap,
  onClose
} from './utils/index.mjs';
import WebpackBuilder from './builder/Webpack.mjs';
import ViteBuilder from './builder/Vite.mjs';

const validBuilders = {
  '@nuxt/webpack-builder': WebpackBuilder,
  '@nuxt/vite-builder': ViteBuilder
};

export default defineNuxtModule({
  meta: {
    name: 'nuxt-custom-elements',
    configKey: 'customElements',
    compatibility: {
      nuxt: '^3.0.x'
    }
  },
  defaults: getDefaultOptions(),

  setup(moduleOptions, nuxt) {
    const resolver = createResolver(import.meta.url);

    const runtimeDir = resolver.resolve('./runtime');
    nuxt.options.alias['#customElements'] = runtimeDir;
    nuxt.options.alias['#customElementsEntries'] = getEntriesDir(nuxt);
    nuxt.options.build.transpile.push(runtimeDir);

    let builder;
    if (validBuilders[nuxt.options.builder]) {
      builder = new validBuilders[nuxt.options.builder](
        nuxt,
        moduleOptions,
        runtimeDir
      );
    } else {
      logger.log(
        `Current builder \`${nuxt.options.builder}\` is incomaptible.`
      );
      return;
    }

    // create entry templates
    const entries = generateEntries(runtimeDir, nuxt, moduleOptions);
    moduleOptions.entry = entries.reduce((result, { name, template }) => {
      Object.keys(template).forEach(type => {
        const { dst } = addTemplate({
          ...template[String(type)],
          write: true
        });
        (result[String(name)] || (result[String(name)] = {}))[String(type)] =
          dst;
      });
      return result;
    }, {});

    addPluginTemplate({
      src: resolve(runtimeDir, 'tmpl', 'plugin.mjs'),
      fileName: 'nuxt-custom-elements-plugin.mjs',
      write: true,
      options: Object.assign(
        {
          entriesDir: getEntriesDir(nuxt),
          entryMap: getEntryNamingMap(moduleOptions)
        },
        moduleOptions
      )
    });

    if (!nuxt.options.dev) {
      registerHooks(nuxt, moduleOptions, builder);
    }
  }
});

function registerHooks(nuxt, moduleOptions, builder) {
  nuxt.hook('build:done', async () => {
    await builder.build();
  });

  nuxt.hook('close', () => {
    return onClose(nuxt, moduleOptions);
  });
}
