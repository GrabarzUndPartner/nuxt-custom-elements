<template>
  <div>
    <transition name="router-view-change">
      <keep-alive>
        <router-view v-if="$router" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CustomElementRouterView'
}
</script>

<style lang="postcss" scoped>
div {
  position: relative;
}

.router-view-change-enter-active,
.router-view-change-leave-active {
  transition: opacity 0s 0.15s linear;
}

.router-view-change-enter,
.router-view-change-leave-to {
  position: absolute;
  width: 100%;
  opacity: 0;
  transition: opacity 0.15s 0.15s linear;
}
</style>
