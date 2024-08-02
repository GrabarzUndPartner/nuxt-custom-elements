import { fileURLToPath } from 'url';
import { defineConfig } from 'vitepress';
import markdownItInlineComments from 'markdown-it-inline-comments';
import navigation from './navigation.js';

// https://vitepress.dev/reference/site-config
export default defineConfig(() => ({
  markdown: {
    config: md => {
      md.use(markdownItInlineComments);
    }
  },

  base: getBaseUrl(),

  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBarTitle\.vue$/,
          replacement: fileURLToPath(
            new URL('../components/VPNavBarTitle.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavBarMenu\.vue$/,
          replacement: fileURLToPath(
            new URL('../components/VPNavBarMenu.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPNavScreenMenu\.vue$/,
          replacement: fileURLToPath(
            new URL('../components/VPNavScreenMenu.vue', import.meta.url)
          )
        }
      ]
    }
  },

  srcDir: 'src',

  title: 'Nuxt Custom-Elements',
  description:
    'Publish your Components as a vue-custom-element standalone build.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logoComponent: true,

    ...navigation,

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/GrabarzUndPartner/nuxt-custom-elements'
      }
    ]
  },

  sitemap: {
    hostname: 'https://grabarzundpartner.github.io/nuxt-custom-elements/'
  }
}));

function getBaseUrl() {
  return process.env.npm_config_base_url || process.env.BASE_URL || '/';
}
