let cheerio = require('cheerio')
let tiny = require('tiny-json-http')

module.exports = async function loader (url, headers) {
  // MAJOR TODO: need to add puppeteer or another tool to render pages and get sessions
  try {
    let params = { url }
    if (headers) params.headers = headers
    let result = await tiny.get(params)
    if (!result.body) {
      throw Error('Result returned empty body')
    }
    return cheerio.load(result.body)
  }
  catch (err) {
    let msg = `Failed to load', ${url}`
    throw Error(msg)
  }
}
