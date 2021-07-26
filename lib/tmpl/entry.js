import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';

<% if (options.webpackPublicPathInject) { %>
const publicPath = (<%= options.webpackPublicPathInject %>)();
if (publicPath) {
  __webpack_public_path__ = publicPath;
}
<% } %>

<% if (options.modernPolyfill || !options.modern) { %>
import '@ungap/custom-elements'; // For cross-browser compatibility https://github.com/ungap/custom-elements.
<% } %>

<% options.tags.filter(function ({ async }) { return !async; }).forEach(function ({ path }, i) { %><%= `import Component${i} from '${path}';\n` %><% }); %>

// import css style-tag from component for shadow css
<% options.tags.filter(function ({ async }) { return !async; }).forEach(function ({ path }, i) { %><%= `import ComponentShadowCss${i} from '!raw-loader!vue-loader!${path}?vue&type=style&index=0&lang=css';\n` %><% }); %>

Vue.use(VueCustomElement);
<%= 'let options;' %>

<% options.tags.forEach(function ({ async, name, path, options }, i) {
  if (typeof options === 'function') {
    options = `(${options.toString().replace(/^options[ ]?\(\) {/, '() => {')})()`
  } else {
    options = JSON.stringify(options)
  }

  %><%= `options = ${options}; \n` %><%

  // import css style-tag from component for shadow css
  %><%= `if (options.shadow && !options.shadowCss && ComponentShadowCss${i}) { options.shadowCss = ComponentShadowCss${i}; }; \n` %><%
  if (async) {
    %><%= `Vue.customElement('${name}', () => { return import('${path}').then(module => (typeof module.default === 'function' ? (new module.default).$options : module.default) ); }, ${options});\n` %><%

  } else {

    %><%= `Vue.customElement('${name}', (typeof Component${i} === 'function' ? (new Component${i}).$options : Component${i}), ${options});\n` %><%

  }

}); %>

<% if (process.env.NODE_ENV === 'production') { %>
// Create missing NuxtLink as RouterLink.
Vue.component('NuxtLink', {
  extends: Vue.component('RouterLink')
});
<% } %>

