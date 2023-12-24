---
title: useCustomElements
---

# {{$frontmatter.title}}

::: info
The composable `useCustomElements` is equal to the plugin [`$customElements.registerEntry`](/plugins#customelementsregisterentry)
:::

```js
const { registerEntry } = useCustomElements();
```

## registerEntry

`registerEntry` is used to include the defined entries during development.

This allows you to include the components without a separate import and allows you to test as a custom-elements integration.

Place the relevant tags in a `client-only` tag, this is important so that the tag is not resolved in `SSR`.  
Alternatively, [SSR can be disabled](https://nuxt.com/docs/api/configuration/nuxt-config#ssr) if possible.

### Arguments

#### Name

- Type: `String`

Name of custom-element Entry.

The name can be specified in `PascalCase`or `ParamCase`.

e.g. `CustomElementExample` or `custom-element-example`.

[Learn more about Entry.](/guide/options#entry)

#### Example

```html
<template>
  <client-only>
    <custom-element-example title="Custom Title">
      Custom Slot Content<br />
      <a href="./nuxt-custom-elements/example/">Go to Real Example</a>
    </custom-element-example>
  </client-only>
</template>

<script setup>
import { useCustomElements } from '#imports';

const { registerEntry } = useCustomElements();

registerEntry('example');

</script>
```
