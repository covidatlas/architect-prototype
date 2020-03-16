let tz = 'America/Los_Angeles'
let url = 'http://www.acphd.org/2019-ncov.aspx'

module.exports = async function visitor ({getResult='', loader}) {
  let result = getResult(tz)
  try {
    // Alameda county: no cookie, no data. GROSS.
    let headers = {
      cookie: 'TS0172d73f_77=08ae96f08bab28007b0ce98c7a079ff2604011b48be68350d2698d70d722f3fe91a22145a02658024b14e41c136660de0837d8bc69824000a3ae8e83db8305e8a399ec32d03502f9743aea15ac99896013adb464dd6930554bbb6e77add90ff0be9a882640ad978297338737984ac20e9dd85eae75892ebd; TSPD_101=08ae96f08bab2800570ac5b5ae9fd8306a1ad31aa0465fd173b53eea0f2a59518c5d49e01d384f2961b222288eb7d0f3:; TS0172d73f=0129191c7e48176dad9c0fbd4d158764f40af6ad03983f75335f84f52a3f667490d0837bf7e80ad3e650951e2a2500ef924a049547'
    }
    let $ = await loader(url, headers)

    // There has got to be a better way...
    let box = $('table.contacts_table')
                .children('tbody')
                .children('tr')
                .children('td')
                .children('div')
                .children('p')
                .children('em')
    $(box).each((i, elem) => {
      let str = elem &&
                elem.children &&
                elem.children[0] &&
                elem.children[0].data &&
                elem.children[0].data.toLowerCase()
      result.totalPositiveCases = Number(str.trim())
    })

    if (result.totalPositiveCases === false)
      throw Error('Scrape did not validate')
  }
  catch(err) {
    console.log(`Visitor error`, err)
    throw Error('Error collecting data')
  }

  return result
}
