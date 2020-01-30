<template>
  <div class="organisms-view-header">
    <atom-headline
      v-bind="headline"
      tag="div"
      style-type="view-header"
    />
    <nav>
      <span>Views:</span>
      <molecule-link-list
        class="links"
        type="view-header"
        :list="navigation"
      />
    </nav>
  </div>
</template>

<script>
import atomHeadline from '@/components/atoms/Headline'
import MoleculeLinkList from '@/components/molecules/LinkList'
export default {
  components: { atomHeadline, MoleculeLinkList },
  props: {
    title: {
      type: String,
      default () {
        return 'Header Title'
      }
    },
    navigation: {
      type: Array,
      default () {
        return [
          { title: 'Link 1.', url: '#link-1', target: '_self' },
          { title: 'Link 2.', url: '#link-2', target: '_self' },
          { title: 'Link 3.', url: '#link-3', target: '_self' }
        ]
      }
    }
  },
  computed: {
    headline () {
      return {
        overline: null,
        headline: this.title,
        subline: null
      }
    }
  }
}
</script>

<style lang="postcss">
.organisms-view-header {
  & nav {
    display: flex;
    line-height: 1;

    & > span {
      padding: 10px 15px;
      font-family: sans-serif;
      color: #333;
    }
  }
}
</style>
