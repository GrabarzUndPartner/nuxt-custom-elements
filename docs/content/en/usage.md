---
title: Usage
description: ''
position: 4
category: Guide
components:
  - "Directive zum anwenden von Fonts"
  - Komponenten mit Lazy funktionialität



---

First of all, components that are to be exported as custom elements must be specified in the nuxt.config in the module settings.

```javascript
{
  customElements: {
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
}
```

Finally a `nuxt generate` or `nuxt build` must be executed. The custom-element build is located in the nuxt-generate directory (`generate.dir`).  e.g. `dist/nuxt-custom-elements`

## Integrations

### Vue i18n, Vue Router and Vuex Store

To integrate `Vue i18n`, `Vue Router` or `Vuex Store`, the plugins must be referenced on the top component (endpoint).

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




## Development

To develop a custom component in dev mode, the endpoint must be called in the `create` or `mounted`.

[Learn more](/plugin/registerCustomElementsEntry) about use of `$registerCustomElementsEntry`.

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
> Use the `client-only` tag or `ssr: false` in the `nuxt.config`.
