import Vue from 'vue'

const entryNamings = <%= JSON.stringify(options.entryMap) %>;
export default function () {

  const registerEntry = (name) => {
    if (process.client) {
      if (name in entryNamings){
        const filename = entryNamings[name]
        return import('<%= options.entriesDir %>/' + `${filename}.client`)
      } else {
        throw new Error(`Entry named "${name}" not found`)
      }
    } else {
      return Promise.resolve();
    }
  };

  Vue.prototype.$customElements = { registerEntry };

  /**
   * @deprecated
   */
  Vue.prototype.$registerCustomElementsEntry = (name) => {
    console.warn(`Call "$registerCustomElementsEntry" is deprecated, use "$customElements.registerEntry"`);
    return registerEntry(name);
  }
}
