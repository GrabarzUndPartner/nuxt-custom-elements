<script>
import 'core-js/features/object/assign';
import 'core-js/features/object/entries';
import 'core-js/features/array/from';
import 'core-js/features/promise';
import store from '../utils/store';
import { setup } from '../utils/nuxt';

setup();

export default {

  store: store(),
  props: {
    basePath: {
      type: String,
      default: '/'
    },
    title: {
      type: String,
      default: null
    }
  }

};
</script>
