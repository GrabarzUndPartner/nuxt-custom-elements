
import { join, resolve as pathResolve } from 'path';
import { Nuxt, Builder } from 'nuxt';
import getPort from 'get-port';
import express from 'express';
import { chromium, firefox } from 'playwright';
import { defu } from 'defu';
import { afterAll, beforeAll, describe, test } from 'vitest';
import nuxtConfig from '../example/nuxt.config';

const CHROMIUM = 0;
const FIREFOX = 1;

let nuxt;

describe('browser (client & modern) (chromium and firefox)', () => {
  startTest();
});

describe('browser (client) (chromium and firefox)', () => {
  startTest(false);
});

function startTest (modern = true) {
  let browsers, port, server;

  const testDir = pathResolve(__dirname, `.browser${modern ? '-modern' : ''}`);
  const buildDir = join(testDir, '.nuxt');
  const customElementsDir = join(buildDir, 'nuxt-custom-elements/dist');

  beforeAll(async () => {
    const config = defu({
      dev: false,
      modern: modern ? 'client' : false,
      buildDir
    }, nuxtConfig);
    nuxt = new Nuxt(config);
    await new Builder(nuxt).build();

    browsers = await Promise.all([
      chromium.launch(),
      firefox.launch()
    ]);
    port = await getPort();
    server = startStaticServer(customElementsDir, port);
  });

  afterAll(async () => {
    await Promise.all(browsers.map(browser => browser.close()));
    await new Promise(resolve => server.close(resolve));
  });

  // #region /component-app-bundle

  test('check bundle initialization (chrome)', async () => {
    const page = await (browsers[Number(CHROMIUM)]).newPage();
    page.goto(getUrl('/example/', port));
    await page.waitForSelector('.custom-element-example');
  });

  test('check bundle initialization (firefox)', async () => {
    const page = await (browsers[Number(FIREFOX)]).newPage();
    page.goto(getUrl('/example/', port));
    await page.waitForSelector('.custom-element-example');
  });

  test('check bundle initialization (chrome)', async () => {
    const page = await (browsers[Number(CHROMIUM)]).newPage();
    page.goto(getUrl('/example-shadow/', port));
    await page.waitForSelector('.custom-element-example');
  });

  test('check bundle initialization (firefox)', async () => {
    const page = await (browsers[Number(FIREFOX)]).newPage();
    page.goto(getUrl('/example-shadow/', port));
    await page.waitForSelector('.custom-element-example');
  });

  // #endregion
}

function getUrl (path, port) {
  return `http://localhost:${port}${path}`;
}

function startStaticServer (dist, port = 3000, host = 'localhost') {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.static(dist));
  return app.listen(port, host);
}
