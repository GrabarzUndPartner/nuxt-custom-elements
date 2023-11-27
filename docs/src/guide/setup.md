---
title: Setup
---

# {{$frontmatter.title}}

Check the [Nuxt.js documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-modules) for more information about installing and using modules in Nuxt.js.

## Installation

Add `nuxt-custom-elements` dependency to your project:

::: code-group

  ```bash [Yarn]
  yarn add nuxt-custom-elements@beta
  ```

  ```bash [NPM]
  npm install nuxt-custom-elements@beta
  ```

:::

Then, add `nuxt-custom-elements` to the `modules` section of `nuxt.config.js`:

::: code-group

```js[nuxt.config.js]
{
  modules: [
    'nuxt-custom-elements'
  ],
  customElements: {
    // Options
  }
}
```

:::

See [module options](/guide/options).
