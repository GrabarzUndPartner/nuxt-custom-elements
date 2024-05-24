import { readPackage } from 'read-pkg';
import { defineNuxtConfig } from 'nuxt/config';
import { viteVueCESubStyle } from '@unplugin-vue-ce/sub-style';

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

    vite: {
      plugins: [viteVueCESubStyle()]
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
              path: '@/components/customElements/Example.ce.vue',
              options: {
                props: {
                  title: 'Live Example'
                }
              },
              appContext: '@/components/customElements/Example.appContext.js',
              slotContent: '<div>Live Example Content</div>'
            }
          ]
        }
      ]
    },

    buildModules: isDev
      ? ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module']
      : [],

    modules: ['@nuxt/eslint', '../src/module'],

    eslint: {
      config: {
        typescript: false
      }
    }
  };
});

function getBaseUrl() {
  return process.env.npm_config_base_url || process.env.BASE_URL || '/';
}

function getPort() {
  return process.env.npm_config_port || process.env.PORT || 3000;
}
