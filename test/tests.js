import http from 'http';
import { join } from 'pathe';
import { joinURL } from 'ufo';
import { chromium, firefox } from 'playwright';
import { defu } from 'defu';
import { afterAll, beforeAll, test } from 'vitest';
import finalhandler from 'finalhandler';
import serveStatic from 'serve-static';
import { getPort } from 'get-port-please';
import { createResolver, loadNuxt, buildNuxt } from '@nuxt/kit';
import { kebabCase } from 'change-case';
import nuxtConfig from '../playground/nuxt.config.mjs';

const BROWSERS = { CHROMIUM: 0, FIREFOX: 1 };

export default function (builder) {
  let browsers, nuxt, serverUrl;

  const resolver = createResolver(import.meta.url);

  const rootDir = resolver.resolve(`.browser-${kebabCase(builder)}`);
  const srcDir = resolver.resolve('../playground');
  const buildDir = join(rootDir, '.nuxt');
  const customElementsDir = join(buildDir, 'nuxt-custom-elements/dist');

  beforeAll(async () => {
    const config = defu(
      {
        builder,
        rootDir,
        srcDir
      },
      await nuxtConfig()
    );

    nuxt = await loadNuxt({ config });
    await buildNuxt(nuxt);

    browsers = await Promise.all([chromium.launch(), firefox.launch()]);

    const { url } = await startStaticServer(customElementsDir);
    serverUrl = url;
  });

  afterAll(async () => {
    await Promise.all(browsers.map(browser => browser.close()));
  });

  test('check bundle initialization (chrome)', async () => {
    const page = await browsers[Number(BROWSERS.CHROMIUM)].newPage();
    await page.goto(joinURL(serverUrl, '/example/'));
    await page.waitForSelector('.custom-element-example-ready');
  });

  test('check bundle initialization (firefox)', async () => {
    const page = await browsers[Number(BROWSERS.FIREFOX)].newPage();
    await page.goto(joinURL(serverUrl, '/example/'));
    await page.waitForSelector('.custom-element-example-ready');
  });
}

export const startStaticServer = async (dist, port, hostname = 'localhost') => {
  port = port || (await getPort());
  const serve = serveStatic(dist);
  const server = http.createServer(function onRequest(req, res) {
    serve(req, res, finalhandler(req, res));
  });
  server.listen({ port, hostname });
  return { server, url: new URL(`http://${hostname}:${port}`).toString() };
};
