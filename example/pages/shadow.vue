<template>
  <div>
    <client-only>
      <custom-element-app-shadow-a title="Shadow Element with vue-loader import, without css compiler." />
      <custom-element-app-shadow-b title="Shadow Element with shadowCss option" />
    </client-only>
  </div>
</template>

<script>

import Vue from 'vue'

Vue.config.ignoredElements = [
  'custom-element-app-shadow-a',
  'custom-element-app-shadow-b'
]

export default {
  layout: 'blank',

  created () {
    this.$registerCustomElementsEntry('component-app-shadow')
  }
}
</script>

<style lang="postcss">
.application {
  display: block;
  padding: 20px;

  @media screen and (min-width: 992px) {
    padding: 20px 100px;
  }
}
</style>
