import WebpackDynamicPublicPathPlugin from 'webpack-dynamic-public-path';
import { resolve } from 'upath';
import nuxtBabelPresetApp from '@nuxt/babel-preset-app';
import { repository } from '../package.json';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test'; ;

export default {
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
            nuxtBabelPresetApp, {
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
        'postcss-preset-env': {
          preserve: true,
          stage: 0
        }
      },
      order: 'cssnanoLast'
    }

  },

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
    entries: [
      {
        name: 'Example',
        webpackExtend (config) {
          config.output.publicPath = getPublicPath();

          config.plugins.push(new WebpackDynamicPublicPathPlugin({
            externalPublicPath: 'window.externalPublicPath'
          }));

          return config;
        },
        tags: [
          {
            async: false,
            name: 'CustomElementExample',
            path: '@/components/Example',
            options: {
              props: {
                title: 'Live Example'
              }
            },
            slotContent: '<div>Live Example Content</div>'
          }
        ]
      },
      {
        name: 'ExampleShadow',
        shadow: true,
        tags: [
          {
            async: false,
            name: 'CustomElementExampleShadow',
            path: '@/components/Example',
            options: {
              props: {
                title: 'Live Example'
              }
            },
            slotContent: '<div>Live Shadow Example Content</div>'
          }
        ]
      }
    ]
  },

  buildModules: [
    '@nuxt/postcss8',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],

  modules: [
    [resolve(__dirname, '..')]
  ]
};

function getBasePath () {
  return process.env.npm_config_base || process.env.BASE_PATH || '/';
}

function getPublicPath () {
  return process.env.npm_config_public_path || process.env.PUBLIC_PATH || './';
}

function getDistPath () {
  return process.env.npm_config_dist || process.env.DIST_PATH || 'dist';
}

function getPort () {
  return process.env.npm_config_port || process.env.PORT || 3000;
}
