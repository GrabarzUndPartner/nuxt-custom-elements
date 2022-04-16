
import { join, resolve as pathResolve } from 'path';
import { joinURL } from 'ufo';
import { Nuxt, Builder } from 'nuxt';
import { chromium, firefox } from 'playwright';
import { defu } from 'defu';
import { afterAll, beforeAll, describe, test } from 'vitest';
import { createApp } from 'h3';
import { listen } from 'listhen';
import serveStatic from 'serve-static';
import nuxtConfig from '../example/nuxt.config';

const BROWSERS = { CHROMIUM: 0, FIREFOX: 1 };

describe('🧐 inspect browser (client & modern) (chromium and firefox)', () => {
  startTest();
});

describe('🧐 inspect browser (client) (chromium and firefox)', () => {
  startTest(false);
});

function startTest (modern = true) {
  let browsers, nuxt, serverUrl;

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
    const { url } = await startStaticServer(customElementsDir);
    serverUrl = url;
  });

  afterAll(async () => {
    await Promise.all(browsers.map(browser => browser.close()));
  });

  test('check bundle initialization (chrome)', async () => {
    const page = await (browsers[Number(BROWSERS.CHROMIUM)]).newPage();
    await page.goto(joinURL(serverUrl, '/example/'));
    await page.waitForSelector('.custom-element-example');
  });

  test('check bundle initialization (firefox)', async () => {
    const page = await (browsers[Number(BROWSERS.FIREFOX)]).newPage();
    await page.goto(joinURL(serverUrl, '/example/'));
    await page.waitForSelector('.custom-element-example');
  });

  test('check bundle initialization (chrome)', async () => {
    const page = await (browsers[Number(BROWSERS.CHROMIUM)]).newPage();
    await page.goto(joinURL(serverUrl, '/example-shadow/'));
    await page.waitForSelector('.custom-element-example');
  });

  test('check bundle initialization (firefox)', async () => {
    const page = await (browsers[Number(BROWSERS.FIREFOX)]).newPage();
    await page.goto(joinURL(serverUrl, '/example-shadow/'));
    await page.waitForSelector('.custom-element-example');
  });
}

function startStaticServer (dist, port = 3000, hostname = 'localhost') {
  const app = createApp();
  app.use(serveStatic(dist));
  return listen(app, {
    hostname, port
  });
}
