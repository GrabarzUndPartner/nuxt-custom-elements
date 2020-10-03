const { resolve } = require('path')
const fsExtra = require('fs-extra')
const { generate, build, loadConfig } = require('@nuxtjs/module-test-utils')

const { getCustomElementsDir, getBuildDir, getGeneratedDir, getDistDir } = require('./utils')
const moduleConfig = require('./fixture/module.config')
const { getGeneratesDir } = require('./utils')

jest.setTimeout(10000)

describe('spa (generate) (client)', () => {
  let nuxt
  const generatesDir = getGeneratesDir('spa-generate', 'client')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, false)

  beforeAll(async () => {
    const overrides = {
      ssr: false,
      generate: {
        dir: getGeneratedDir(generatesDir)
      },
      buildDir,
      modules: [
        [
          resolve(__dirname, '..'), Object.assign({}, moduleConfig, {
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
              }
            ]
          })
        ]
      ]
    }

    await fsExtra.remove(getDistDir(generatesDir));

    ({ nuxt } = (await generate(loadConfig(__dirname, '.', overrides, { merge: true }))))
    await nuxt.close()
  }, 120000)

  test('check generated entry files', async () => {
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/component-app-abstract.js'))).not.toBeFalsy()
  })
})

describe('spa (generate) (modern)', () => {
  let nuxt
  const generatesDir = getGeneratesDir('spa-generate', 'modern')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, false)

  beforeAll(async () => {
    const overrides = {
      ssr: false,
      modern: 'client',
      generate: {
        dir: getGeneratedDir(generatesDir)
      },
      buildDir,
      modules: [
        [
          resolve(__dirname, '..'), Object.assign({}, moduleConfig, {
            modern: true,
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
              }
            ]
          })
        ]
      ]
    }

    await fsExtra.remove(getDistDir(generatesDir));

    ({ nuxt } = (await generate(loadConfig(__dirname, '.', overrides, { merge: true }))))
    await nuxt.close()
  }, 120000)

  test('check generated entry files', async () => {
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/component-app-abstract.client.js'))).not.toBeFalsy()
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/component-app-abstract.modern.js'))).not.toBeFalsy()
  })
})

describe('spa (generate) (client) with buildDir', () => {
  let nuxt
  const generatesDir = getGeneratesDir('spa-generate-with-buildDir', 'client')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, true)

  beforeAll(async () => {
    const overrides = {
      ssr: false,
      generate: {
        dir: getGeneratedDir(generatesDir)
      },
      buildDir,
      modules: [
        [
          resolve(__dirname, '..'), Object.assign({}, moduleConfig, {
            buildDir: customElementsBuildDir,
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
              }
            ]
          })
        ]
      ]
    }

    await fsExtra.remove(getDistDir(generatesDir));

    ({ nuxt } = (await generate(loadConfig(__dirname, '.', overrides, { merge: true }))))
    await nuxt.close()
  }, 120000)

  test('check generated entry files', async () => {
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/component-app-abstract.js'))).not.toBeFalsy()
  })
})

describe('spa (build) (client)', () => {
  let nuxt
  const generatesDir = getGeneratesDir('spa-build', 'client')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, false, false)

  beforeAll(async () => {
    const overrides = {
      ssr: false,
      buildDir,
      generate: {
        dir: getGeneratedDir(generatesDir)
      },
      modules: [
        [
          resolve(__dirname, '..'), Object.assign({}, moduleConfig, {
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
              }
            ]
          })
        ]
      ]
    }

    await fsExtra.remove(getDistDir(generatesDir));

    ({ nuxt } = (await build(loadConfig(__dirname, '.', overrides, { merge: true }))))
    await nuxt.close()
  }, 120000)

  test('check generated entry files', async () => {
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/component-app-abstract.js'))).not.toBeFalsy()
  })
})

