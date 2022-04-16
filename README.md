![nuxt-custom-elements][logo]

# Nuxt Custom-Elements

[![Grabarz & Partner - Module][grabarz-partner-module-src]][grabarz-partner-href] 

[![main][github-workflow-main-src]][github-workflow-main-href]
[![develop][github-workflow-develop-src]][github-workflow-develop-href]
[![Sonarcloud Status][sonarcloud-src]][sonarcloud-href]

[![npm version][npm-version-latest-src]][npm-version-latest-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

[![Renovate - Status][renovate-status-src]][renovate-status-href]
[![License][license-src]][license-href]

- [✨ &nbsp;&nbsp;**Release Notes**](./CHANGELOG.md)
- [📖 &nbsp;&nbsp;**Documentation**](https://nuxt-custom-elements.grabarzundpartner.dev/)
- [👁 &nbsp;&nbsp;**Preview**](https://grabarzundpartner.github.io/nuxt-custom-elements-example/)

> Publish your Components as a [vue-custom-element](https://github.com/karol-f/vue-custom-element) standalone build.

Nuxt Custom-Elements allows you to export your existing project components as custom elements for integration into external pages.

## Features

- Using modern and client build
- Export components as widgets
- Use the `Shadow DOM` 🥷
- Use [TailwindCSS](https://tailwindcss.com/) and [Vuetify](https://vuetifyjs.com/) for your widgets
  
📖 &nbsp;&nbsp;[Learn more in the documentation](https://nuxt-custom-elements.grabarzundpartner.dev/)

## Browsers support

For cross-browser [compatibility](https://github.com/ungap/custom-elements#compatibility) (IE11+) the `client` build uses the Polyfill [custom-elements](https://github.com/ungap/custom-elements)

> Polyfill not included in the `modern` build, optional include by option `modernPolyfill` ([Learn more](https://nuxt-custom-elements.grabarzundpartner.dev/options/#modernpolyfill)).

## Development

1. Clone this repository
2. Install dependencies using `npm install` or `yarn install`
3. Start development server using `npm run dev` or `yarn dev`

## Preview

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Build and start with express `yarn start:build` or `npm run start:build`
4. Open endpoints via `http://127.0.0.1:3000/` in Browser

## License

[MIT License](./LICENSE)

<!-- Badges -->
[logo]: https://user-images.githubusercontent.com/8287751/108605028-b8193f00-73b1-11eb-9a80-872ab36e3a69.png "nuxt-custom-elements"
[grabarz-partner-module-src]: <https://img.shields.io/badge/Grabarz%20&%20Partner-Module-d19700>
[grabarz-partner-href]: <https://grabarzundpartner.de>

[renovate-status-src]: <https://img.shields.io/badge/renovate-enabled-brightgreen>
[renovate-status-href]: <https://renovate.whitesourcesoftware.com/>

[github-workflow-main-src]: <https://github.com/GrabarzUndPartner/nuxt-custom-elements/workflows/Main/badge.svg?branch=main>
[github-workflow-main-href]: <https://github.com/GrabarzUndPartner/nuxt-custom-elements/actions?query=workflow%3AMain>
[github-workflow-develop-src]: <https://github.com/GrabarzUndPartner/nuxt-custom-elements/workflows/Test/badge.svg?branch=develop>
[github-workflow-develop-href]: <https://github.com/GrabarzUndPartner/nuxt-custom-elements/actions?query=workflow%3ATest>
[dependencies-status-src]: <https://david-dm.org/GrabarzUndPartner/nuxt-custom-elements/status.svg>
[dependencies-status-href]: <https://david-dm.org/GrabarzUndPartner/nuxt-custom-elements>
[dependencies-dev-status-src]: <https://david-dm.org/GrabarzUndPartner/nuxt-custom-elements/dev-status.svg>
[dependencies-dev-status-href]: <https://david-dm.org/GrabarzUndPartner/nuxt-custom-elements?type=dev>

[sonarcloud-src]: <https://sonarcloud.io/api/project_badges/measure?project=GrabarzUndPartner_nuxt-custom-elements&metric=alert_status>
[sonarcloud-href]: <https://sonarcloud.io/dashboard?id=GrabarzUndPartner_nuxt-custom-elements>

[license-src]: https://img.shields.io/npm/l/nuxt-custom-elements.svg?style=flat-square
[license-href]: https://npmjs.com/package/nuxt-custom-elements

[npm-version-latest-src]: https://img.shields.io/npm/v/nuxt-custom-elements/latest.svg?
[npm-version-latest-href]: https://npmjs.com/package/nuxt-custom-elements/v/latest

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-custom-elements.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-custom-elements

