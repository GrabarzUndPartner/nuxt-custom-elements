import Vue from 'vue'

const entryNamings = <%= JSON.stringify(options.entryMap) %>;
export default function () {
  Vue.prototype.$registerCustomElementsEntry = (name) => {
    if (process.client) {
      name = entryNamings[name] || name;
      if (name) {
        return import('<%= options.entriesDir %>/' + name)
      } else {
        throw new Error(`Entry named "${name}" not found`)
      }
    }
  }
}
