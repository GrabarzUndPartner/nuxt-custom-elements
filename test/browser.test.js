const { join, resolve } = require('path')
const puppeteer = require('puppeteer')
const { setup, loadConfig, generatePort } = require('@nuxtjs/module-test-utils')
const express = require('express')

describe('browser (puppeteer)', () => {
  let nuxt, express, browser, page
  const fixtureDir = resolve(__dirname, 'fixture', 'browser')
  const buildDir = join(fixtureDir, '.nuxt')
  const customElementsDir = join(buildDir, 'nuxt-custom-elements/dist')

  beforeAll(async () => {
    const overrides = {
      modern: 'client',
      buildDir
    };

    ({ nuxt } = (await setup(loadConfig(__dirname, '../../example', overrides, { merge: true }))))
    await nuxt.close()

    express = startStaticServer(customElementsDir, await generatePort())

    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.setViewport({
      width: 1200,
      height: 800
    })
  }, 120000)

  afterAll(async () => {
    await new Promise((resolve) => {
      express.close(resolve)
    })
    await browser.close()
  })

  async function getUrl (path) {
    return `http://localhost:${await generatePort()}${path}`
  }

  test('check bundle initialization', async () => {
    await page.goto(await getUrl('/component-app-bundle'))
    await page.waitForSelector('.custom-element-app-abstract')
    await page.waitForSelector('.custom-element-app-hash')
    await page.waitForSelector('.custom-element-app-history')
  })
})

function startStaticServer (dist, port = 3000, host = 'localhost') {
  const app = express()
  app.use(express.static(dist))
  return app.listen(port, host, function () {
    const { address, port } = this.address()
    // eslint-disable-next-line no-console
    console.log(`server listening on http://${address}:${port} ; dist: ${dist}`)
  })
}
