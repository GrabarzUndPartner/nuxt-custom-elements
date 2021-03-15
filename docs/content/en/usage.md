---
title: Usage
description: ''
position: 13
category: Guide
components:
  - "Directive zum anwenden von Fonts"
  - Komponenten mit Lazy funktionialität
developmentSandboxUrl: https://codesandbox.io/embed/github/GrabarzUndPartner/nuxt-custom-elements-example/tree/main/?hidenavigation=1&theme=dark
---

Nuxt Custom-Elements is used to export components from a [Nuxt.js](https://nuxtjs.org) project as custom elements, this is used when providing widgets.

## Write Custom-Element

These are the first steps you need to export a component built in [Nuxt.js](https://nuxtjs.org) as a custom element. Alternatively, you can take a look at the [Nuxt Custom-Elements Example](https://github.com/GrabarzUndPartner/nuxt-custom-elements-example) project that follows the steps. 

### Create Component

Create a component that you want to use as custom element. 

<alert type="warning">There is no integration of [Nuxt.js](https://nuxtjs.org) modules in the custom elements. For using Vue plugins, [look at Integrations](/usage#integrations).</alert>

```vue[nuxt-custom-elements-starter/components/Example.vue]
<template>
  <div class="example">
    <div class="title">
      {{ title }}
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
      default: 'Default Title'
    }
  }
};
</script>

<style scoped>
.example {
  padding: 10px;
  font-family:
    'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #35495e;
  background: #35495e;
  border-radius: 4px;
  font-size: 16px;
}
.title {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}
.title, .content {
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
  modules: [
    'nuxt-custom-elements'
  ],
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
  }
}
```

### Generate Custom-Elements

After the module is installed & configured, the generation of the custom element can be started.  
For this purpose a `nuxt build` or `nuxt generate` can be used.

> The generation of the custom element takes place only in `nuxt build`, in `nuxt generate` the result is copied to the `dist` folder.

### Finished

After the `build` or `generate` has run, you will find the export under following paths:

| Task            | Destination Path                                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| `nuxt build`    | `.nuxt/nuxt-custom-elements/dist`                                                                                    |
| `nuxt generate` | `dist/nuxt-custom-elements` (`nuxt.generate.dir` [Learn more](https://nuxtjs.org/docs/2.x/directory-structure/dist)) |

### Example Sandbox

<code-sandbox :src="developmentSandboxUrl"></code-sandbox>

## Development

To develop a custom component in dev mode, the `entry` in the `create` or `mounted` method must be called.  
This contains all the `tags` that can be called in the `template`.

[Learn more about `$registerCustomElementsEntry`](/plugin/registerCustomElementsEntry)

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

## Integrations

### Public path on the fly

You can inject the public paht from webpack build over a function, that the called client side.

In this example, the variable `window.customPublicPath` is defined before the custom-elements resources are loaded.

```html[index.html]

<custom-app-bundle />

<script type="text/javascript">
  window.customPublicPath = '/assets/custom-app-bundle/'
</script>

<script src="/assets/component-app-bundle/component-app-bundle.client.js"></script>
``` 

<br>

```javascript[nuxt.config]
{
  customElements: {
    webpackPublicPathInject: () => global.customPublicPath
  } 
}
```

Alternatively, the publicPath can be defined permanently in the [webpack output](/options#webpackoutput) config.

```javascript[nuxt.config]
{
  customElements: {
    webpackOutput: {
      publicPath: '/assets/component-app-bundle/'
    } 
  } 
}
```


### Vue i18n, Vue Router and Vuex Store

To integrate `Vue i18n`, `Vue Router` or `Vuex Store`, the plugins must be referenced on the top component (entry tag).  

[Learn more about the Entry](/options#entry) 

All child components have access to `this.$i18n`, `this.$router` and `this.$store`.

```html
<script>

import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(VueRouter)

// i18n

const messages = {
  de: {
    message: {
      hello: 'hallo welt'
    }
  },
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})

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

  i18n,
  store,
  router,

  props: {...},

  mounted() {
    console.log(this.$i18n, this.$store, this.$router)
  }
  
}

</script>
```

