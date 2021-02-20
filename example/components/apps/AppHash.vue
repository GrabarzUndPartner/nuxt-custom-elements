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

import AppRouterExtend from '@/custom-element/extends/AppRouter';
import { createRouter } from '@/custom-element/utils/router';

export default {

  components: { OrganismViewHeader: () => import('@/components/organisms/ViewHeader') },
  extends: AppRouterExtend,

  router: createRouter('hash'),

  data () {
    return {
      views: [
        'index', 'view-1', 'view-2', 'view-3'
      ]
    };
  },

  computed: {
    content () {
      return {
        header: {
          title: 'App with router mode "hash"',
          linksTitle: 'Views:',
          navigation: [
            { title: 'Home', url: '/' },
            { title: 'View 1', url: '/view-1' },
            { title: 'View 2', url: '/view-2' },
            { title: 'View 3', url: '/view-3' }
          ]
        }
      };
    },

    header () {
      return this.content.header;
    }
  }

};

</script>

<style lang="postcss" scoped>
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
    min-height: 160px;
    padding: 0 15px;
    margin-top: 20px;
  }
}
</style>
