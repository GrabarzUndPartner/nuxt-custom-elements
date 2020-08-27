import { resolve } from 'upath'

module.exports = {
  analyzer: false,
  modern: true,
  polyfill: true,
  staticPath: resolve(__dirname, '../example/custom-element/static'),
  entries: [
    {
      name: 'ComponentAppAbstract',
      tags: [
        {
          async: false,
          name: 'CustomElementAppAbstract',
          path: '@/components/apps/AppAbstract',
          options: {
            props: {
              base: './'
            }
          }
        }
      ]
    },
    {
      name: 'ComponentAppHash',
      tags: [
        {
          async: false,
          name: 'CustomElementAppHash',
          path: '@/components/apps/AppHash',
          options: {
            props: {
              base: './'
            }
          }
        }
      ]
    },
    {
      name: 'ComponentAppHistory',
      tags: [
        {
          async: false,
          name: 'CustomElementAppHistory',
          path: '@/components/apps/AppHistory',
          options: {
            props: {
              base: './'
            }
          }
        }
      ]
    },
    {
      name: 'ComponentAppBundle',
      tags: [
        {
          async: true,
          name: 'CustomElementAppAbstract',
          path: '@/components/apps/AppAbstract',
          options: {
            props: {
              base: './'
            }
          }
        },
        {
          async: true,
          name: 'CustomElementAppHash',
          path: '@/components/apps/AppHash',
          options: {
            props: {
              base: './'
            }
          }
        },
        {
          async: true,
          name: 'CustomElementAppHistory',
          path: '@/components/apps/AppHistory',
          options: {
            props: {
              base: './'
            }
          }
        }
      ]
    }
  ]
}
