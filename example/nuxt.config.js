const { resolve } = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  dev: isDev,

  mode: 'spa',
  modern: false, // 'client',

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
                    basePath: '/'
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
                    basePath: '/'
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
                    basePath: '/'
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
                    basePath: '/'
                  }
                }
              },
              {
                name: 'CustomElementAppHash',
                path: '@/components/apps/AppHash',
                options: {
                  props: {
                    basePath: '/'
                  }
                }
              },
              {
                name: 'CustomElementAppHistory',
                path: '@/components/apps/AppHistory',
                options: {
                  props: {
                    basePath: '/'
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
