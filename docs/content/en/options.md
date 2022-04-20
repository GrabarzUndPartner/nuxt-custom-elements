---
title: Options
description: ''
position: 12
category: Guide

---


## `buildDir`
- Type: `String`

Sets destination for custom-element build.

## `analyzer`
- Type: `Boolean`, `Object`
  - Default: `false`

Sets `true` for default module config or `object` with custom `webpack-bundle-analyzer` configuration.

## `modern`
- Type: `Boolean`
  - Default: `nuxt.options.modern === 'client'`

If `true`, a `modern` build is generated, sets `false` for only [client build](https://nuxtjs.org/guides/configuration-glossary/configuration-modern).

 <alert>To use `modern`, `modern` must be active in nuxt. </alert>

## `polyfill`
- Type: `Boolean`
  - Default: `true`

Set `false` to disable polyfill for [custom elements](https://github.com/ungap/custom-elements). 

## `modernPolyfill`
- Type: `Boolean`
  - Default: `false`

Set `true` for all browsers that require a polyfill for [custom elements](https://github.com/ungap/custom-elements). 
<alert type="warning">For older `IE Edge` versions, the modern files are loaded. Therefore the use of polyfills is essential.</alert>


## `webpackExtend`
- Type: `Function`

Called before the `build` and allows to customize the configuration before build. Return value is the `config`. `async` is supported. [Learn more](/options#entry-webpack-extend-example) 


```javascript
{
  webpackExtend(config, {client, modern}) {

    /**
     * Defines the webpack output options (`publicPath`, `filename`, `chunkFilename`).
     **/
    config.output = {
      ...config.output, 
      publicPath: 'https://domain/nuxt-custom-elements/example/',
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
      }
    };

    /**
     * Defines the webpack optimization options, see [webpack optimization](https://webpack.js.org/configuration/optimization/).
     * Example to create several chunks with minimum size of 100kb. 
     * One of the chunks contains all vue and vuetify related vendor libraries:
     **/
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      automaticNameDelimiter: '.',
      minChunks: 1,
      minSize: 100_000,
      chunks: 'all',
      cacheGroups: {
        uiFrameworks: {
          test: /[/\\]node_modules[/\\](vuetify.*|vue.*)[/\\]/,
          name: 'ui',
          chunks: 'all',
          priority: 10,
          enforce: true
        }
      }
    };

    /**
     * Defines webpack plugins, see [webpack plugins](https://webpack.js.org/configuration/plugins/).
     * The following example includes the `compression-webpack-plugin`:
     **/
    config.plugins = [
      ...config.plugins, 
      new (require('compression-webpack-plugin'))({
        filename: '[path][base].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css)$/,
      })
    ];

    return config;

  }
}
```


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
  shadow: true,
  webpackExtend(config, {client, modern}) {
    return config;
  },
  tags: [
    // Simplified props, definition only
    {
      async: false,
      name: 'TagName',
      path: 'component path',
      options: {
        props: ['prop1', 'prop2']
      } 
    },
    // Extended props, with default values
    {
      async: true,
      name: 'AnotherTagName',
      path: 'component path',
      options: {
        props: {
          prop1: false,
          prop2: true
        }
      }
    }
  ]
}
```

| Key             | Type       | Requried | Description                                                                                                                                                                | Default |
| --------------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `name`          | `String`   | yes      | Name of the endpoint. Value will be converted to ParamCase later.                                                                                                          |         |
| `shadow`        | `Boolean`  |          | If set, the tags are used with the <code>Shadow DOM</code>.                                                                                                                | `false` |
| `webpackExtend` | `Function` |          | Called before the `build` and allows to customize the configuration before build. Return value is the `config`. `async` is supported. [Learn more](/options#webpackextend) |         |
| `tags`          | `Array`    |          | Tag Definitions.                                                                                                                                                           | `[]`    |



<alert type="warning">
  <strong>Beware for the use of <code>Shadow DOM</code></strong>
  <br>The following customizations are made for the use of <code>Shadow DOM</code>:
  <br>
  <ul>
  <li>CustomElement hook <code>beforeCreateVueInstance</code> is set.<br><em>A set via the tag options will be overridden.</em><br><a href="https://github.com/karol-f/vue-custom-element#shadowdom-example">https://github.com/karol-f/vue-custom-element#shadowdom-example</a></li>
  <li>Webpack rules of <code>vue-loader</code> and <code>vue-style-loader</code> are extended with <code>shadowMode</code> option.</li>
  </ul>
</alert>

### Tag

| Key           | Type                 | Requried | Description                                                                                                                              | Default     |
| ------------- | -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `name`        | `String`             | yes      | Name of the Tag. Value will be converted to ParamCase later.<br><br>Example: `TagName` -> `tag-name`                                     |             |
| `async`       | `Boolean`            |          | Components are loaded asynchronously. If there is more than one entry the async will lead to unwanted webpack chunk splitting.           | `false`     |
| `path`        | `String`             |          | Path to the component to be called by the tag.                                                                                           | `false`     |
| `options`     | `Function`, `Object` |          | Options from custom-element. <br>[Learn more](https://github.com/karol-f/vue-custom-element#options) about `vue-custom-element` options. | `undefined` |
| `slotContent` | `String`             |          | Default slot content for generated html entry output.                                                                                    | `undefined` |

#### Important

You can set as `object` or when using functions in options, use `function`.

```js
{
  name: 'ComponentAppExample',
  tags: [
    // with function call
    {
      async: true,
      name: 'CustomElementAppExample',
      path: '@/components/apps/AppExample',
      options () {
        return {
          props: ['prop1', 'prop2'],
          vueInstanceCreatedCallback () {
            console.info('constructorCallback', this);
          }
        };
      },
      slotContent: '<div>Slot Content!</div>'
    },
    // without function call
    {
      async: true,
      name: 'CustomElementAppExample',
      path: '@/components/apps/AppExample',
      options: {
        props: {
          'prop1': 'Value 1',
          'prop2': 'Value 2'
        }
      },
      slotContent: '<div>Slot Content!</div>'
    }
  ]
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
