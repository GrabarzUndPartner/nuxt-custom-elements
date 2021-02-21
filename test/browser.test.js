
import { join, resolve as pathResolve } from 'path';
import { setupTest } from '@nuxt/test-utils';
import getPort from 'get-port';
import express from 'express';
import { chromium, firefox } from 'playwright';

const CHROMIUM = 0;
const FIREFOX = 1;
// eslint-disable-next-line scanjs-rules/call_setTimeout
jest.setTimeout(20000);

describe('browser (client & modern) (chromium and firefox)', () => {
  test();
});

describe('browser (client) (chromium and firefox)', () => {
  test(false);
});

function test (modern = true) {
  let browsers, port, server;

  const testDir = pathResolve(__dirname, `.browser${modern ? '-modern' : ''}`);
  const buildDir = join(testDir, '.nuxt');
  const customElementsDir = join(buildDir, 'nuxt-custom-elements/dist');

  beforeAll(async () => {
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

  setupTest({
    browser: false,
    server: false,
    build: true,
    fixture: '../example',
    config: {
      modern: modern ? 'client' : false,
      buildDir
    }
  });

  // #region /component-app-bundle

  it('check bundle initialization (chrome)', async () => {
    const page = await (browsers[Number(CHROMIUM)]).newPage();
    page.goto(getUrl('/component-app-bundle/', port));
    await page.waitForSelector('.custom-element-app-abstract');
    await page.waitForSelector('.custom-element-app-hash');
    await page.waitForSelector('.custom-element-app-history');
  });

  it('check bundle initialization (firefox)', async () => {
    const page = await (browsers[Number(FIREFOX)]).newPage();
    page.goto(getUrl('/component-app-bundle/', port));
    await page.waitForSelector('.custom-element-app-abstract');
    await page.waitForSelector('.custom-element-app-hash');
    await page.waitForSelector('.custom-element-app-history');
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
