export default ({ entries }) => `
const entries = new Map();

${getDefinitions(entries)}

export default entries;
`;

function getDefinitions(entries) {
  return entries.map(entry => {
    return (
      `entries.set('${entry.name.toLowerCase()}', (nuxtApp) => {
  ` +
      entry.tags
        .map(
          ({ name, path }) =>
            `nuxtApp.vueApp.component('${name}', defineAsyncComponent(() => import('${path}')));`
        )
        .join('\n  ') +
      `
})`
    );
  });
}
