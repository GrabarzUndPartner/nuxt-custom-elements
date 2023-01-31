<template>
  <div class="custom-element-example">
    <div class="title">
      {{ title }}
    </div>
    <div class="content">
      <slot>Default Content</slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Default Title'
  }
});

document.body.classList.add('custom-element-example-ready');

</script>

<style lang="postcss" scoped>
/* lato-regular - latin */
@font-face {
  font-family: Lato;
  font-style: normal;
  font-weight: 400;
  src:
    url("~assets/fonts/lato-v22-latin/lato-v22-latin-regular.woff2") format("woff2"),
    url("~assets/fonts/lato-v22-latin/lato-v22-latin-regular.woff") format("woff");
}

/* lato-700 - latin */
@font-face {
  font-family: Lato;
  font-style: normal;
  font-weight: 700;
  src:
    url("~assets/fonts/lato-v22-latin/lato-v22-latin-700.woff2") format("woff2"),
    url("~assets/fonts/lato-v22-latin/lato-v22-latin-700.woff") format("woff");
}

.custom-element-example {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 300px;
  padding: 8px;
  font-family:
    Lato,
    "Source Sans Pro",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif;
  font-size: 16px;
  color: #35495e;
  text-align: center;
  background: #35495e;
  border-radius: 8px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}

.title,
.content {
  padding: 8px;
  color: white;
  background: #3b8070;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.content a,
:deep(.content a) {
  color: currentColor;
}
</style>
