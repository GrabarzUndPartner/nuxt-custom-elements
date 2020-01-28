<template>
  <div class="view-test-1">
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
        headline: 'Test 1 View',
        subline: null
      }
    }
  }
}
</script>

<style lang="postcss">
.view-test-1 {
  /* empty */
}
</style>
