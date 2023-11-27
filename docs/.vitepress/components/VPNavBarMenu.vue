
<script setup>
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import VPNavBarMenuLink from 'vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue'
import VPNavBarMenuGroup from 'vitepress/dist/client/theme-default/components/VPNavBarMenuGroup.vue'


const {theme, page} = useData()

import { computed } from 'vue';

computed(() => page.value.relativePath)
</script>

<template>
  <nav v-if="theme.nav" aria-labelledby="main-nav-aria-label" class="VPNavBarMenu">
    <span id="main-nav-aria-label" class="visually-hidden">Main Navigation</span>
    <template v-for="item in theme.nav" :key="item.text">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>
  </nav>
</template>


<style scoped>
/* stylelint-disable selector-class-pattern */
.VPNavBarMenu {
  display: none;
}

@media (width >= 768px) {
  .VPNavBarMenu {
    display: flex;
  }
}
</style>
