const express = require('express')
const esm = require('esm')
const { getArg } = esm(module)(require.resolve('./utils'))
const app = express()

const dist = getDist()
const host = getHost()
const port = getPort()

app.use(express.static(dist))
app.listen(port, host, function () {
  const { address, port } = this.address()
  // eslint-disable-next-line no-console
  console.log(`server listening on http://${address}:${port} ; dist: ${dist}`)
})

function getDist () {
  return process.env.npm_config_dist || getArg('dist') || process.env.DIST || 'dist'
}

function getHost () {
  return process.env.npm_config_host || getArg('host') || process.env.HOST || 'localhost'
}

function getPort () {
  return process.env.npm_config_port || getArg('port') || process.env.PORT || 3000
}
