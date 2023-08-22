import { defineAsyncComponent, defineCustomElement } from 'vue'

<%= options.tags.filter(function ({ async }) { return !async; }).map(({ path }, i) => `import Component${i} from '${path}';`).join('\n') %>

const defineTags = () => {
  [
<% let i = 0; %><%= options.tags.map(function ({ async, name, path, options }) {

  options = options || {};

  if (typeof options === 'function') {
    options = `(${options.toString().replace(/^options[ ]?\(\) {/, '() => {')})()`
  } else {
    options = JSON.stringify(options)
  }

  let tag;
  if (async) {
    tag = `    ['${name}', defineAsyncComponent(() => { return import('${path}').then(module => (typeof module.default === 'function' ? (new module.default).$options : module.default) ); }), ${options}]`;
  } else {
    tag = `    ['${name}', (typeof Component${i} === 'function' ? (new Component${i}).$options : Component${i}), ${options}]`;
    i++;
  }
  return tag;
 }).join(',\n') %>
  ].forEach(([name, component, options]) => {
    const CustomElement = defineCustomElement(component, options);
    window.customElements.define(name, CustomElement);
  })
};



const setup = () => {
  defineTags();
};

setup();
