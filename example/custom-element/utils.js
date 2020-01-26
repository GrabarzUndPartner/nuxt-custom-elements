export function getJSONFromDefaultSlot (defaultSlot) {
  const script = (defaultSlot || []).find(({ tag }) => tag === 'SCRIPT')
  if (script && script.data.attrs.type === 'application/json') {
    return JSON.parse(script.data.domProps.innerHTML)
  } else {
    throw new Error('has no script tag (application/json) in default slot')
  }
}
