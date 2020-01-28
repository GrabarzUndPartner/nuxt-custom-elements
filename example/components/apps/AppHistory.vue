<template>
  <div class="custom-element-app-history">
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
  name: 'AppTwo',

  components: { OrganismViewHeader: () => import('@/components/organisms/ViewHeader') },
  extends: AppExtend,

  router: createRouter('history'),

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
          title: 'App with router mode "history"',
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
  }

}

</script>

<style lang="postcss">
.custom-element-app-history {
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
