
import http from 'http';
import { join, resolve as pathResolve } from 'pathe';
import { joinURL } from 'ufo';
// import { Nuxt, Builder } from 'nuxt';
import { chromium, firefox } from 'playwright';
import { defu } from 'defu';
import { afterAll, beforeAll, describe, test } from 'vitest';
import finalhandler from 'finalhandler';
import serveStatic from 'serve-static';
import { getPort } from 'get-port-please';
import { loadNuxt, build } from 'nuxt';
import nuxtConfig from '../example/nuxt.config.mjs';

const BROWSERS = { CHROMIUM: 0, FIREFOX: 1 };

describe('🧐 inspect browser(chromium and firefox)', () => {
  startTest();
});

function startTest () {
  let browsers, nuxt, serverUrl;

  const testDir = pathResolve(__dirname, '.browser');
  const buildDir = join(testDir, '.nuxt');
  const customElementsDir = join(buildDir, 'nuxt-custom-elements/dist');

  beforeAll(async () => {
    const config = defu({
      buildDir
    }, nuxtConfig);

    nuxt = await loadNuxt(config);
    await build(nuxt);

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

export const startStaticServer = async (dist, port, hostname = 'localhost') => {
  port = port || await getPort();
  const serve = serveStatic(dist);
  const server = http.createServer(function onRequest (req, res) {
    serve(req, res, finalhandler(req, res));
  });
  server.listen({ port, hostname });
  return { server, url: (new URL(`http://${hostname}:${port}`)).toString() };
};
