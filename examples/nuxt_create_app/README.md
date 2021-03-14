# Nuxt Create App Example
 
# Steps
* Download yarn
* download create-app
* `yarn create nuxt-app app`
* `cd app`
* `yarn add nuxt-custom-elements`
* add configuration
  ```
    modern: 'client',
    modules: [
      [
        'nuxt-custom-elements', {
          webpackPublicPathInject: () => global.customPublicPath,
          modern: true,
          modernPolyfill: true,
          entries: [
            {
              name: 'ComponentLogo',
              tags: [
                {
                  name: 'ComponentLogo',
                  path: '@/components/Logo',
                  options: {
                  }
                }
              ]
            }
          ]
        }
      ]
    ],
  ```
* upload to a public s3 bucket and [use](http://general-use123.s3-website-eu-west-1.amazonaws.com/nuxt-custom-elements/component-logo/)
