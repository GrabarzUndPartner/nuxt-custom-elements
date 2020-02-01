<script>
import CustomElementRouterView from '../components/helpers/RouterView'
import { getRoutesFromViews } from '../utils/router'
import store from '../utils/store'
import { setup } from '../utils/nuxt'

setup()

export default {

  components: { CustomElementRouterView },
  store: store(),
  props: {
    basePath: {
      type: String,
      default () {
        return '/'
      }
    },
    mode: {
      type: String,
      default () {
        return 'history'
      }
    }
  },

  data () {
    return {
      views: [
        'index'
      ]
    }
  },

  created () {
    if (this.$router) {
      this.$router.base = this.basePath
      this.$router.history.base = this.basePath
      this.$router.addRoutes(getRoutesFromViews(this.views))
    }
  }

}
</script>
