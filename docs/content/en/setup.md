---
title: Setup
description: ''
position: 11
category: Guide
---

Check the [Nuxt.js documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-modules) for more information about installing and using modules in Nuxt.js.

## Installation

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

Then, add `nuxt-custom-elements` to the `modules` section of `nuxt.config.js`:

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

See <nuxt-link to="/options">module options</nuxt-link>.
