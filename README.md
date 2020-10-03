# nuxt-custom-elements

[![Grabarz & Partner - Module][grabarz-partner-module-src]][grabarz-partner-href]  

[![Master][github-workflow-master-src]][github-workflow-master-href]

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Renovate - Status][renovate-status-src]][renovate-status-href]
[![License][license-src]][license-href]

> Publish your Components as a [vue-custom-element](https://github.com/karol-f/vue-custom-element) standalone build.

`nuxt-custom-elements` is a Nuxt.js module that uses [vue-custom-element](https://github.com/karol-f/vue-custom-element) to publish single components as custom element / web-component.

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-custom-elements` dependency to your project

```bash
yarn add nuxt-custom-elements # or npm install nuxt-custom-elements
```

2. Add `nuxt-custom-elements` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [

    ['nuxt-custom-elements', {
        analyzer: true,
        modern: true,
        polyfill: true,
        entries: [

          // Entry with single tag.
          {
            name: 'CustomElementsOne',
            tags: [
              {
                name: 'ComponentOne',
                path: 'Path to ComponentOne',
                options: {
                  props: ['prop1', 'prop2'],
                }
              }
            ]
          },
          {
            name: 'CustomElementsTwo',
            tags: [
              {
                name: 'ComponentTwo',
                path: 'Path to ComponentTwo',
                options: {
                  props: {
                    'prop1': 'Value 1',
                    'prop2': 'Value 2'
                  }
                }
              }
            ]
          },

          // Entry-Bundle with two tags.
          {
            name: 'CustomElementsBundle',
            tags: [
              {
                async: true,
                name: 'ComponentOne',
                path: 'Path to ComponentOne',
                options: {
                  props: ['prop1', 'prop2']
                }
              },
              {
                async: true,
                name: 'ComponentTwo',
                path: 'Path to ComponentTwo',
                options: {
                  props: {
                    'prop1': 'Value 1',
                    'prop2': 'Value 2'
                  }
                }
              }
            ]
          }
        ]
      }]

  ]
}
```

## Options

| Property        | Type              | Description                                                                                                                                                                                                                                         | Default Value                                                | Required |
| --------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------- |
| `buildDir`      | `String`          | Sets destination for custom-element build.                                                                                                                                                                                                          | `undefined`                                                  |
| `analyzer`      | `Boolean, Object` | Sets `true` for default module config or `object` with custom `webpack-bundle-analyzer` configuration                                                                                                                                               | `false`                                                      | `false`  |
| `modern`        | `Boolean`         | **Important**: To use `modern`, `modern` must be active in nuxt. <br>Sets `false` for only [client build](https://nuxtjs.org/guides/configuration-glossary/configuration-modern). <br>Default using nuxt option `nuxt.options.modern === 'client'`. | `undefined`                                                  | `false`  |
| `polyfill`      | `Boolean`         | For cross-browser compatibility (IE9+) use Custom Elements polyfill.                                                                                                                                                                                | `false`                                                      | `false`  |
| `entries`       | `Array`           | Defines the component bundles.<br><br>Components can be distributed in separate end points.<br>Allows the targeted distribution of resources.                                                                                                       | `null`                                                       | `true`   |
| `webpackOutput` | `Object`          | Defines the webpack output options.<br>`filename`, `chunkFilename`, `publicPath`                                                                                                                                                                    | [See webpackOutput Example](#override-example-with-function) | `false`  |


### Important `webpackOutput` Option

You can override the pattern from `webpackOutput.filename` and `webpackOutput.chunkFilename` with own function or pattern (string) e.g. `[name].[hash].js`.

#### Override example with functions:

```javascript 
{
  webpackOutput: {
    publicPath: '/',
    filename: (webpackConfig, moduleOptions) => {
      if (moduleOptions.modern) {
        if (webpackConfig.name === 'modern') {
          return '[name].modern.js'
        } else {
          return '[name].client.js'
        }
      } else {
        return '[name].js'
      }
    },
    chunkFilename: (webpackConfig, moduleOptions) => {
      if (moduleOptions.modern) {
        return '[name].[hash].js'
      } else {
        return '[name].js'
      }
    },
  }
}
```

### Entry

```js
{
  name: 'EndpointName',
  tags: [
    // Simplified props, definition only
    {
      async: false,
      name: 'TagName',
      path: 'component path',
      options: {
        props: ['prop1', 'prop2'],
        shadow: false
      }
    },
    // Extended props, with default values and with native shadow dom
    {
      async: true,
      name: 'AnotherTagName',
      path: 'component path',
      options: {
        props: {
          prop1: false,
          prop2: true
        },
        shadow: true
      }
    }
  ]
}
```

| Property | Type     | Description                                                                                                            | Default Value | Required |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| `name`   | `String` | Name of the endpoint.<br>Value will be converted to ParamCase later.<br><br>Example: `EndpointName` -> `endpoint-name` | `null`        | `true`   |
| `tags`   | `Array`  | Tag Definitions.                                                                                                       | `[]`          | `true`   |

### Tag

| Property  | Type      | Description                                                                                                                           |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `name`    | `String`  | Name of the Tag.<br>Value will be converted to ParamCase later.<br><br>Example: `TagName` -> `tag-name`                               |
| `async`   | `Boolean` | Components are loaded asynchronously.<br><br>If there is more than one entry the async will lead to unwanted webpack chunk splitting. |
| `path`    | `String`  | Path to the component to be called by the tag.                                                                                        |
| `options` | `Object`  | Options from Options.                                                                                                                 |

### Tag Options

| Property | Type            | Description                                                  | Default Value |
| -------- | --------------- | ------------------------------------------------------------ | ------------- |
| `shadow` | `Boolean`       | Sets `true` if Native Shadow-Dom is to be used.              | `false`       |
| `props`  | `Array, Object` | Use array for prop definition and object for default values. | `[]`          |

>⚠️ **Important:** CSS from the SingleFile (.vue) cannot be used, this will be included by the `vue-loader` by using the `style-loader`.  
>
>For shadow CSS the vue-custom-element property `shadowCSS` must be used. 

## Plugins

### `$registerCustomElementsEntry`

Registers the specified name containing custom elements during development.  
The name can be specified in Pascal/Param-Case.

**Case examples:** `ComponentAppAbstract` or `component-app-abstract`.

Use in the Vue context.

```javascript
this.$registerCustomElementsEntry('Name')
```

## Usage

First of all, components that are to be exported as custom elements must be specified in the nuxt.config in the module settings.

```javascript
{
  modules: [
    [
      'nuxt-custom-elements', {
        polyfill: true,
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
          }
        ]
      }
    ]
  ]  
}
```

Finally a `nuxt generate` or `nuxt build` must be executed. The custom-element build is located in the nuxt-generate directory (`generate.dir`).  e.g. `dist/nuxt-custom-elements`

### Integrations

### Vue Router & Vuex Store

To use `Vuex Store` or `Vue Router`, the store or router must be referenced on the top component (endpoint).

All child components have access to `this.$router` and `this.$store`.

```html
<script>

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(VueRouter)

// store

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

// router

const router = new VueRouter({
  routes: [...]
})

export default {

  store,

  router,

  props: {...},

  mounted() {
    console.log(this.$store, this.$router)
  }
  
}

</script>
```

## Development custom-element on the fly

To develop a custom component in dev mode, the endpoint must be called in the create method of a page.

```html
<script>
export {
  data () {
    return {
      base: '/', // router base
      data: {
        foo: 'bar'
      }
    }
  },
  created () {
    this.$registerCustomElementsEntry('ComponentAppHistory')
  }
}
</script>
```

The custom elements contained in the page template can now be called.

```html
<template>
  <div>
    <client-only>
      <script type="text/javascript">
        <!-- Used in example/custom-element/utils/router.js:22 -->
        window.CUSTOM_ELEMENT_ROUTER_BASE = '{{ base }}';
      </script>
      <custom-element-app-history
        class="application"
      >
        <script
          type="application/json"
          v-text="data"
        ></script>
      </custom-element-app-history>
    </client-only>
  </div>
</template>
```

> Custom tags must be excluded from the `SSR` build.  
> Use an `SPA` mode or use `client-only` tag.

## Preview

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Build and start with express `npm run start:build`
4. Open endpoints via `http://127.0.0.1:3000/` in Browser

- [ComponentAppBundle](http://127.0.0.1:3000/nuxt-custom-elements/component-app-bundle)  
- [ComponentAppAbstract](http://127.0.0.1:3000/nuxt-custom-elements/component-app-abstract)  
- [ComponentAppHash](http://127.0.0.1:3000/nuxt-custom-elements/component-app-hash)  
- [ComponentAppHistory](http://127.0.0.1:3000/nuxt-custom-elements/component-app-history)

or look here

- [ComponentAppBundle](https://grabarzundpartner.github.io/nuxt-custom-elements/component-app-bundle/)
  - [Report Client](https://grabarzundpartner.github.io/nuxt-custom-elements/reports/webpack/nuxt-custom-elements/component-app-bundle/client.html)
  - [Report Modern](https://grabarzundpartner.github.io/nuxt-custom-elements/reports/webpack/nuxt-custom-elements/component-app-bundle/modern.html)
- [ComponentAppAbstract](https://grabarzundpartner.github.io/nuxt-custom-elements/component-app-abstract/)
  - [Report Client](https://grabarzundpartner.github.io/nuxt-custom-elements/reports/webpack/nuxt-custom-elements/component-app-abstract/client.html)
  - [Report Modern](https://grabarzundpartner.github.io/nuxt-custom-elements/reports/webpack/nuxt-custom-elements/component-app-abstract/modern.html)
- [ComponentAppHash](https://grabarzundpartner.github.io/nuxt-custom-elements/component-app-hash/)
  - [Report Client](https://grabarzundpartner.github.io/nuxt-custom-elements/reports/webpack/nuxt-custom-elements/component-app-hash/client.html)
  - [Report Modern](https://grabarzundpartner.github.io/nuxt-custom-elements/reports/webpack/nuxt-custom-elements/component-app-hash/modern.html) 
- [ComponentAppHistory](https://grabarzundpartner.github.io/nuxt-custom-elements/component-app-history/)
  - [Report Client](https://grabarzundpartner.github.io/nuxt-custom-elements/reports/webpack/nuxt-custom-elements/component-app-history/client.html)
  - [Report Modern](https://grabarzundpartner.github.io/nuxt-custom-elements/reports/webpack/nuxt-custom-elements/component-app-history/modern.html)

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

<!-- Badges -->

[grabarz-partner-module-src]: <https://img.shields.io/badge/Grabarz%20&%20Partner-Module-d19700>
[grabarz-partner-href]: <https://grabarzundpartner.de>

[renovate-status-src]: <https://img.shields.io/badge/renovate-enabled-brightgreen>
[renovate-status-href]: <https://renovate.whitesourcesoftware.com/>

[github-workflow-master-src]: <https://github.com/GrabarzUndPartner/nuxt-custom-elements/workflows/Master/badge.svg?branch=master>
[github-workflow-master-href]: <https://github.com/GrabarzUndPartner/nuxt-custom-elements/actions?query=workflow%3AMaster>

[npm-version-src]: https://img.shields.io/npm/v/nuxt-custom-elements/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-custom-elements

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-custom-elements.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-custom-elements

[codecov-src]: https://img.shields.io/codecov/c/github/GrabarzUndPartner/nuxt-custom-elements/branch/master/graph/badge.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/GrabarzUndPartner/nuxt-custom-elements

[license-src]: https://img.shields.io/npm/l/nuxt-custom-elements.svg?style=flat-square
[license-href]: https://npmjs.com/package/nuxt-custom-elements

