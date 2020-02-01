<template>
  <div class="view-1">
    <atom-headline
      v-bind="headline"
      style-type="view"
    />
  </div>
</template>

<script>

import AtomHeadline from '@/components/atoms/Headline'

export default {
  components: { AtomHeadline },
  data () {
    return {
      headline: {
        overline: null,
        headline: 'View 1',
        subline: null
      }
    }
  }
}
</script>

<style lang="postcss">
.view-1 {
  /* empty */
}
</style>
