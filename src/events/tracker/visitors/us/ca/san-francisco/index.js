
let tz = 'America/Los_Angeles'
let url = 'https://www.sfdph.org/dph/alerts/coronavirus.asp'

module.exports = {
  scraper,
  tz,
  url
}

async function scraper ({result, $}) {
  try {
    let box = $('div.box2#helpful-links').children('p')
    $(box).each((i, elem) => {
      let str = elem &&
                elem.children &&
                elem.children[0] &&
                elem.children[0].data &&
                elem.children[0].data.toLowerCase()

      let positive = 'total positive cases: '
      if (str && str.includes(positive))
        result.totalPositiveCases = Number(str.split(positive)[1].trim())

      let deaths = 'deaths: '
      if (str && str.includes(deaths))
        result.totalDeaths = Number(str.split(deaths)[1].trim())
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
