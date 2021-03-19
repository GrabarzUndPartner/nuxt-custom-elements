---
title: Plugins
description: ''
position: 14
category: 'Guide'
---

## $registerCustomElementsEntry

`$registerCustomElementsEntry` is used to include the defined entries during development. 

This allows you to include the components without a separate import and allows you to test as a custom-elements integration.

The registration is called in `created` or `mounted`. After registration it is possible to call the custom-element tags in the template. Only the tags that have been added to the entry are available.

Place the relevant tags in a `client-only` tag, this is important so that the tag is not resolved in `SSR`.  
Alternatively, [SSR can be disabled](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-ssr) if possible.

<alert>Remember to ignore the specified tags with `Vue.config.ignoredElements` in Vue. For the local Vue instance the respective tag is unknown.</alert>

### Arguments

#### Name
- Type: `String`

Name of custom-element Entry.

The name can be specified in `PascalCase`or `ParamCase`.

e.g. `CustomElementExample` or `custom-element-example`.

[Learn more about Entry.](/options#entry)

### Example

```vue
<template>
  <div>
    <client-only>
      <CustomElementExample />
      <!-- or -->
      <custom-element-example/>
    </client-only>
  </div>
</template>

<script>
import Vue from 'vue';

Vue.config.ignoredElements = [
  'CustomElementExample',
  'custom-element-example'
];

export default {
  created () {
    this.$registerCustomElementsEntry('Example')
    // or
    this.$registerCustomElementsEntry('example')
  }
}
</script>
```
