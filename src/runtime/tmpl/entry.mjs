import { defineAsyncComponent, defineCustomElement } from 'vue'

<%= options.tags.filter(function ({ async }) { return !async; }).map(({ path }, i) => `import Component${i} from '${path}';`).join('\n') %>

const defineTags = () => {
  const elements = [
<% let i = 0; %><%= options.tags.map(function ({ async, name, path }) {
  let tag;
  if (async) {
    tag = `    ['${name}', defineAsyncComponent(() => { return import('${path}').then(module => (typeof module.default === 'function' ? (new module.default).$options : module.default) ); })]`;
  } else {
    tag = `    ['${name}', (typeof Component${i} === 'function' ? (new Component${i}).$options : Component${i})]`;
    i++;
  }
  return tag;
 }).join(',\n') %>
  ].forEach(([name, component]) => {
    const CustomElement = defineCustomElement(component);
    window.customElements.define(name, CustomElement);
  })
};

const setup = () => {
  defineTags();
};

setup();