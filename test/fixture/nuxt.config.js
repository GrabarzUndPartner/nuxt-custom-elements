const { resolve } = require('upath')

const repository = require('../../package.json').repository

module.exports = {

  mode: 'spa',
  modern: 'client',

  rootDir: resolve(__dirname, '..'),
  srcDir: resolve(__dirname, '../../example'),

  render: {
    resourceHints: false
  },

  env: {
    GITHUB_REPO_URL: `https://github.com/${repository}`
  },

  build: {

    babel: {
      presets ({ isServer, isModern }) {
        const targets = isServer ? { node: 'current' } : { ie: 11 }
        return [
          [
            require.resolve('@nuxt/babel-preset-app-edge'), {
              targets,
              useBuiltIns: isModern ? 'entry' : 'usage',
              corejs: { version: 3 }
            }
          ]
        ]
      }
    },

    postcss: {
      plugins: {
        'postcss-nesting': {}
      }
    }

  }
}
