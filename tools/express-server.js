const { paramCase } = require('change-case');
const express = require('express');
const app = express();
app.disable('x-powered-by');

const dist = getDist();
const host = getHost();
const port = getPort();

app.use(express.static(dist));
app.listen(port, host, function () {
  const { address, port } = this.address();
  // eslint-disable-next-line no-console
  console.log(`server listening on http://${address}:${port} ; dist: ${dist}`);
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
