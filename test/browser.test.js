const { resolve } = require('path')
const fsExtra = require('fs-extra')
const { pathExists } = require('fs-extra')
const puppeteer = require('puppeteer')
const { build, loadConfig, generatePort } = require('@nuxtjs/module-test-utils')

const { startStaticServer, getUrl, getBuildDir, getCustomElementsDir, getGeneratesDir, getDistDir } = require('./utils')
const moduleConfig = require('./fixture/module.config')

jest.setTimeout(10000)

const VIEWPORT = {
  width: 1200,
  height: 800
}

describe('browser (only client) (puppeteer)', () => {
  let nuxt, express, browser, page
  const generatesDir = getGeneratesDir('browser', 'client')
  const buildDir = getBuildDir(generatesDir)
  const customElementsDir = getCustomElementsDir(generatesDir, false, false)

  beforeAll(async () => {
    const overrides = {
      modern: 'client',
      buildDir,
      modules: [
        [
          resolve(__dirname, '..'), Object.assign({}, moduleConfig, {
            modern: false
          })
        ]
      ]
    }

    await fsExtra.remove(getDistDir(generatesDir));

    ({ nuxt } = (await build(loadConfig(__dirname, '.', overrides, { merge: true }))))
    await nuxt.close()

    express = startStaticServer(customElementsDir, await generatePort())

    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.setViewport(VIEWPORT)
  }, 120000)

  afterAll(async () => {
    await new Promise((resolve) => {
      express.close(resolve)
    })
    await browser.close()
  })

  test('check generated entry files', async () => {
    expect(await pathExists(resolve(customElementsDir, 'component-app-abstract/component-app-abstract.js'))).not.toBeFalsy()
    expect(await pathExists(resolve(customElementsDir, 'component-app-bundle/component-app-bundle.js'))).not.toBeFalsy()
    expect(await pathExists(resolve(customElementsDir, 'component-app-hash/component-app-hash.js'))).not.toBeFalsy()
    expect(await pathExists(resolve(customElementsDir, 'component-app-history/component-app-history.js'))).not.toBeFalsy()
  })

  test('check bundle initialization', async () => {
    await page.goto(await getUrl('/component-app-bundle'))
    await page.waitForSelector('.custom-element-app-abstract')
    await page.waitForSelector('.custom-element-app-hash')
    await page.waitForSelector('.custom-element-app-history')
  })
})

describe('browser (client & modern) (puppeteer)', () => {
  let nuxt, express, browser, page
  const generatesDir = getGeneratesDir('browser', 'modern')
  const buildDir = getBuildDir(generatesDir)
  const customElementsDir = getCustomElementsDir(generatesDir, false, false)

  beforeAll(async () => {
    const overrides = {
      modern: 'client',
      buildDir,
      modules: [
        [
          resolve(__dirname, '..'), Object.assign({}, moduleConfig, {
            modern: true
          })
        ]
      ]
    }

    await fsExtra.remove(getDistDir(generatesDir));

    ({ nuxt } = (await build(loadConfig(__dirname, '.', overrides, { merge: true }))))
    await nuxt.close()

    express = startStaticServer(customElementsDir, await generatePort())

    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.setViewport(VIEWPORT)
  }, 120000)

  afterAll(async () => {
    await new Promise((resolve) => {
      express.close(resolve)
    })
    await browser.close()
  })

  test('check generated entry files', async () => {
    await Promise.all(['client', 'modern'].map(async (type) => {
      expect(await pathExists(resolve(customElementsDir, `component-app-abstract/component-app-abstract.${type}.js`))).not.toBeFalsy()
      expect(await pathExists(resolve(customElementsDir, `component-app-bundle/component-app-bundle.${type}.js`))).not.toBeFalsy()
      expect(await pathExists(resolve(customElementsDir, `component-app-hash/component-app-hash.${type}.js`))).not.toBeFalsy()
      expect(await pathExists(resolve(customElementsDir, `component-app-history/component-app-history.${type}.js`))).not.toBeFalsy()
    }))
  })

  test('check bundle initialization', async () => {
    await page.goto(await getUrl('/component-app-bundle'))
    await page.waitForSelector('.custom-element-app-abstract')
    await page.waitForSelector('.custom-element-app-hash')
    await page.waitForSelector('.custom-element-app-history')
  })
})
