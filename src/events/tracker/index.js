let arc = require('@architect/functions')
let getResult = require('@architect/shared/utils/result')
let getDate = require('@architect/shared/utils/get-date')
let loader = require('./_loader')

exports.handler = arc.events.subscribe(tracker)

async function tracker (params={}) {
  let { country='us', region='ca', locale='san-francisco' } = params
  let id = `#${country}-#${region}-#${locale}`

  // eslint-disable-next-line
  let visitor = require(`./visitors/${country}/${region}/${locale}`)
  let data = await arc.tables()


  try {
    let result = await visitor({ getResult, loader })
    result.id = id

    await data.data.put(result)
    await data['all-updates'].put(result)
  }
  catch (err) {
    // TODO Add some logic to ensure an error doesn't overwrite good data?
    console.log(err)
    let result = {
      id,
      error: true,
      date: getDate(visitor.tz),
      created: new Date().toISOString()
    }
    await data.data.put(result)
    await data['all-updates'].put(result)
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
