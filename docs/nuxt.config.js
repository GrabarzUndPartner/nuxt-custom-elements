import { withDocus } from 'docus';
import nuxtCustomElementsPkg from '../package.json';

export default withDocus({
  docus: {
    colors: {
      primary: '#51bbaf',
      code: '#51bbaf'
    }
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
  },

  router: {
    base: getBasePath()
  }
});

function getBasePath () {
  return process.env.npm_config_base || process.env.BASE_PATH || '/';
}

function getDistPath () {
  return process.env.npm_config_dist || process.env.DIST_PATH || 'dist';
}

function getPort () {
  return process.env.npm_config_port || process.env.PORT || 3000;
}
