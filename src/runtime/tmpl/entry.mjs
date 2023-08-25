import { defineAsyncComponent, defineCustomElement, h, createApp, getCurrentInstance } from 'vue';
import { createWebComponent } from 'vue-web-component-wrapper';

<%= options.tags.filter(function ({ async }) { return !async; }).map(({ path }, i) => `import Component${i} from '${path}';`).join('\n') %>

const defineTags = () => {
  [
<%  let i = 0; %><%= options.tags.map(function ({ async, name, path, options, appContext, css }) {

  options = options || {};

  if (typeof options === 'function') {
    options = `(${options.toString().replace(/^options[ ]?\(\) {/, '() => {')})()`
  } else {
    options = JSON.stringify(options)
  }

  if (typeof appContext === 'function') {
    appContext = `(${appContext.toString().replace(/^appContext[ ]?\(([^\(\)]+)\) {/, '($1) => {')})`
  } else {
    appContext = JSON.stringify(appContext)
  }

  let tag;
  if (async) {
    tag = `    ['${name}', defineAsyncComponent(() => { return import('${path}').then(module => (typeof module.default === 'function' ? (new module.default).$options : module.default) ); }), ${options}, ${appContext}, '${css}']`;
  } else {
    tag = `    ['${name}', (typeof Component${i} === 'function' ? (new Component${i}).$options : Component${i}), ${options}, ${appContext}, '${css}']`;
    i++;
  }
  return tag;
 }).join(',\n') %>
  ].forEach(([name, component, options, appContext, css]) => {
    createWebComponent({
      rootComponent: component,
      elementName: name,
      plugins: appContext,
      cssFrameworkStyles: css,
      VueDefineCustomElement: (component) => defineCustomElement(component, options),
      h,
      createApp,
      getCurrentInstance
    });

  })
};



const setup = () => {
  defineTags();
};

setup();
