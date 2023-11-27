export default {
  versions: [[{ version: 2, default: true }, { version: 1 }]],
  nav: [
    {
      text: 'Version',
      items: [
        { text: 'v2', link: '/' },
        { text: 'v1', link: '/v1/' }
      ]
    }
  ],

  sidebar: {
    '/v1/': [
      {
        text: 'Home',
        link: '/v1/'
      },
      {
        text: 'Guide',
        collapsed: false,
        items: [
          { text: 'Setup', link: '/v1/guide/setup' },
          { text: 'Options', link: '/v1/guide/options' },
          { text: 'Usage', link: '/v1/guide/usage' }
        ]
      },
      {
        text: 'Plugins',
        link: '/v1/plugins'
      }
    ],
    '/': {
      items: [
        {
          text: 'Home',
          link: '/'
        },
        {
          text: 'Guide',
          collapsed: false,
          items: [
            { text: 'Setup', link: '/guide/setup' },
            { text: 'Options', link: '/guide/options' },
            { text: 'Usage', link: '/guide/usage' }
          ]
        },
        {
          text: 'Composables',
          collapsed: false,
          items: [
            { text: 'useCustomElements', link: '/composable/useCustomElements' }
          ]
        },
        {
          text: 'Plugins',
          link: '/plugins'
        },
        {
          text: 'Migration',
          collapsed: true,
          items: [
            { text: 'v1.8.x to v1.9.x', link: '/migration/v1-9-x' },
            { text: 'v2', link: '/migration/v2' }
          ]
        }
      ]
    }
  }
};