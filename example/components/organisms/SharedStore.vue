<template>
  <div class="organism-shared-store">
    <p>
      Store Value: {{ storeValue }} -
      <button @click="onClick">
        Change Value
      </button>
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    storeValue () {
      return this.$store.getters['base/value']
    }
  },
  methods: {
    onClick () {
      this.$store.dispatch('base/setValue', !this.storeValue)
    }
  }
}
</script>

<style lang="postcss">
.organism-shared-store {
  /* empty */
}
</style>
