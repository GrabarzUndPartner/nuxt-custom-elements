import entries from '#build/nuxt-custom-elements/entries.mjs';
import { useNuxtApp } from '#imports';

export function useCustomElements() {
  const nuxtApp = useNuxtApp();
  return {
    registerEntry(name) {
      name = name.toLowerCase();
      if (!entries.has(name)) {
        throw new Error('Entry named "' + name + '" not found');
      }
      entries.get(name)(nuxtApp);
    }
  };
}
