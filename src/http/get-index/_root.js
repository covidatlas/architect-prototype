let visitors = require('@architect/shared/visitors')
let Body = require('./_body')

module.exports = async function index (req) {
  if (req.path !== '/') return
  else {
    // Walk the tree, generate the links
    // This is super crappy and prob needs to support country + locale (no region)
    let items = []
    let get = node => Object.keys(node).filter(i => i !== 'friendlyName')
    for (let country of get(visitors)) {

      let regions = get(visitors[country])
      for (let region of regions) {

        let locales = get(visitors[country][region])
        for (let locale of locales) {
          items.push({
            friendlyName: visitors[country][region][locale].friendlyName,
            link: `/${country}/${region}/${locale}`
          })
        }
      }
    }
    let links = items.map(i => `<li><a href="${i.link}">${i.friendlyName}</a></li>`).join('\n')
    let content = `<ul>${links}</ul>`
    let html = Body({content})
    return {
      html
    }
  }
}
