<template>
  <div>
    <client-only>
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
      <custom-element-app-abstract
        :base-path="basePath"
        class="application"
      >
        <script
          type="application/json"
          v-text="data"
        />d
        <!-- eslint-disable-next-line vue/html-indent -->
      </custom-element-app-abstract>
    </client-only>
  </div>
</template>

<script>

import Vue from 'vue'

Vue.config.ignoredElements = [
  'custom-element-app-one',
  'custom-element-app-two'
]

export default {
  layout: 'blank',

  data () {
    return {
      basePath: '/test', // router base
      data: {
        test: 2000
      }
    }
  },
  created () {
    this.$registerCustomElementsEntry('component-app-bundle')
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
