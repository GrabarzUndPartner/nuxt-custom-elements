import theme from '@nuxt/content-theme-docs';
import nuxtCustomElementsPkg from '../package.json';

export default theme({
  docs: {
    primaryColor: '#51bbaf',
    codeColor: '#51bbaf'
  },

  pwa: {
    manifest: {
      name: nuxtCustomElementsPkg.name,
      description: nuxtCustomElementsPkg.description,
      short_name: nuxtCustomElementsPkg.name
    },
    meta: {
      name: nuxtCustomElementsPkg.name,
      description: nuxtCustomElementsPkg.description,
      theme_color: '#51bbaf'
    }
  },

  server: {
    port: getPort()
  },

  content: {
    liveEdit: false
  },

  generate: {
    dir: getDistPath()
  }
});

function getDistPath() {
  return process.env.npm_config_dist || process.env.DIST_PATH || 'dist';
}

function getPort() {
  return process.env.npm_config_port || process.env.PORT || 3000;
}
