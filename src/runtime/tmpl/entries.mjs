const entries = new Map();

<%= options.entries.map(entry => {
  return `entries.set('${entry.name.toLowerCase()}', (nuxtApp) => {
  ` + entry.tags.map(({ name ,path}, i) => `nuxtApp.vueApp.component('${name}', defineAsyncComponent(() => import('${path}')));`).join('\n  ') +
`
})`
})

%>

export default entries;
