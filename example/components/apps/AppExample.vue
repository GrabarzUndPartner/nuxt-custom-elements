<template>
  <div class="custom-element-app-example">
    <organism-view-header
      v-bind="header"
      class="header"
    />
    <div class="content">
      <slot>Slot Content</slot>
    </div>
  </div>
</template>

<script>

export default {

  components: { OrganismViewHeader: () => import('@/components/organisms/ViewHeader') },

  props: {
    title: {
      type: String,
      default: null
    }
  },

  computed: {
    content () {
      return {
        header: {
          title: this.title || 'App Example with Attribute and Slot',
          navigation: []
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
.custom-element-app-example {
  padding: 15px;
  background: #eee;
  border: solid #eee 1px;

  & .header,
  & .content {
    background: #fff;
    border: solid #eee 1px;
  }

  & .content {
    display: flex;
    min-height: 160px;
    padding: 15px;
    margin-top: 20px;

    & > div,
    & >>> div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-family: sans-serif;
      font-size: 30px;
      font-weight: 700;
    }
  }
}
</style>
