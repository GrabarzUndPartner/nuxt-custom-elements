<template>
  <div class="view-index">
    <atom-headline
      v-bind="headline"
      style-type="view"
    />
    <organism-shared-store />
  </div>
</template>

<script>

import AtomHeadline from '@/components/atoms/Headline'
import OrganismSharedStore from '@/components/organisms/SharedStore'

export default {
  components: { AtomHeadline, OrganismSharedStore },
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
