const { join, resolve } = require('path')
const { pathExists } = require('fs-extra')
const puppeteer = require('puppeteer')
const { setup, loadConfig, generatePort } = require('@nuxtjs/module-test-utils')

// const nuxtConfig = require('./fixture/nuxt.config')
const moduleConfig = require('./fixture/module.config')
const { startStaticServer, getUrl } = require('./fixture/utils')

jest.setTimeout(10000)

const VIEWPORT = {
  width: 1200,
  height: 800
}

describe('browser (only client) (puppeteer)', () => {
  let nuxt, express, browser, page
  const fixtureDir = resolve(__dirname, 'fixture', 'browser', 'client')
  const buildDir = join(fixtureDir, '.nuxt')
  const customElementsDir = join(buildDir, 'nuxt-custom-elements/dist')

  beforeAll(async () => {
    const overrides = {
      buildDir,
      modules: [
        [
          resolve(__dirname, '..'), Object.assign({}, moduleConfig, {
            modern: false
          })
        ]
      ]
    };

    ({ nuxt } = (await setup(loadConfig(__dirname, '.', overrides, { merge: true }))))
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
  const fixtureDir = resolve(__dirname, 'fixture', 'browser', 'modern')
  const buildDir = join(fixtureDir, '.nuxt')
  const customElementsDir = join(buildDir, 'nuxt-custom-elements/dist')

  beforeAll(async () => {
    const overrides = {
      buildDir,
      modules: [
        [
          resolve(__dirname, '..'), Object.assign({}, moduleConfig, {
            modern: true
          })
        ]
      ]
    };

    ({ nuxt } = (await setup(loadConfig(__dirname, '.', overrides, { merge: true }))))
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
