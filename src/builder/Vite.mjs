import fs from 'fs';
import { resolve } from 'pathe';
import template from 'lodash.template';
import { getTagHTMLFromEntry } from '../utils/tags.mjs';
import { build, prepareEntryConfigs } from '../utils/vite.mjs';
import { getBuildDir } from '../utils/index.mjs';
import Builder from './Builder.mjs';

export default class ViteBuilder extends Builder {
  constructor (...args) {
    super(...args);

    if (this.nuxt.options.dev) {
      return;
    }

    this.config = [];
    this.nuxt.hook('vite:extendConfig', (config) => {
      if (!('ssr' in config)) {
        return (this.config = config);
      }
    });
  }

  async build () {
    const configs = await prepareEntryConfigs(this.config, this.nuxt, this.moduleOptions);
    const builds = await build(this, configs);

    await Promise.all(builds.map(async ({ name, entry, stats }) => {
      const { fileName } = stats.output.find(({ isEntry }) => isEntry);
      const html = await fs.promises.readFile(resolve(this.runtimeDir, 'tmpl/vite/index.html'), { encoding: 'utf-8' });
      const compiled = template(html);
      const filepath = resolve(getBuildDir(this.nuxt), name, 'index.html');
      const options = {
        title: entry.name,
        tags: getTagHTMLFromEntry(entry),
        entry: fileName
      };
      await fs.promises.writeFile(filepath, compiled({ options }), {
        encoding: 'utf-8'
      });
    }));
  }
}