
import { readPackage } from 'read-pkg';
import { defineNuxtConfig } from 'nuxt/config';
import Module from '../src/module.mjs';

const isTest = process.env.NODE_ENV === 'test';
const isDev = process.env.NODE_ENV === 'development';

export default defineNuxtConfig(async () => {
  const { repository } = await readPackage();

  return {
    dev: isDev,
    builder: '@nuxt/webpack-builder',

    baseUrl: getBaseUrl(),

    ssr: true,

    runtimeConfig: {
      public: {
        GITHUB_REPO_URL: repository.url
      }
    },

    devServer: {
      port: getPort()
    },

    customElements: {
      analyzer: !isTest,
      entries: [
        {
          name: 'Example',
          // webpackExtend (config) {
          // https://webpack.js.org/guides/public-path/#automatic-publicpath
          // },
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
        }
      ]
    },

    buildModules: isDev
      ? [
          '@nuxtjs/eslint-module',
          '@nuxtjs/stylelint-module'
        ]
      : [],

    modules: [
      Module
    ]
  };
});

function getBaseUrl () {
  return process.env.npm_config_base_url || process.env.BASE_URL || '/';
}

function getPort () {
  return process.env.npm_config_port || process.env.PORT || 3000;
}
