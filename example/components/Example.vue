<template>
  <div class="custom-element-example">
    <div class="title">
      {{ exampleTitle }}
    </div>
    <div class="content">
      <slot>Default Content</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    exampleTitle () {
      return this.title || 'Default Title';
    }
  },
  mounted () {
    import(/* webpackChunkName: "NamedChunk" */ '@/js/namedChunk');
  }
};
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
  min-width: 300px;
  padding: 10px;
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
  border-radius: 4px;
}

.title {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}

.title,
.content {
  padding: 5px;
  color: white;
  background: #3b8070;
}

.content {
  line-height: 1.6;
}

.content a {
  margin-top: 10px;
  color: currentColor;
}
</style>
