<template>
  <div class="view-index">
    <atom-headline v-bind="headline" />
  </div>
</template>

<script>

import AtomHeadline from '@/components/atoms/Headline'

export default {
  components: { AtomHeadline },
  props: {
    basePath: {
      type: String,
      default () {
        return '/'
      }
    }
  },
  data () {
    return {
      headline: {
        overline: null,
        headline: 'Custom-Element Example',
        subline: null
      }
    }
  }
}
</script>

<style lang="postcss">
.view-index {
  /* empty */
}
</style>
