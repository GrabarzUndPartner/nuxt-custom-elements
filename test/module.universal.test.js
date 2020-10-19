const { resolve } = require('path')
const fsExtra = require('fs-extra')
const { generate, build, loadConfig } = require('@nuxtjs/module-test-utils')

const { getCustomElementsDir, getBuildDir, getGeneratedDir, getDistDir } = require('./utils')
const moduleConfig = require('./fixture/module.config')
const { getGeneratesDir } = require('./utils')

jest.setTimeout(20000)

describe('universal (generate) (client)', () => {
  let nuxt
  const generatesDir = getGeneratesDir('universal-generate', 'client')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, false)

  beforeAll(async () => {
    const overrides = {
      ssr: true,
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
describe('universal (generate) (modern)', () => {
  let nuxt
  const generatesDir = getGeneratesDir('universal-generate', 'modern')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, false)

  beforeAll(async () => {
    const overrides = {
      ssr: true,
      modern: 'client',
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
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/component-app-abstract.client.js'))).not.toBeFalsy()
    expect(await fsExtra.pathExists(resolve(customElementsBuildDir, 'component-app-abstract/component-app-abstract.modern.js'))).not.toBeFalsy()
  })
})

describe('universal (generate) (client) with buildDir', () => {
  let nuxt
  const generatesDir = getGeneratesDir('universal-generate-with-buildDir', 'client')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, true)

  beforeAll(async () => {
    const overrides = {
      ssr: true,
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

describe('universal (build) (client)', () => {
  let nuxt
  const generatesDir = getGeneratesDir('universal-build', 'client')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, false, false)

  beforeAll(async () => {
    const overrides = {
      ssr: true,
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

describe('universal (build) (modern)', () => {
  let nuxt
  const generatesDir = getGeneratesDir('universal-build', 'modern')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, false, false)

  beforeAll(async () => {
    const overrides = {
      ssr: true,
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

describe('universal (build) (client) with buildDir', () => {
  let nuxt
  const generatesDir = getGeneratesDir('universal-build-with-buildDir', 'client')
  const buildDir = getBuildDir(generatesDir)
  const customElementsBuildDir = getCustomElementsDir(generatesDir, true, false)

  beforeAll(async () => {
    const overrides = {
      ssr: true,
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
