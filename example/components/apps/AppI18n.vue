<template>
  <div class="custom-element-app-i18n">
    <organism-view-header
      v-bind="header"
      class="header"
    />
    <div>
      <span>{{ $t('message').hello }}</span>
    </div>
  </div>
</template>

<script>

import AppExtend from '@/custom-element/extends/App';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  de: {
    message: {
      hello: 'hallo welt'
    }
  },
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
};

const i18n = new VueI18n({
  locale: 'en',
  messages
});

export default {

  components: { OrganismViewHeader: () => import('@/components/organisms/ViewHeader') },

  extends: AppExtend,

  i18n,

  computed: {
    content () {
      return {
        header: {
          title: 'App with i18n',
          linksTitle: 'Locales:',
          navigation: this.$i18n.availableLocales.map((locale) => {
            return {
              class: locale === this.$i18n.locale ? 'router-link-exact-active router-link-active' : '',
              title: locale,
              url: `#${locale}`,
              click: (e) => { e.preventDefault(); this.$i18n.locale = locale; return false; }
            };
          })
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
.custom-element-app-i18n {
  padding: 15px;
  background: #eee;
  border: solid #eee 1px;

  & .header,
  & > div:last-child {
    background: #fff;
    border: solid #eee 1px;
  }

  & > div:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 160px;
    padding: 0 15px;
    margin-top: 20px;

    & > span {
      font-family: sans-serif;
      font-size: 40px;
      font-weight: bold;
    }
  }
}
</style>
