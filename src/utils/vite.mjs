import { join, normalize } from 'pathe';
import { build as viteBuild, defineConfig } from 'vite';
import { kebabCase } from 'change-case';
import vuePlugin from '@vitejs/plugin-vue';
import clone from 'clone';
import { viteVueCESubStyle } from '@unplugin-vue-ce/sub-style';
import { getBuildDir } from './index.mjs';

export async function build(builder, entryConfigs, statsList = []) {
  const configs = entryConfigs.splice(0, Math.min(1, entryConfigs.length));
  if (configs.length > 0) {
    const stats = await Promise.all(
      configs.map(async ({ name, entry, config }) => ({
        name,
        stats: await viteBuild(config),
        entry
      }))
    );
    return build(builder, entryConfigs, statsList.concat(stats));
  } else {
    return statsList;
  }
}

function getViteConfig(entryName, nuxt, config, options) {
  const buildDir = normalize(join(getBuildDir(nuxt), entryName));
  const entry = options.entry[String(entryName)].client;

  const viteExtend =
    options.entries.find(({ name }) => kebabCase(name) === entryName)
      .viteExtend || (config => config);

  config = clone(config);

  config.base = '/';
  config.entry = entry;

  // Build

  config.build = {
    ...config.build,
    target: 'esnext',
    outDir: buildDir,
    rollupOptions: {
      ...config.rollupOptions,
      input: entry
    }
  };

  // Plugins

  config.plugins = [
    vuePlugin({
      reactivityTransform: false,
      isProduction: true,
      customElement: true
    }),
    viteVueCESubStyle()
  ];

  return defineConfig(viteExtend(config));
}

export function prepareEntryConfigs(viteConfig, nuxt, options) {
  return Promise.all(
    Object.keys(options.entry).map(entryName => {
      return {
        name: entryName,
        entry: options.entries.find(
          ({ name }) => entryName === kebabCase(name)
        ),
        config: getViteConfig(
          entryName,
          nuxt,
          viteConfig,
          Object.assign({}, options, {
            entry: { [entryName]: options.entry[String(entryName)] }
          })
        )
      };
    })
  );
}
