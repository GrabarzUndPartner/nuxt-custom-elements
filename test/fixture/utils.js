const express = require('express')
const { generatePort } = require('@nuxtjs/module-test-utils')
const HOST = 'localhost'

export function startStaticServer (dist, port = 3000, host = HOST) {
  const app = express()
  app.use(express.static(dist))
  return app.listen(port, host)
}

export async function getUrl (path) {
  return `http://${HOST}:${await generatePort()}${path}`
}
