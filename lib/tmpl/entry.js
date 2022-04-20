import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';

<% if (options.polyfill && (options.modernPolyfill || !options.modern)) { %>
import '@ungap/custom-elements'; // For cross-browser compatibility https://github.com/ungap/custom-elements.
<% } %>

<%

options.tags.filter(function ({ async }) { return !async; }).forEach(function ({ path }, i) { %><%= `import Component${i} from '${path}';\n` %><% }); %>

const setup = () => {
  Vue.use(VueCustomElement);
  defineTags();
}

const defineTags = () => {
  let Component;
<% let i = 0; options.tags.forEach(function ({ async, name, path, options }) {
    if (typeof options === 'function') {
      options = `(${options.toString().replace(/^options[ ]?\(\) {/, '() => {')})()`
    } else {
      options = JSON.stringify(options)
    }
  if (async) {
    %><%= `  Component = () => { return import('${path}').then(module => (typeof module.default === 'function' ? (new module.default).$options : module.default) ); };\n` %><%
  } else {
    %><%= `  Component = (typeof Component${i} === 'function' ? (new Component${i}).$options : Component${i});\n` %><%
    i++;
  }

  %><%= `  Vue.customElement('${name}', Component, { ...${options}, ...getTagOptions() });\n` %>

<% }); %>
}

<% if (process.env.NODE_ENV === 'production') { %>
// Create missing NuxtLink as RouterLink.
Vue.component('NuxtLink', {
  extends: Vue.component('RouterLink')
});
<% } %>


const getTagOptions = () => {
<% if (options.shadow && process.env.NODE_ENV !== 'development') { %>  return {
  shadow: true,
  beforeCreateVueInstance (root) {
    const rootNode = root.el.getRootNode();
    if (rootNode instanceof ShadowRoot) {
      root.shadowRoot = rootNode;
    } else {
      root.shadowRoot = document.head;
    }
    return root;
  }
};<% } else { %>  return {};<% } %>
}

setup();
