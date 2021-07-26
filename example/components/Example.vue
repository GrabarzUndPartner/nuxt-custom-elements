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
    /* Generate Test for `webpack.output.chunkFilename`; test/module.spa.test.js */
    import(/* webpackChunkName: "NamedChunk" */ '@/js/namedChunk');
  }
};
</script>

<style scoped>
.custom-element-example {
  min-width: 300px;
  padding: 10px;
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
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
