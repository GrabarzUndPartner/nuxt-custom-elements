---
title: Introduction
description: ''
position: 11
category: ''
features:
  - Using modern and client build
  - Export components as widgets
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


### Live Example

<client-only>
  <custom-element-app-example
    title="Live Example"
  >
    <div style="display: flex; align-items: center; justify-content: center; width: 100%; font-family: sans-serif; font-size: 30px; font-weight: 700;">
      Live Example Content
    </div>
  </custom-element-app-example>
</client-only>

<script type=text/javascript>
  window.customPublicPath = 'https://nuxt-custom-elements.grabarzundpartner.dev/example/component-app-example/';
</script>
<script src="https://nuxt-custom-elements.grabarzundpartner.dev/example/component-app-example/component-app-example.modern.js" type="module"></script>
<script src="https://nuxt-custom-elements.grabarzundpartner.dev/example/component-app-example/component-app-example.client.js" nomodule></script>


#### Code

```html
<custom-element-app-example title="Live Example" >
  <div>
    Live Example Content
  </div>
</custom-element-app-example>

<script type=text/javascript>
  window.customPublicPath = 'https://nuxt-custom-elements.grabarzundpartner.dev/example/component-app-i18n/';
</script>
<script src="https://nuxt-custom-elements.grabarzundpartner.dev/example/component-app-i18n/component-app-i18n.modern.js" type="module"></script>
<script src="https://nuxt-custom-elements.grabarzundpartner.dev/example/component-app-i18n/component-app-i18n.client.js" nomodule></script>
<script>!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();</script>
```

### Links

- [ComponentAppBundle](https://nuxt-custom-elements.grabarzundpartner.dev/example/component-app-bundle/)
  - [Report Client](https://nuxt-custom-elements.grabarzundpartner.dev/example/reports/webpack/nuxt-custom-elements/component-app-bundle/client.html)
  - [Report Modern](https://nuxt-custom-elements.grabarzundpartner.dev/example/reports/webpack/nuxt-custom-elements/component-app-bundle/modern.html)
- [ComponentAppI18n](https://nuxt-custom-elements.grabarzundpartner.dev/example/component-app-i18n/)
  - [Report Client](https://nuxt-custom-elements.grabarzundpartner.dev/example/reports/webpack/nuxt-custom-elements/component-app-i18n/client.html)
  - [Report Modern](https://nuxt-custom-elements.grabarzundpartner.dev/example/reports/webpack/nuxt-custom-elements/component-app-i18n/modern.html)
- [ComponentAppAbstract](https://nuxt-custom-elements.grabarzundpartner.dev/example/component-app-abstract/)
  - [Report Client](https://nuxt-custom-elements.grabarzundpartner.dev/example/reports/webpack/nuxt-custom-elements/component-app-abstract/client.html)
  - [Report Modern](https://nuxt-custom-elements.grabarzundpartner.dev/example/reports/webpack/nuxt-custom-elements/component-app-abstract/modern.html)
- [ComponentAppHash](https://nuxt-custom-elements.grabarzundpartner.dev/example/component-app-hash/)
  - [Report Client](https://nuxt-custom-elements.grabarzundpartner.dev/example/reports/webpack/nuxt-custom-elements/component-app-hash/client.html)
  - [Report Modern](https://nuxt-custom-elements.grabarzundpartner.dev/example/reports/webpack/nuxt-custom-elements/component-app-hash/modern.html) 
- [ComponentAppHistory](https://nuxt-custom-elements.grabarzundpartner.dev/example/component-app-history/)
  - [Report Client](https://nuxt-custom-elements.grabarzundpartner.dev/example/reports/webpack/nuxt-custom-elements/component-app-history/client.html)
  - [Report Modern](https://nuxt-custom-elements.grabarzundpartner.dev/example/reports/webpack/nuxt-custom-elements/component-app-history/modern.html)
