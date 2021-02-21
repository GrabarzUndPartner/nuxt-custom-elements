---
title: Options
description: ''
position: 21
category: Guide

---


## `buildDir`
- Type: `String`

Sets destination for custom-element build.

## `analyzer`
- Type: `Boolean || Object`
  - Default: `false`

Sets `true` for default module config or `object` with custom `webpack-bundle-analyzer` configuration.

## `modern`
- Type: `Boolean`
  - Default: `nuxt.options.modern === 'client'`

If `true`, a `modern` build is generated, sets `false` for only [client build](https://nuxtjs.org/guides/configuration-glossary/configuration-modern).

 <alert>To use `modern`, `modern` must be active in nuxt. </alert>

## `modernPolyfill`
- Type: `Boolean`
  - Default: `false`

Set `true` for all browsers that require a polyfill for [custom elements](https://github.com/ungap/custom-elements). 
<alert type="warning">For older `IE Edge` versions, the modern files are loaded. Therefore the use of polyfills is essential.</alert>

Example: 

## `entries`
- Type: `Array`
  - Default: `[]`
  - <badge>required</badge>

Defines the component bundles.

Components can be distributed in separate endpoints.  
Allows the targeted distribution of resources.    

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


#### `name`
- Type: `String`
  
Name of the endpoint.  
Value will be converted to ParamCase later.  

#### `tags`
- Type: `Array`
  - Default: `[]` 
  
 Tag Definitions.

### Tag


#### `name`
- Type: `String`

Name of the Tag.<br>Value will be converted to ParamCase later.<br><br>Example: `TagName` -> `tag-name`
#### `async`
- Type: `Boolean`

Components are loaded asynchronously.<br><br>If there is more than one entry the async will lead to unwanted webpack chunk splitting.
#### `path`
- Type: `String`

 Path to the component to be called by the tag. 
#### `options`
- Type: `Function, Object`

Options from custom-element.  

[Learn more](https://github.com/karol-f/vue-custom-element#options)  about `vue-custom-element` options.

You can set as `object` or when using functions in options, use `function`.

```js
{
  name: 'ComponentAppBundle',
  tags: [
    // with function call
    {
      async: true,
      name: 'CustomElementAppI18n',
      path: '@/components/apps/AppI18n',
      options () {
        return {
          props: {
            base: './'
          },
          vueInstanceCreatedCallback () {
            console.info('constructorCallback', this);
          }
        };
      }
    },
    // without function call
    {
      async: true,
      name: 'CustomElementAppI18n',
      path: '@/components/apps/AppI18n',
      options: {
        props: {
          base: './'
        }
      }
    }
  ]
}
```

## `webpackOutput`
- Type: `Object`
  - Default: [See webpackOutput Example](#override-example-with-function)

Defines the webpack output options (`filename`, `chunkFilename` and `publicPath`).

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


## `webpackPublicPathInject`
- Type: `Function`
  - Default: `undefined`

Inject webpack public path over entry file. [Learn more](https://webpack.js.org/guides/public-path/#on-the-fly)  

Using `Function` call client side. 

```js
{
  webpackPublicPathInject: () => global.customPublicPath, // or
  webpackPublicPathInject: function () { return global.customPublicPath; }
}
```

## Example Configuration

```js
{
  customElements: {
    analyzer: true,
    modern: true,
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
  }
}
```
