
import { defineAsyncComponent, defineCustomElement } from 'vue'

<%= options.tags.filter(function ({ async }) { return !async; }).map(({ path }, i) => `import Component${i} from '${path}';`).join('\n') %>

const defineTags = () => {
  const elements = [
<%= options.tags.map(function ({ async, name, path }, i) {
  if (async) {
    return`    ['${name}', defineAsyncComponent(() => { return import('${path}').then(module => (typeof module.default === 'function' ? (new module.default).$options : module.default) ); })]`;
  } else {
    return`    ['${name}', (typeof Component${i} === 'function' ? (new Component${i}).$options : Component${i})]`;
  }
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
