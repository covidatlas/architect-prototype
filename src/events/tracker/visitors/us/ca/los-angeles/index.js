let tz = 'America/Los_Angeles'
let url = 'http://publichealth.lacounty.gov/media/Coronavirus/'

module.exports = {
  scraper,
  tz,
  url
}

async function scraper ({result, $}) {
  try {
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

    if (result.totalPositiveCases === null || result.totalDeaths === null)
      throw Error('Scrape did not validate')
  }
  catch(err) {
    console.log(`Visitor error`, err)
    throw Error('Error collecting data')
  }

  return result
}
