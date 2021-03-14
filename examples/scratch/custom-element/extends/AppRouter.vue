<script>

import CustomElementRouterView from '../components/helpers/RouterView';
import { getRoutesFromViews } from '../utils/router';
import App from './App';

export default {

  components: { CustomElementRouterView },

  extends: App,
  props: {
    mode: {
      type: String,
      default () {
        return 'history';
      }
    }
  },

  data () {
    return {
      views: [
        'index'
      ]
    };
  },

  created () {
    if (this.$router) {
      this.$router.addRoutes(getRoutesFromViews(this.views));
    }
  }

};
</script>
