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
        staticPath: resolve(process.cwd(), 'example/custom-element/static'),
        entries: [
          {
            name: 'ComponentAppAbstract',
            tags: [
              {
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
                name: 'CustomElementAppAbstract',
                path: '@/components/apps/AppAbstract',
                options: {
                  props: {
                    basePath: getBasePath()
                  }
                }
              },
              {
                name: 'CustomElementAppHash',
                path: '@/components/apps/AppHash',
                options: {
                  props: {
                    basePath: getBasePath()
                  }
                }
              },
              {
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
