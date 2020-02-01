<template>
  <div class="view-2">
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
        headline: 'View 2',
        subline: null
      }
    }
  }
}
</script>

<style lang="postcss">
.view-2 {
  /* empty */
}
</style>
