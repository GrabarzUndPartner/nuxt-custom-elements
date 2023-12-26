import { resolve, join } from 'pathe';
import {
  createResolver,
  defineNuxtModule,
  addTemplate,
  addImports,
  logger
} from '@nuxt/kit';
import {
  generateEntries,
  getDefaultOptions,
  getEntriesDir,
  getModuleDir,
  onClose
} from './utils/index.js';
import WebpackBuilder from './builder/Webpack.js';
import ViteBuilder from './builder/Vite.js';
import entriesTemplate from './tmpl/entries.tmpl.js';

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
      logger.log(`Current builder \`${nuxt.options.builder}\` is invalid.`);
      return;
    }

    // create entry templates
    const entries = generateEntries(nuxt, moduleOptions);
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

    addTemplate({
      getContents: () =>
        entriesTemplate({
          entries: moduleOptions.entries
        }),
      filename: join(getModuleDir(nuxt), 'entries.js'),
      write: true
    });

    addImports({
      name: 'useCustomElements',
      as: 'useCustomElements',
      from: resolve(runtimeDir, 'composables/useCustomElements.js')
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
