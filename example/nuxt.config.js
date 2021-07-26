const { resolve } = require("upath");
const repository = require("../package.json").repository;
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

module.exports = {
  dev: isDev,

  ssr: false,

  rootDir: resolve(__dirname, ".."),
  buildDir: resolve(__dirname, ".nuxt"),
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
    postcss: {
      plugins: {
        "postcss-nesting": {}
      }
    }
  },

  generate: {
    dir: getDistPath()
  },

  router: {
    base: getBasePath()
  },
  customElements: {
    entries: [
      {
        name: "ComponentAppShadow",
        tags: [
          {
            async: false,
            name: "CustomElementAppShadowA",
            path: "@/components/apps/AppShadow",
            options: {
              shadow: true,
              props: {
                title:
                  "Shadow Element with vue-loader import, without css compiler."
              }
            }
          },
          {
            async: false,
            name: "CustomElementAppShadowB",
            path: "@/components/apps/AppShadow",
            options: {
              shadow: true,
              shadowCss:
                '.shadow-element { display: flex; align-items: center; justify-content: center; color: white; background: blue;}.shadow-element span { font-weight: bold;}.shadow-element::before { display: block; padding-top: calc(9 / 16 * 100%); content: "";}',
              props: {
                title: "Shadow Element with shadowCss option"
              }
            }
          }
        ]
      },
      {
        name: "Example",
        tags: [
          {
            name: "CustomElementExample",
            path: "@/components/Example",
            options: {
              props: {
                title: "Live Example"
              }
            },
            slotContent: "<div>Live Example Content</div>"
          }
        ]
      }
    ]
  },

  buildModules: ["@nuxtjs/eslint-module", "@nuxtjs/stylelint-module"],

  modules: [[resolve(__dirname, "..")]]
};

function getBasePath() {
  return process.env.npm_config_base || process.env.BASE_PATH || "/";
}

function getPublicPath() {
  return process.env.npm_config_public_path || process.env.PUBLIC_PATH || "./";
}

function getDistPath() {
  return process.env.npm_config_dist || process.env.DIST_PATH || "dist";
}

function getPort() {
  return process.env.npm_config_port || process.env.PORT || 3000;
}
