
import { join, resolve as pathResolve } from 'path';
import { Nuxt, Builder } from 'nuxt';
import getPort from 'get-port';
import { chromium, firefox } from 'playwright';
import { defu } from 'defu';
import { afterAll, beforeAll, describe, test } from 'vitest';
import { createApp } from 'h3';
import nuxtConfig from '../example/nuxt.config';
const { listen } = require('listhen');
const serveStatic = require('serve-static');

const BROWSERS = { CHROMIUM: 0, FIREFOX: 1 };

describe('browser (client & modern) (chromium and firefox)', () => {
  startTest();
});

describe('browser (client) (chromium and firefox)', () => {
  startTest(false);
});

function startTest (modern = true) {
  let browsers, port, nuxt;

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
    await startStaticServer(customElementsDir, port);
  });

  afterAll(async () => {
    await Promise.all(browsers.map(browser => browser.close()));
  });

  test('check bundle initialization (chrome)', async () => {
    const page = await (browsers[Number(BROWSERS.CHROMIUM)]).newPage();
    page.goto(getUrl('/example/', port));
    await page.waitForSelector('.custom-element-example');
  });

  test('check bundle initialization (firefox)', async () => {
    const page = await (browsers[Number(BROWSERS.FIREFOX)]).newPage();
    page.goto(getUrl('/example/', port));
    await page.waitForSelector('.custom-element-example');
  });

  test('check bundle initialization (chrome)', async () => {
    const page = await (browsers[Number(BROWSERS.CHROMIUM)]).newPage();
    page.goto(getUrl('/example-shadow/', port));
    await page.waitForSelector('.custom-element-example');
  });

  test('check bundle initialization (firefox)', async () => {
    const page = await (browsers[Number(BROWSERS.FIREFOX)]).newPage();
    page.goto(getUrl('/example-shadow/', port));
    await page.waitForSelector('.custom-element-example');
  });
}

function getUrl (path, port) {
  return `http://localhost:${port}${path}`;
}

function startStaticServer (dist, port = 3000, hostname = 'localhost') {
  const app = createApp();
  app.use(serveStatic(dist));
  return listen(app, {
    hostname, port
  });
}
