<template>
  <div>
    <client-only>
      <script type="text/javascript">
        <!-- Used in example/custom-element/utils/router.js:22 -->
        window.CUSTOM_ELEMENT_ROUTER_BASE = '{{ base }}';
      </script>
      <custom-element-app-i18n
        class="application"
      />
      <custom-element-app-abstract
        class="application"
      >
        <script
          type="application/json"
        >
          {{ data }}
        </script>
      </custom-element-app-abstract>
      <custom-element-app-hash
        class="application"
      >
        <script
          type="application/json"
        >
          {{ data }}
        </script>
      </custom-element-app-hash>
      <custom-element-app-example
        class="application"
      >
        <div style="display: flex; align-items: center; justify-content: center; width: 100%; font-family: sans-serif; font-size: 30px; font-weight: 700;">
          Custom Content
        </div>
      </custom-element-app-example>
    </client-only>
  </div>
</template>

<script>

import Vue from 'vue';

Vue.config.ignoredElements = [
  'custom-element-app-abstract',
  'custom-element-app-hash',
  'custom-element-app-i18n',
  'custom-element-app-example'
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
    this.$registerCustomElementsEntry('component-app-example');
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
