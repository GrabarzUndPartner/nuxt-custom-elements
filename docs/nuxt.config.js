import { withDocus } from 'docus';
import nuxtCustomElementsPkg from '../package.json';

export default withDocus({

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

function getDistPath () {
  return process.env.npm_config_dist || process.env.DIST_PATH || 'dist';
}

function getPort () {
  return process.env.npm_config_port || process.env.PORT || 3000;
}
