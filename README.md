# nuxt-custom-elements

[![Build Status][travis-build-status-src]][travis-build-status-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
<!-- [![Codecov][codecov-src]][codecov-href] -->
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
        polyfill: true,
        publicPath: '/',
        staticPath: 'path to static-dir',
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
                name: 'ComponentOne',
                path: 'Path to ComponentOne',
                options: {
                  props: ['prop1', 'prop2']
                }
              },
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
          }
        ]
      }]

  ]
}
```

## Properties

> `staticPath` only available in generate or CLI build. For use in dev mode, the default static directory must be used.
>
> **Example:** `@/static`

| Name         | Type              | Description                                                                                                                                   | Default Value | Required |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| `analyzer`   | `Boolean, Object` | Sets `true` for default module config or `object` with custom `webpack-bundle-analyzer` configuration                                         | `false`       | `false`  |
| `polyfill`   | `Boolean`         | For cross-browser compatibility (IE9+) use Custom Elements polyfill.                                                                          | `false`       | `false`  |
| `publicPath` | `String`          | Defines the webpack `publicPath`.                                                                                                             | `/`           | `false`  |
| `staticPath` | `String`          | Path to the `static` directory.                                                                                                               | `null`        | `false`  |
| `entries`    | `Array`           | Defines the component bundles.<br><br>Components can be distributed in separate end points.<br>Allows the targeted distribution of resources. | `null`        | `true`   |

---

## Entry

```js
{
  name: 'EndpointName',
  tags: [
    // Simplified props, definition only
    {
      name: 'TagName',
      path: 'component path',
      options: {
        props: ['prop1', 'prop2'],
        shadowDom: false
      }
    },
    // Extended props, with default values and with native shadow dom
    {
      name: 'AnotherTagName',
      path: 'component path',
      options: {
        props: {
          prop1: false,
          prop2: true
        },
        shadowDom: true
      }
    }
  ]
}
```

| Name   | Type     | Description                                                                                                            |
| ------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `name` | `String` | Name of the endpoint.<br>Value will be converted to ParamCase later.<br><br>Example: `EndpointName` -> `endpoint-name` |
| `tags` | `Array`  | Tag of the endpoint.<br>Value will be converted to ParamCase later.                                                    |

---

## Tag

| Name      | Type     | Description                                                                                             |
| --------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `name`    | `String` | Name of the Tag.<br>Value will be converted to ParamCase later.<br><br>Example: `TagName` -> `tag-name` |
| `path`    | `String` | Path to the component to be called by the tag.                                                          |
| `options` | `Object` | Options from Options.                                                                                   |

## Tag Options

| Name        | Type            | Description                                                  | Default Value |
| ----------- | --------------- | ------------------------------------------------------------ | ------------- |
| `shadowDom` | `Boolean`       | Sets `true` if Native Shadow-Dom is to be used.              | `false`       |
| `props`     | `Array, Object` | Use array for prop definition and object for default values. | `[]`          |

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
        staticPath: resolve('@/custom-element/static'),
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

Finally a `nuxt generate` must be executed. The custom-element build is located in the nuxt-generate directory. Example: `dist/nuxt-custom-elements`
Or execute a `nuxt build`, the files are located under `.nuxt/nuxt-custom-elements/dist`.

## Development custom-element on the fly

To develop a custom component in dev mode, the endpoint must be called in the create method of a page.

```html

<script>
export {
  data () {
    return {
      basePath: '/', // router base
      data: {
        foo: 'bar'
      }
    }
  },
  created () {
    this.$registerCustomElementsEntry('ComponentAppAbstract')
  }
}
</script>

```

The custom elements contained in the page template can now be called.

```html
<template>
  <div>
    <client-only>
      <custom-element-app-abstract
        :base-path="basePath"
        class="application"
      >
        <script
          type="application/json"
          v-text="data"
        ></script>
      </custom-element-app-abstract>
    </client-only>
  </div>
</template>
```

> Custom tags must be excluded from the `SSR` build.  
> Use an `SPA` mode or use `client-only` tag.

## Preview

1. Start static server using `npm run start:build`
2. Open [http://127.0.0.1:3000](http://127.0.0.1:3000) in Browser.

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

<!-- Badges -->

[travis-build-status-src]: <https://travis-ci.org/GrabarzUndPartner/nuxt-custom-elements.svg?branch=master)>
[travis-build-status-href]: <https://travis-ci.org/GrabarzUndPartner/nuxt-custom-elements>

[npm-version-src]: https://img.shields.io/npm/v/nuxt-custom-elements/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-custom-elements

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-custom-elements.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-custom-elements

[codecov-src]: https://img.shields.io/codecov/c/github/GrabarzUndPartner/nuxt-custom-elements/branch/master/graph/badge.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/GrabarzUndPartner/nuxt-custom-elements

[license-src]: https://img.shields.io/npm/l/nuxt-custom-elements.svg?style=flat-square
[license-href]: https://npmjs.com/package/nuxt-custom-elements
