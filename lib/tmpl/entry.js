import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';

<% if (options.publicPathOverride) { %>
__webpack_public_path__ = <%= options.publicPathOverride %>;
<% } %>

<% if (options.modernPolyfill || !options.modern) { %>
import '@ungap/custom-elements'; // For cross-browser compatibility https://github.com/ungap/custom-elements.
<% } %>

<% options.tags.filter(function ({ async }) { return !async; }).forEach(function ({ path }, i) { %><%= `import Component${i} from '${path}';\n` %><% }); %>

Vue.use(VueCustomElement);

<% options.tags.forEach(function ({ async, name, path, options }, i) {

if (async) {

  %><%= `Vue.customElement('${name}', () => { return import('${path}').then(module => (typeof module.default === 'function' ? (new module.default).$options : module.default) ); }, ${JSON.stringify(options)});\n` %><%

} else {

  %><%= `Vue.customElement('${name}', (typeof Component${i} === 'function' ? (new Component${i}).$options : Component${i}) , ${JSON.stringify(options)});\n` %><%

}

}); %>

<% if (process.env.NODE_ENV === 'production') { %>
// Create missing NuxtLink as RouterLink.
Vue.component('NuxtLink', {
  extends: Vue.component('RouterLink')
})
<% } %>

