<template>
  <div>
    <client-only>
      <script type="text/javascript">
        <!-- Used in example/custom-element/utils/router.js:22 -->
        window.CUSTOM_ELEMENT_ROUTER_BASE = '{{ base }}';
      </script>
      <custom-element-app-history
        class="application"
      >
        <script
          type="application/json"
          v-text="data"
        />
        <!-- eslint-disable-next-line vue/html-indent -->
      </custom-element-app-history>
    </client-only>
    <atom-github-corner />
  </div>
</template>

<script>

import Vue from 'vue'
import AtomGithubCorner from '@/components/atoms/GithubCorner'

Vue.config.ignoredElements = [
  'custom-element-app-history'
]

export default {
  layout: 'blank',

  components: {
    AtomGithubCorner
  },

  data () {
    return {
      base: 'history', // router base
      data: {
        script: 'tag'
      }
    }
  },
  created () {
    this.$registerCustomElementsEntry('component-app-history')
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
