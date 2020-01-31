<template>
  <div class="custom-element-app-abstract">
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

export default {
  name: 'AppTwo',

  components: { OrganismViewHeader: () => import('@/components/organisms/ViewHeader') },
  extends: AppExtend,

  router: createRouter('abstract'),

  data () {
    return {
      views: [
        'index', 'view-1', 'view-2', 'view-3'
      ]
    }
  },

  computed: {
    content () {
      return {
        header: {
          title: 'App with router mode "abstract"',
          navigation: [
            { title: 'Home', url: '/' },
            { title: 'View 1', url: '/view-1' },
            { title: 'View 2', url: '/view-2' },
            { title: 'View 3', url: '/view-3' }
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
.custom-element-app-abstract {
  padding: 15px;
  background: #eee;
  border: solid #eee 1px;

  & .header,
  & .router-view {
    background: #fff;
    border: solid #eee 1px;
  }

  & .router-view {
    min-height: 160px;
    padding: 0 15px;
    margin-top: 20px;
  }
}
</style>
