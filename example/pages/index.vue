<template>
  <div>
    <client-only>
      <custom-element-app-abstract
        :base-path="basePath"
        class="application"
      >
        <script
          type="application/json"
          v-text="data"
        />
        <!-- eslint-disable-next-line vue/html-indent -->
      </custom-element-app-abstract>
      <custom-element-app-hash
        :base-path="basePath"
        class="application"
      >
        <script
          type="application/json"
          v-text="data"
        />
        <!-- eslint-disable-next-line vue/html-indent -->
      </custom-element-app-hash>
    </client-only>
  </div>
</template>

<script>

import Vue from 'vue'

Vue.config.ignoredElements = [
  'custom-element-app-abstract',
  'custom-element-app-hash'
]

export default {
  layout: 'blank',

  data () {
    return {
      basePath: '/', // router base
      data: {
        script: 'tag'
      }
    }
  },
  created () {
    this.$registerCustomElementsEntry('component-app-abstract')
    this.$registerCustomElementsEntry('component-app-hash')
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
