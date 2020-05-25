const { build, loadConfig } = require('@nuxtjs/module-test-utils')

describe('build', () => {
  let nuxt, builder

  beforeAll(async () => {
    ({ nuxt, builder } = await build(loadConfig(__dirname, '../../example')))
  }, 240000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('build', () => {
    expect(builder._buildStatus).toBe(2)
  })
})
