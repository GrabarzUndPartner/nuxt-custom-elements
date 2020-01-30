const { resolve } = require('path')
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
    }
  },

  modules: [
    [
      '@/../', {
        analyzer: true,
        polyfill: true,
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
                    basePath: getBasePath()
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
                    basePath: getBasePath()
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
                    basePath: getBasePath()
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
                    basePath: getBasePath()
                  }
                }
              },
              {
                async: true,
                name: 'CustomElementAppHash',
                path: '@/components/apps/AppHash',
                options: {
                  props: {
                    basePath: getBasePath()
                  }
                }
              },
              {
                async: true,
                name: 'CustomElementAppHistory',
                path: '@/components/apps/AppHistory',
                options: {
                  props: {
                    basePath: getBasePath()
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
