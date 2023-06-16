import { join, normalize } from 'pathe';
import { build as viteBuild, defineConfig } from 'vite';
import { paramCase } from 'change-case';
import vuePlugin from '@vitejs/plugin-vue';
import clone from 'clone';
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

  config = clone(config);

  config.base = '/';

  config.build = {
    ...config.build,
    target: 'esnext',
    outDir: buildDir,
    rollupOptions: {
      ...config.rollupOptions,
      input: entry
    }
  };

  config.vue.customElement = true;
  // Replace vue plugin for property customElement
  config.plugins[
    config.plugins.indexOf(
      config.plugins.find(({ name }) => name === 'vite:vue')
    )
  ] = vuePlugin(config.vue);

  config.entry = entry;

  return defineConfig(config);
}

export function prepareEntryConfigs(viteConfig, nuxt, options) {
  return Promise.all(
    Object.keys(options.entry).map(entryName => {
      return {
        name: entryName,
        entry: options.entries.find(
          ({ name }) => entryName === paramCase(name)
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
