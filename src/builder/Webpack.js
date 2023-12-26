import { build, prepareEntryConfigs } from '../utils/webpack.js';
import Builder from './Builder.js';

export default class WebpackBuilder extends Builder {
  constructor(...args) {
    super(...args);

    if (this.nuxt.options.dev) {
      return;
    }

    this.config = null;
    this.nuxt.hook('webpack:config', configs => {
      return (this.config = configs.find(({ name }) => name === 'client'));
    });
  }

  async build() {
    const configs = await prepareEntryConfigs(
      this.runtimeDir,
      this.config,
      this.nuxt,
      this.moduleOptions
    );
    return build(configs.flat());
  }
}
