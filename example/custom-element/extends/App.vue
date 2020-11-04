<script>
import 'core-js/features/object/assign'
import 'core-js/features/object/entries'
import 'core-js/features/array/from'
import 'core-js/features/promise'
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
      this.$router.addRoutes(getRoutesFromViews(this.views))
    }
  }

}
</script>
