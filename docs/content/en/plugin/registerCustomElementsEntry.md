---
title: $registerCustomElementsEntry
description: ''
position: 31
category: 'Plugin'
---

Registers an entry for testing as a custom element during development.

<alert>If `SSR` is active, integration must be implemented in a `client-only` tag. ([See Example](/plugin/registerCustomElementsEntry#example))</alert>

[Learn more](/plugin/registerCustomElementsEntry) about the use in development.

## Arguments

### Name
- Type: `String`

Name of Custom Element Entry.


The name can be specified in `PascalCase`or `ParamCase`.

e.g. `ComponentAppAbstract` or `component-app-abstract`.

## Example

```vue
<template>
  <div>
    <client-only>
      <ComponentAppAbstract />
      <!-- or -->
      <component-app-abstract />
    </client-only>
  </div>
</template>

<script>
import Vue from 'vue';

Vue.config.ignoredElements = [
  'ComponentAppAbstract',
  'component-app-abstract'
];

export default {
  mounted() {
    this.$registerCustomElementsEntry('ComponentAppAbstract')
    // or
    this.$registerCustomElementsEntry('component-app-abstract')
  }
}
</script>
```
