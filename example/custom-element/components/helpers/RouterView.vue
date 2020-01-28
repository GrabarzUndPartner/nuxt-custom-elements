<template>
  <transition>
    <keep-alive>
      <router-view v-if="$router" />
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'CustomElementRouterView'
}
</script>
