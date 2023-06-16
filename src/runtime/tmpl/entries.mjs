const entryNamings = <%= JSON.stringify(options.entryMap) %>;

export const registerEntry = (name) => {
  if (process.client) {
    if (name in entryNamings){
      const filename = entryNamings[name]
      return import(<%= '`#customElementsEntries/${filename}' + '.client.mjs`' %>);
    } else {
      throw new Error('Entry named "' + name + '" not found');
    }
  } else {
    return Promise.resolve();
  }
};
