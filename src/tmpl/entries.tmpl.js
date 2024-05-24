import { kebabCase } from 'change-case';

export default ({ entries }) => {
  entries = entries.map(entry => ({
    ...entry,
    key: kebabCase(entry.name),
    filename: `${kebabCase(entry.name)}.client.js`
  }));
  return `
const entries = new Map();

  ${getDefinitions(entries)}

export default entries;
`;
};

function getDefinitions(entries) {
  return entries.map(entry => {
    return `entries.set('${entry.name.toLowerCase()}', async () => {
if (!process.server) {
  await import('#build/nuxt-custom-elements/entries/${entry.filename}')
}
})`;
  });
}
