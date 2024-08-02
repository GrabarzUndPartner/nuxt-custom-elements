---
title: Introduction
---

<img src="/intro-light.png" width="1280" height="640" alt=""/>

[Module](https://github.com/GrabarzUndPartner/nuxt-custom-elements) for [NuxtJS](https://nuxtjs.org).

Nuxt Custom-Elements allows you to export your existing project components as custom elements for integration into external pages.

## Features

- Using modern and client build
- Export components as widgets
- Use the Shadow DOM 🥷
- Use TailwindCSS and Vuetify for your widgets

## Browsers support

For cross-browser [compatibility](https://github.com/ungap/custom-elements#compatibility) (IE11+) the `client` build uses the Polyfill [custom-elements](https://github.com/ungap/custom-elements)

::: warning
Polyfill not included in the `modern` build, optional include by option `modernPolyfill`.  
[Learn more](/v1/guide/options.html#modernpolyfill)
:::

## Preview

For a quick integration, see [Nuxt Custom-Elements Example](https://grabarzundpartner.github.io/nuxt-custom-elements-example/) for more examples.

### Example Sandbox

<iframe class="embed-sandbox" src="https://codesandbox.io/embed/github/GrabarzUndPartner/nuxt-custom-elements/tree/main/?fontsize=14&hidenavigation=1&module=%2Fexample%2Fcomponents%2FExample.vue&theme=dark"></iframe>
