
import { defineCustomElement } from 'vue'

<% options.tags.filter(function ({ async }) { return !async; }).forEach(function ({ path }, i) { %><%= `import Component${i} from '${path}';\n` %><% }); %>

const defineTags = () => {
  let Component, CustomElement;
<% let i = 0; options.tags.forEach(function ({ async, name, path }) {
  if (async) {
    %><%= `  Component = () => { return import('${path}').then(module => (typeof module.default === 'function' ? (new module.default).$options : module.default) ); };\n` %><%
  } else {
    %><%= `  Component = (typeof Component${i} === 'function' ? (new Component${i}).$options : Component${i});\n` %><%
    i++;
  }
%><%= `
  CustomElement = defineCustomElement(Component);
  window.customElements.define('${name}', CustomElement);`%>
<% }); %>
};

const setup = () => {
  defineTags();
};

setup();
