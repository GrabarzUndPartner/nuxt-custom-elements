import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';

<% options.tags.filter(function ({ async }) { return !async; }).forEach(function ({ path }, i) { %><%= `import Component${i} from '${path}';\n` %><% }); %>

Vue.use(VueCustomElement);

async function polyfill () {
<% if (options.polyfill) { %>
  if (!(('customElements' in window) || ('registerElement' in document))) {
    return await import('document-register-element/build/document-register-element'); // For cross-browser compatibility (IE9+) use Custom Elements polyfill.
  } else {
    return;
  }
<% } else { %>
  return;
<% } %>
}

polyfill().then(() => {

<% options.tags.forEach(function ({ async, name, path, options }, i) {

  if (async) {

    %><%= `  Vue.customElement('${name}', () => { return import('${path}').then(module => module.default); }, ${JSON.stringify(options)});\n` %><%

  } else {

    %><%= `  Vue.customElement('${name}', Component${i}, ${JSON.stringify(options)});\n` %><%

  }

  }); %>

<% if (process.env.NODE_ENV === 'production') { %>
  // Create missing NuxtLink as RouterLink.
  Vue.component('NuxtLink', {
    extends: Vue.component('RouterLink')
  })
  <% } %>

});
