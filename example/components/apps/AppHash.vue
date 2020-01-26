<template>
  <div class="custom-element-app-hash">
    <organism-view-header
      v-bind="header"
      class="header"
    />
    <custom-element-router-view class="router-view" />
  </div>
</template>

<script>

import AppExtend from '@/custom-element/extends/App'
import { createRouter } from '@/custom-element/utils/router'

// import OrganismViewHeader from '@/components/organisms/ViewHeader'

export default {
  name: 'AppOne',

  components: { OrganismViewHeader: () => import('@/components/organisms/ViewHeader') },
  extends: AppExtend,

  router: createRouter('hash'),

  data () {
    return {
      views: [
        'index', 'test-1'
      ]
    }
  },

  computed: {
    content () {
      return {
        header: {
          title: 'App with router mode "hash"',
          navigation: [
            { title: 'Home', url: '/' },
            { title: 'Test 1', url: '/test-1' }
          ]
        }
      }
    },
    header () {
      return this.content.header
    }
  },

  mounted () {
    // try {
    //   const externalData = getJSONFromDefaultSlot(this.$slots.default)
    // } catch (err) {
    //   throw err
    // }
  }

}

</script>

<style lang="postcss">
.custom-element-app-hash {
  padding: 15px;
  background: #eee;
  border: solid #eee 1px;

  & .header,
  & .router-view {
    background: #fff;
    border: solid #eee 1px;
  }

  & .router-view {
    margin-top: 20px;
  }
}
</style>
