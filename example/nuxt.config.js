const { resolve } = require('upath')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  dev: isDev,

  mode: 'spa',
  modern: 'client',

  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,

  render: {
    resourceHints: false
  },

  build: {
    postcss: {
      plugins: {
        'postcss-nesting': {}
      }
    },
    babel: {
      presets (context) {
        const { isServer, isModern } = context
        const targets = isServer ? { node: 'current' } : { ie: 11 }
        return [
          [
            require.resolve('@nuxt/babel-preset-app'), {
              targets,
              useBuiltIns: isModern ? 'entry' : 'usage'
            }
          ]
        ]
      }
    }
  },

  modules: [
    [
      resolve(__dirname, '..'), {
        analyzer: true,
        polyfill: true,
        parallelBuilds: 2,
        publicPath: getBasePath(),
        staticPath: resolve(__dirname, '../example/custom-element/static'),
        entries: [
          {
            name: 'ComponentAppAbstract',
            tags: [
              {
                async: false,
                name: 'CustomElementAppAbstract',
                path: '@/components/apps/AppAbstract',
                options: {
                  props: {
                    basePath: './'
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
                    basePath: './'
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
                    basePath: './'
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
                    basePath: './'
                  }
                }
              },
              {
                async: true,
                name: 'CustomElementAppHash',
                path: '@/components/apps/AppHash',
                options: {
                  props: {
                    basePath: './'
                  }
                }
              },
              {
                async: true,
                name: 'CustomElementAppHistory',
                path: '@/components/apps/AppHistory',
                options: {
                  props: {
                    basePath: './'
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
  return process.env.npm_config_base || '/'
}
