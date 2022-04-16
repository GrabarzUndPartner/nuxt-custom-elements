---
title: Introduction
description: ''
position: 1
category: ''
features:
  - Using modern and client build
  - Export components as widgets
  - Use the Shadow DOM 🥷
  - Use TailwindCSS and Vuetify for your widgets
developmentSandboxUrl: https://codesandbox.io/embed/github/GrabarzUndPartner/nuxt-custom-elements/tree/main/?fontsize=14&hidenavigation=1&module=%2Fexample%2Fcomponents%2FExample.vue&theme=dark
---

<!-- <img src="/preview.png" class="light-img" width="1280" height="640" alt=""/>
<img src="/preview-dark.png" class="dark-img" width="1280" height="640" alt=""/> -->
<img src="/intro-light.png" width="1280" height="640" alt=""/>

[Module]() for [NuxtJS](https://nuxtjs.org).

Nuxt Custom-Elements allows you to export your existing project components as custom elements for integration into external pages.

## Features

<list :items="features"></list>

## Browsers support

For cross-browser [compatibility](https://github.com/ungap/custom-elements#compatibility) (IE11+) the `client` build uses the Polyfill [custom-elements](https://github.com/ungap/custom-elements)

<alert type="warning">Polyfill not included in the `modern` build, optional include by option `modernPolyfill` ([Learn more](https://nuxt-custom-elements.grabarzundpartner.dev/options/#modernpolyfill)).</alert>

## Preview

For a quick integration, see [Nuxt Custom-Elements Example](https://grabarzundpartner.github.io/nuxt-custom-elements-example/) for more examples.
### Example Sandbox

<code-sandbox :src="developmentSandboxUrl"></code-sandbox>
