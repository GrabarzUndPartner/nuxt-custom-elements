const { paramCase } = require('change-case');
const { createApp } = require('h3');
const { listen } = require('listhen');
const serveStatic = require('serve-static');

const dist = getDist();

const app = createApp();
app.use(serveStatic(dist));

listen(app, {
  hostname: getHost(), port: getPort()
});

function getDist () {
  return process.env.npm_config_dist || getArg('dist') || process.env.DIST || 'dist';
}

function getHost () {
  return process.env.npm_config_host || getArg('host') || process.env.HOST || 'localhost';
}

function getPort () {
  return process.env.npm_config_port || getArg('port') || process.env.PORT || 3000;
}

function getArg (name) {
  name = paramCase(name);
  const args = process.argv.slice(2);
  let value = !!args[args.indexOf(`--${name}`)];
  if (args.includes(`--${name}`) && args[args.indexOf(`--${name}`) + 1]) {
    value = args[args.indexOf(`--${name}`) + 1];
  }
  return value;
}
