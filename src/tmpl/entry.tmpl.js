export default options => {
  const { tags, imports } = prepareTags(options.tags);

  return `

import { defineAsyncComponent, defineCustomElement, h, createApp, getCurrentInstance } from 'vue';
import { createWebComponent } from 'vue-web-component-wrapper';

${Object.entries(imports)
  .map(([name, path]) => `import ${name} from '${path}';`)
  .join('\n')}


const setup = () => {
  [${tags.join(
    ',\n'
  )}].forEach(([name, component, options, appContext, css]) => {
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

setup();

`;
};
// <%

// ;

// %>

// <%=  %>

// const defineTags = () => {
//   [<%= tags.join(',\n') %>].forEach(([name, component, options, appContext, css]) => {
//     createWebComponent({
//       rootComponent: component,
//       elementName: name,
//       plugins: appContext,
//       cssFrameworkStyles: css,
//       VueDefineCustomElement: (component) => defineCustomElement(component, options),
//       h,
//       createApp,
//       getCurrentInstance
//     });

//   })
// };

// const setup = () => {
//   defineTags();
// };

// setup();

function prepareTags(tags) {
  const imports = {};
  let eagerCounter = 0;

  tags
    .filter(function ({ async }) {
      return !async;
    })
    .forEach(({ path }, i) => (imports[`Component${i}`] = path));

  return {
    imports,
    tags: tags.map(function (
      { async, name, path, options, appContext, css },
      index
    ) {
      options = options || {};

      if (typeof options === 'function') {
        options = `(${options
          .toString()
          .replace(/^options[ ]?\(\) {/, '() => {')})()`;
      } else {
        options = JSON.stringify(options);
      }

      let context;
      if (typeof appContext === 'function') {
        context = `(${appContext
          .toString()
          .replace(/^appContext[ ]?\(([^\\(\\)]+)\) {/, '($1) => {')})`;
      } else if (typeof appContext === 'string') {
        imports[`appContext${index}`] = appContext;
        context = `appContext${index}`;
      }

      css = css ? `${JSON.stringify(css)}` : undefined;

      let tag;
      if (async) {
        tag = `    ['${name}', defineAsyncComponent(() => { return import('${path}').then(module => (typeof module.default === 'function' ? (new module.default).$options : module.default) ); }), ${options}, ${context}, ${css}]`;
      } else {
        tag = `    ['${name}', (typeof Component${eagerCounter} === 'function' ? (new Component${eagerCounter}).$options : Component${eagerCounter}), ${options}, ${context}, ${css}]`;
        eagerCounter++;
      }

      return tag;
    })
  };
}
