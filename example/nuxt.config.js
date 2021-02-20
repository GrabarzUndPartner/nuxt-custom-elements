const { resolve } = require('upath');
const repository = require('../package.json').repository;
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  dev: isDev,

  ssr: false,
  modern: isDev ? false : 'client',

  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,

  server: {
    port: getPort()
  },

  render: {
    resourceHints: false
  },

  env: {
    GITHUB_REPO_URL: `https://github.com/${repository}`
  },

  build: {

    babel: {
      presets ({ isServer, isModern }) {
        const targets = isServer ? { node: 'current' } : { ie: 11 };
        return [
          [
            require.resolve('@nuxt/babel-preset-app-edge'), {
              targets,
              useBuiltIns: isModern ? 'entry' : 'usage',
              corejs: { version: 3 }
            }
          ]
        ];
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

  customElements: {
    analyzer: !isTest,
    modern: true,
    modernPolyfill: true,
    webpackOutput: {
      publicPath: getPublicPath()
    },
    entries: [
      ...((!isTest && [{
        name: 'ComponentAppI18n',
        tags: [
          {
            async: false,
            name: 'CustomElementAppI18n',
            path: '@/components/apps/AppI18n',
            options: {
              props: {
                base: './'
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
      }]) || []),
      {
        name: 'ComponentAppBundle',
        tags: [
          {
            async: true,
            name: 'CustomElementAppI18n',
            path: '@/components/apps/AppI18n',
            options: {
              props: {
                base: './'
              }
            }
          },
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
  },

  modules: [
    [resolve(__dirname, '..')]
  ]
};

function getBasePath () {
  return process.env.npm_config_base || process.env.BASE_PATH || '/';
}

function getPublicPath () {
  return process.env.npm_config_base || process.env.PUBLIC_PATH || './';
}

function getDistPath () {
  return process.env.npm_config_dist || process.env.DIST_PATH || 'dist';
}

function getPort () {
  return process.env.npm_config_port || process.env.PORT || 3000;
}
