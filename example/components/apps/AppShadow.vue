<template>
  <div class="shadow-element">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Shadow Element with native CSS'
    }
  }
}
</script>

<style lang="css">
.shadow-element {
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  background: yellow;
}

.shadow-element span {
  font-weight: bold;
}

.shadow-element::before {
  display: block;
  padding-top: calc(9 / 16 * 100%);
  content: "";
}
</style>
