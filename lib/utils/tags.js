import { paramCase } from 'change-case'

export function getTagsFromEntry (entry) {
  const tags = []
  if ('tags' in entry) {
    tags.push(...entry.tags)
  } else {
    tags.push(entry)
  }
  return tags
}

export function getTagHTMLFromEntry (entry) {
  return getTagsFromEntry(entry).map((tag) => {
    const options = tag.options || {}

    let props
    if ('props' in options) {
      if (Array.isArray(options.props) && options.props.length > 0) {
        // array ['prop-a', prop-b]
        props = options.props.map(prop => `${paramCase(prop)}=""`)
      } else {
        // object {'prop-a': 'val-a', 'prop-b': 'val-a'}
        props = (Object.keys(options.props || {})).reduce((result, prop) => {
          const value = options.props[String(prop)]
          if (typeof value !== 'object') {
            result.push(`${paramCase(prop)}="${value}"`)
          }
          return result
        }, [])
      }
    }

    return `<${tag.name} ${props.join(' ')}></${tag.name}>`
  })
}

export function getTagHTMLFromEntries (entries) {
  const tags = entries.reduce((result, entry) => {
    result.push(...getTagsFromEntry(entry))
    return result
  }, [])
  return tags.map((tag) => {
    const options = tag.options || {}
    const props = (Object.keys(options.props || {})).reduce((result, prop) => {
      const value = options.props[String(prop)]
      if (value) {
        result.push(`${paramCase(prop)}="${value}"`)
      }
      return result
    }, [
      ''
    ])
    return `<${tag.name}${props.join(' ')}></${tag.name}>`
  })
}
