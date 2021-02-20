<template>
  <a
    v-if="isExternal"
    :href="url"
    :target="target || '_blank'"
    rel="noopener"
    :title="title"
    @click="click"
  >
    <slot>{{ title }}</slot>
  </a>
  <router-link
    v-else-if="!isExternal"
    :to="url"
    :title="title"
    @click="click"
  >
    <slot>{{ title }}</slot>
  </router-link>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: false,
      default: 'http://example.com'
    },
    title: {
      type: String,
      required: false,
      default: null
    },
    click: {
      type: Function,
      default () {}
    },
    target: {
      type: String,
      required: false,
      default: '_blank'
    }
  },

  computed: {
    isExternal () {
      return /^(http(s)?|ftp):\/\//.test(this.url) || this.url.startsWith('#');
    }
  }
};
</script>