describe('spa (build) (modern)', () => {
  let nuxt
  const generatesDir = getGeneratesDir('spa-build', 'modern')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, false, false)

  beforeAll(async () => {
    const overrides = {
      ssr: false,
      modern: 'client',
      buildDir,
      generate: {
        dir: getGeneratedDir(generatesDir)
      },
      modules: [
        [
          resolve(__dirname, '..'), Object.assign({}, moduleConfig, {
            modern: true,
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
              }
            ]
          })
        ]
      ]
    }

    await fsExtra.remove(getDistDir(generatesDir));

    ({ nuxt } = (await build(loadConfig(__dirname, '.', overrides, { merge: true }))))
    await nuxt.close()
  }, 120000)

  test('check generated entry files', async () => {
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/component-app-abstract.client.js'))).not.toBeFalsy()
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/component-app-abstract.modern.js'))).not.toBeFalsy()
  })
})

describe('spa (build) (client) with buildDir', () => {
  let nuxt
  const generatesDir = getGeneratesDir('spa-build-with-buildDir', 'client')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, true, false)

  beforeAll(async () => {
    const overrides = {
      ssr: false,
      generate: {
        dir: getGeneratedDir(generatesDir)
      },
      buildDir,
      modules: [
        [
          resolve(__dirname, '..'), Object.assign({}, moduleConfig, {
            buildDir: customElementsBuildDir,
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
              }
            ]
          })
        ]
      ]
    }

    await fsExtra.remove(getDistDir(generatesDir));

    ({ nuxt } = (await build(loadConfig(__dirname, '.', overrides, { merge: true }))))
    await nuxt.close()
  }, 120000)

  test('check generated entry files', async () => {
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/component-app-abstract.js'))).not.toBeFalsy()
  })
})

describe('spa (build) (client) with custom webpackOutput filename', () => {
  let nuxt
  const generatesDir = getGeneratesDir('spa-build-with-custom-filename', 'client')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, true, false)

  beforeAll(async () => {
    const overrides = {
      ssr: false,
      generate: {
        dir: getGeneratedDir(generatesDir)
      },
      buildDir,
      modules: [
        [
          resolve(__dirname, '..'), Object.assign({}, moduleConfig, {
            buildDir: customElementsBuildDir,
            webpackOutput: {
              filename: (chunk, webpackConfig, moduleOptions) => {
                if (moduleOptions.modern) {
                  if (webpackConfig.name === 'modern') {
                    return 'custom-name.[name].modern.js'
                  } else {
                    return 'custom-name.[name].client.js'
                  }
                } else {
                  return 'custom-name.[name].js'
                }
              }
            },
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
              }
            ]
          })
        ]
      ]
    }

    await fsExtra.remove(getDistDir(generatesDir));

    ({ nuxt } = (await build(loadConfig(__dirname, '.', overrides, { merge: true }))))
    await nuxt.close()
  }, 120000)

  test('check generated entry files', async () => {
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/custom-name.component-app-abstract.js'))).not.toBeFalsy()
  })
})

describe('spa (build) (modern) with custom webpackOutput filename', () => {
  let nuxt
  const generatesDir = getGeneratesDir('spa-build-with-custom-filename', 'modern')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, true, false)

  beforeAll(async () => {
    const overrides = {
      ssr: false,
      modern: 'client',
      generate: {
        dir: getGeneratedDir(generatesDir)
      },
      buildDir,
      modules: [
        [
          resolve(__dirname, '..'), Object.assign({}, moduleConfig, {
            buildDir: customElementsBuildDir,
            modern: true,
            webpackOutput: {
              filename: (chunk, webpackConfig, moduleOptions) => {
                if (moduleOptions.modern) {
                  if (webpackConfig.name === 'modern') {
                    return 'custom-name.[name].modern.js'
                  } else {
                    return 'custom-name.[name].client.js'
                  }
                } else {
                  return 'custom-name.[name].js'
                }
              }
            },
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
              }
            ]
          })
        ]
      ]
    }

    await fsExtra.remove(getDistDir(generatesDir));

    ({ nuxt } = (await build(loadConfig(__dirname, '.', overrides, { merge: true }))))
    await nuxt.close()
  }, 120000)

  test('check generated entry files', async () => {
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/custom-name.component-app-abstract.client.js'))).not.toBeFalsy()
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/custom-name.component-app-abstract.modern.js'))).not.toBeFalsy()
  })
})
