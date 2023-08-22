import { readPackage } from 'read-pkg';
import { defineNuxtConfig } from 'nuxt/config';

const isTest = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV === 'development';

export default defineNuxtConfig(async () => {
  const { homepage } = await readPackage();

  return {
    dev: isDev,

    // builder: '@nuxt/webpack-builder',

    baseUrl: getBaseUrl(),

    ssr: true,

    runtimeConfig: {
      public: {
        githubRepoUrl: homepage
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
    },

    devServer: {
      port: getPort()
    },

    customElements: {
      analyzer: !isTest,
      entries: [
        {
          name: 'Example',
          // viteExtend(config) {
          //   // https://vitejs.dev/config/#config-file
          //   config.plugins.push(viteVueCE());
          //   return config;
          // },
          // webpackExtend(config) {
          //   // https://webpack.js.org/guides/public-path/#automatic-publicpath
          // },
          tags: [
            {
              async: false,
              name: 'CustomElementExample',
              path: '@/components/customElements/Example.vue',
              options: {
                props: {
                  title: 'Live Example'
                }
              },
              slotContent: '<div>Live Example Content</div>'
            }
          ]
        }
      ]
    },

    buildModules: isDev
      ? ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module']
      : [],

    modules: ['../src/module']
  };
});

function getBaseUrl() {
  return process.env.npm_config_base_url || process.env.BASE_URL || '/';
}

function getPort() {
  return process.env.npm_config_port || process.env.PORT || 3000;
}
