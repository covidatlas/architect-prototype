let arc = require('@architect/functions')
let getResult = require('@architect/shared/utils/result')
let getDate = require('@architect/shared/utils/get-date')
let loader = require('./_loader')

exports.handler = arc.events.subscribe(tracker)

async function tracker (params={}) {
  let {
    country='us',
    region='ca',
    locale='san-francisco',
    debug=false
  } = params

  let id = `#${country}-#${region}-#${locale}`
  let data = await arc.tables()
  let timezone // Assigned out of visitor

  try {
    // eslint-disable-next-line
    let visitor = require(`./visitors/${country}/${region}/${locale}`)

    let { tz, url, headers, scraper } = visitor
    timezone = tz
    let result = getResult(tz)
    let $ = await loader(url, headers)
    result = await scraper({ result, $ })
    result.id = id

    if (debug) {
      console.log(`visitor ${id} result:`, result)
    }

    // TODO add validation of assigned values

    if (!debug) {
      await data.data.put(result)
      await data['all-updates'].put(result)
    }
  }
  catch (err) {
    console.log(err)
    let date = timezone ? getDate(timezone) : 'America/Los_Angeles'
    let result = {
      id,
      error: true,
      date,
      created: new Date().toISOString()
    }
    if (!debug) {
      // await data.data.put(result) // TODO Add some logic to ensure an error doesn't overwrite good data?
      await data['all-updates'].put(result)
    }
  }
}

// Directly invokable for testing
if (require.main === module) {
  (async function() {
    try {
      await tracker()
    }
    catch (err) {
      console.log(err)
    }
  })();
}
