---
title: Usage
description: ''
position: 13
category: Guide
components:
  - "Directive zum anwenden von Fonts"
  - Komponenten mit Lazy funktionialität
developmentSandboxUrl: https://codesandbox.io/embed/github/GrabarzUndPartner/nuxt-custom-elements/tree/main/?fontsize=14&hidenavigation=1&module=%2Fexample%2Fcomponents%2FExample.vue&theme=dark
---

Nuxt Custom-Elements is used to export components from a [Nuxt.js](https://nuxtjs.org) project as custom elements, this is used when providing widgets.

## Write Custom-Element

These are the first steps you need to export a component built in [Nuxt.js](https://nuxtjs.org) as a custom element. Alternatively, you can take a look at the [Nuxt Custom-Elements Example](https://github.com/GrabarzUndPartner/nuxt-custom-elements-example) project that follows the steps. 

### Create Component

Create a component that you want to use as custom element. 

<alert type="warning">There is no integration of [Nuxt.js](https://nuxtjs.org) modules in the custom elements. For using Vue plugins, [look at Integrations](/usage#integrations).</alert>

```vue[example/components/Example.vue]
<template>
  <div class="custom-element-example">
    <div class="title">
      {{ exampleTitle }}
    </div>
    <div class="content">
      <slot>Default Content</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    exampleTitle () {
      return this.title || 'Default Title';
    }
  }
};
</script>

<style scoped>
.custom-element-example {
  min-width: 300px;
  padding: 10px;
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  color: #35495e;
  text-align: center;
  background: #35495e;
  border-radius: 4px;
}

.title {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}

.title,
.content {
  padding: 5px;
  color: white;
  background: #3b8070;
}
</style>
```

### Add Module with Configuration

Add `nuxt-custom-elements` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add nuxt-custom-elements
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install nuxt-custom-elements
  ```

  </code-block>
</code-group>

After the installation, add the module in the `nuxt.config`.  
Remember that the created component must be added to the module.

For providing a custom element an entry must be created, this needs a name and should be specified in `PascalCase`.

The previously created component is put under `tags`. The name must also be specified as `PascalCase`.  
If necessary you can also define multiple custom elements in `tags` and deliver them together 😉 .

[Learn more about `async` loading of tags]([#](http://localhost:5000/options#tag))

```js[nuxt.config.js]
{
  customElements: {
     entries: [
       {
        name: 'Example',
        tags: [
          {
            name: 'CustomElementExample',
            path: '@/components/Example',
            options: {
              props: {
                title: 'Prop. Example Title'
              }
            },
            slotContent: 'Slot Example Content'
          }
        ]
      }
    ]
  },
  modules: [
    'nuxt-custom-elements'
  ]
}
```

### Generate Custom-Elements

After the module is installed & configured, the generation of the custom element can be started.  
For this purpose a `nuxt build` or `nuxt generate` can be used.

> The generation of the custom element takes place only in `nuxt build`, in `nuxt generate` the result is copied to the `dist` directory.

### Finished

After the `build` or `generate` has run, you will find the export under following paths:

| Task            | Destination Path                                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| `nuxt build`    | `.nuxt/nuxt-custom-elements/dist`                                                                                    |
| `nuxt generate` | `dist/nuxt-custom-elements` (`nuxt.generate.dir` [Learn more](https://nuxtjs.org/docs/2.x/directory-structure/dist)) |

### Example Sandbox

<code-sandbox :src="developmentSandboxUrl"></code-sandbox>

## Development

To develop a custom component in Dev mode, you must call the `entry` in the`create` or `mounted` method.
This contains all the `tags` that can be called in the `template`.

[Learn more about `$registerCustomElementsEntry`](/plugins#registerCustomElementsEntry)

<alert>Remember to ignore the specified tags with `Vue.config.ignoredElements` in Vue. For the local Vue instance the respective tag is unknown.</alert>

```html
<script>

import Vue from 'vue';

Vue.config.ignoredElements = [
  'custom-element-example'
];

export default {
  created () {
    this.$registerCustomElementsEntry('Example')
  }
}
</script>
```

Place the relevant tags in a `client-only` tag, this is important so that the tag is not resolved in `SSR`.  
Alternatively, [SSR can be disabled](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-ssr) if possible.

```html
<template>
  <div>
    <client-only>
      <custom-element-example title="Prop. Title">
        Slot Content
      </custom-element-example>
    </client-only>
  </div>
</template>
```


## Webpack Public Path Inject

You can inject the public paht from webpack build over a `function`, that the called client side.

The variable `window.customPublicPath` must be defined before the scripts have been loaded.

```html[html]
<custom-element-example />

<script type="text/javascript">
  window.customPublicPath = '/assets/custom-app-example/';
</script>

<script src="/assets/custom-app-example/custom-app-example.js"></script>
``` 

<br>

```javascript[nuxt.config]
{
  customElements: {
    webpackPublicPathInject: () => global.customPublicPath
  } 
}
```
In the background, the webpack variable `__webpack_public_path__` is set with the value from the `function`.

```js
__webpack_public_path__ = webpackPublicPathInject();
```

Alternatively, the `publicPath` can be defined permanently in the [webpack output](/options#webpackoutput) config.

```javascript[nuxt.config]
{
  customElements: {
    webpackOutput: {
      publicPath: '/assets/component-app-bundle/'
    } 
  } 
}
```


## Integrations
You can use other plugins with Nuxt Custom-Elements. 

Look here for integration examples:

- [TailwindCSS](https://tailwindcss.com/) ([Example](https://grabarzundpartner.github.io/nuxt-custom-elements-example/tailwind-css/))
- [Vuetify](https://vuetifyjs.com/) ([Example](https://grabarzundpartner.github.io/nuxt-custom-elements-example/vuetify/))
- [VueRouter](https://router.vuejs.org/) ([Example](https://grabarzundpartner.github.io/nuxt-custom-elements-example/vue-router/))
- [VueI18n](https://kazupon.github.io/vue-i18n/) ([Example](https://grabarzundpartner.github.io/nuxt-custom-elements-example/vue-i18n/))
- [Vuex](https://vuex.vuejs.org/) ([Example](https://grabarzundpartner.github.io/nuxt-custom-elements-example/vuex/))

At [Nuxt Custom-Elements Example](https://github.com/GrabarzUndPartner/nuxt-custom-elements-example)  you can find configurations for the examples.
