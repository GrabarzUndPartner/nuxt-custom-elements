<template>
  <div>
    <client-only>
      <custom-element-app-i18n
        class="application"
      />
      <script type="text/javascript">
        <!-- Used in example/custom-element/utils/router.js:22 -->
        window.CUSTOM_ELEMENT_ROUTER_BASE = '{{ base }}';
      </script>
      <custom-element-app-abstract
        class="application"
      >
        <script
          type="application/json"
          v-text="data"
        />
      </custom-element-app-abstract>
      <custom-element-app-hash
        class="application"
      >
        <script
          type="application/json"
          v-text="data"
        />
      </custom-element-app-hash>
    </client-only>
  </div>
</template>

<script>

import Vue from 'vue';

Vue.config.ignoredElements = [
  'custom-element-app-abstract',
  'custom-element-app-hash',
  'custom-element-app-i18n'
];

export default {
  layout: 'blank',

  data () {
    return {
      base: '/', // router base
      data: {
        script: 'tag'
      }
    };
  },
  created () {
    this.$registerCustomElementsEntry('component-app-abstract');
    this.$registerCustomElementsEntry('component-app-hash');
    this.$registerCustomElementsEntry('component-app-i18n');
  }
};
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
