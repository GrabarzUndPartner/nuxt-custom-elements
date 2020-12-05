const { resolve } = require('upath')
const repository = require('../package.json').repository
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

module.exports = {
  dev: isDev,

  ssr: false,
  modern: isDev ? false : 'client',

  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,

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

  },

  components: ['~/components/auto-import/'],

  generate: {
    dir: getDistPath()
  },

  router: {
    base: getBasePath()
  },

  modules: [
    [
      resolve(__dirname, '..'), {
        analyzer: !isTest,
        modern: true,
        modernPolyfill: true,
        webpackOutput: {
          publicPath: getPublicPath()
        },
        entries: [
          {
            name: 'ComponentAppShadow',
            tags: [
              {
                async: false,
                name: 'CustomElementAppShadowA',
                path: '@/components/apps/AppShadow',
                options: {
                  shadow: true,
                  props: {
                    title: 'Shadow Element with vue-loader import, without css compiler.'
                  }
                }
              },
              {
                async: false,
                name: 'CustomElementAppShadowB',
                path: '@/components/apps/AppShadow',
                options: {
                  shadow: true,
                  shadowCss: '.shadow-element { display: flex; align-items: center; justify-content: center; color: white; background: blue;}.shadow-element span { font-weight: bold;}.shadow-element::before { display: block; padding-top: calc(9 / 16 * 100%); content: "";}',
                  props: {
                    title: 'Shadow Element with shadowCss option'
                  }
                }
              }
            ]
          },
          {
            name: 'ComponentAppAbstract',
            tags: [
              {
                async: false,
                name: 'CustomElementAppAbstract',
                path: '@/components/apps/AppAbstract',
                options: {
                  props: {
                    base: './'
                  }
                }
              }
            ]
          },
          {
            name: 'ComponentAppHash',
            tags: [
              {
                async: false,
                name: 'CustomElementAppHash',
                path: '@/components/apps/AppHash',
                options: {
                  props: {
                    base: './'
                  }
                }
              }
            ]
          },
          {
            name: 'ComponentAppHistory',
            tags: [
              {
                async: false,
                name: 'CustomElementAppHistory',
                path: '@/components/apps/AppHistory',
                options: {
                  props: {
                    base: './'
                  }
                }
              }
            ]
          },
          {
            name: 'ComponentAppBundle',
            tags: [
              {
                async: true,
                name: 'CustomElementAppAbstract',
                path: '@/components/apps/AppAbstract',
                options: {
                  props: {
                    base: './'
                  }
                }
              },
              {
                async: true,
                name: 'CustomElementAppHash',
                path: '@/components/apps/AppHash',
                options: {
                  props: {
                    base: './'
                  }
                }
              },
              {
                async: true,
                name: 'CustomElementAppHistory',
                path: '@/components/apps/AppHistory',
                options: {
                  props: {
                    base: './'
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  ]
}

function getBasePath () {
  return process.env.npm_config_base || process.env.BASE_PATH || '/'
}

function getPublicPath () {
  return process.env.npm_config_base || process.env.PUBLIC_PATH || './'
}

function getDistPath () {
  return process.env.npm_config_dist || process.env.DIST_PATH || 'dist'
}
