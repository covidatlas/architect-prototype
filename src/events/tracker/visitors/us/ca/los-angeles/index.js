let tz = 'America/Los_Angeles'
let url = 'http://publichealth.lacounty.gov/media/Coronavirus/'

module.exports = async function visitor ({getResult='', loader}) {
  let result = getResult(tz)
  try {
    let $ = await loader(url)

    let box = $('div.counter')
                .children('div.counter-text')
    $(box).each((i, elem) => {
      let str = elem &&
                elem.children &&
                elem.children[0] &&
                elem.children[0].data &&
                elem.children[0].data.toLowerCase()

      if (i === 0 && str)
        result.totalPositiveCases = Number(str.trim())

      if (i === 1 && str)
        result.totalDeaths = Number(str.trim())
    })

    if (result.totalPositiveCases === false || result.totalDeaths === false)
      throw Error('Scrape did not validate')
  }
  catch(err) {
    console.log(`Visitor error`, err)
    throw Error('Error collecting data')
  }

  return result
}
