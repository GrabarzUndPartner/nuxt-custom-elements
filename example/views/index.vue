<template>
  <div class="view-index">
    <atom-headline
      v-bind="headline"
      style-type="view"
    />
    <img src="@/assets/image.png">
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
  & img {
    height: 32px;
  }
}
</style>
