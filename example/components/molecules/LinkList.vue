<template>
  <ul
    class="molecule-link-list"
    :class="styleClasses"
  >
    <slot>
      <li
        v-for="(item) in list"
        :key="item.title"
      >
        <atom-link-to :url="getUrl(item)">
          {{ item.title }}
        </atom-link-to>
      </li>
    </slot>
  </ul>
</template>

<script>
import AtomLinkTo from '@/components/atoms/LinkTo'

export default {
  components: {
    AtomLinkTo
  },
  props: {
    type: {
      type: String,
      default () {
        return null
      }
    },
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    styleClasses () {
      const classes = {}
      classes[`type--${this.type}`] = this.type
      return classes
    }
  },
  methods: {
    getUrl (item) {
      if ('$i18n' in this) {
        // use when nuxtI18n exists
        this.localePath(item.url)
      } else {
        return item.url
      }
    }
  }
}
</script>

<style lang="postcss">
.molecule-link-list {
  &.type--view-header {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;

    & a {
      display: block;
      padding: 10px 15px;
      font-family: sans-serif;
      color: #333;
      text-decoration: none;

      &.router-link-exact-active.router-link-active {
        font-weight: bold;
      }

      &.router-link-exact-active.router-link-active,
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
