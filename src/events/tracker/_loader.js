let cheerio = require('cheerio')
let tiny = require('tiny-json-http')

module.exports = async function loader (url) {
  try {
    let result = await tiny.get({ url })
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
