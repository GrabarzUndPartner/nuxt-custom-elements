import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';

<% if (!options.modern) { %>
import 'document-register-element/build/document-register-element'; // For cross-browser compatibility (IE9+) use Custom Elements polyfill.
<% } %>


<% options.tags.filter(function ({ async }) { return !async; }).forEach(function ({ path }, i) { %><%= `import Component${i} from '${path}';\n` %><% }); %>

Vue.use(VueCustomElement);

<% options.tags.forEach(function ({ async, name, path, options }, i) {

if (async) {

  %><%= `  Vue.customElement('${name}', () => { return import('${path}').then(module => (typeof module.default === 'function' ? (new module.default).$options : module.default) ); }, ${JSON.stringify(options)});\n` %><%

} else {

  %><%= `  Vue.customElement('${name}', (typeof Component${i} === 'function' ? (new Component${i}).$options : Component${i}) , ${JSON.stringify(options)});\n` %><%

}

}); %>

<% if (process.env.NODE_ENV === 'production') { %>
// Create missing NuxtLink as RouterLink.
Vue.component('NuxtLink', {
  extends: Vue.component('RouterLink')
})
<% } %>
