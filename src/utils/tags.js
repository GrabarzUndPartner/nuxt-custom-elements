import { kebabCase } from 'change-case';

function getTagsFromEntry(entry) {
  const tags = [];
  if ('tags' in entry) {
    tags.push(...entry.tags);
  } else {
    tags.push(entry);
  }
  return tags;
}

function getTagHTMLFromEntry(entry) {
  return getTagsFromEntry(entry).map(tag => {
    const options =
      typeof tag.options === 'function' ? tag.options() : tag.options || {};

    let props = [];
    if ('props' in options) {
      if (Array.isArray(options.props) && options.props.length > 0) {
        // array ['prop-a', prop-b]
        props = options.props.map(prop => `${kebabCase(prop)}=""`);
      } else {
        // object {'prop-a': 'val-a', 'prop-b': 'val-a'}
        props = Object.keys(options.props || {}).reduce((result, prop) => {
          const value = options.props[String(prop)];
          if (typeof value !== 'object') {
            result.push(`${kebabCase(prop)}="${value}"`);
          }
          return result;
        }, []);
      }
    }

    const slotContent = tag.slotContent || '';
    return `<${tag.name} ${props.join(' ')}>${slotContent}</${tag.name}>`;
  });
}

export { getTagsFromEntry, getTagHTMLFromEntry };
