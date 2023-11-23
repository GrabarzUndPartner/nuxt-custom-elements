import http from 'http';
import { kebabCase } from 'change-case';
import finalhandler from 'finalhandler';
import serveStatic from 'serve-static';

startStaticServer(getDist(), getPort(), getHost());

function getDist() {
  return (
    process.env.npm_config_dist || getArg('dist') || process.env.DIST || 'dist'
  );
}

function getHost() {
  return (
    process.env.npm_config_host ||
    getArg('host') ||
    process.env.HOST ||
    'localhost'
  );
}

function getPort() {
  return (
    process.env.npm_config_port || getArg('port') || process.env.PORT || 3000
  );
}

function getArg(name) {
  name = kebabCase(name);
  const args = process.argv.slice(2);
  let value = !!args[args.indexOf(`--${name}`)];
  if (args.includes(`--${name}`) && args[args.indexOf(`--${name}`) + 1]) {
    value = args[args.indexOf(`--${name}`) + 1];
  }
  return value;
}

function startStaticServer(dist, port, hostname = 'localhost') {
  const serve = serveStatic(dist);
  const server = http.createServer(function onRequest(req, res) {
    serve(req, res, finalhandler(req, res));
  });
  server.listen({ port, hostname });
  // eslint-disable-next-line no-console
  console.log('Server started:', `http://${hostname}:${port}`);
  return { server, url: new URL(`http://${hostname}:${port}`).toString() };
}
