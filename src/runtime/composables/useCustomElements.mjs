import { registerEntry } from '#build/nuxt-custom-elements/entries.mjs';

export function useCustomElements() {
  return { registerEntry };
}
