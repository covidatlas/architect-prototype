let arc = require('@architect/functions')
let visitors = require('@architect/shared/visitors')

exports.handler = runTracker

async function runTracker () {
  // Walk the tree, generate the links
  // This is super crappy and prob needs to support country + locale (no region)
  let items = []
  let get = node => Object.keys(node).filter(i => i !== 'friendlyName')
  for (let country of get(visitors)) {

    let regions = get(visitors[country])
    for (let region of regions) {

      let locales = get(visitors[country][region])
      for (let locale of locales) {
        items.push({ country, region, locale })
      }
    }
  }
  for (let payload of items) {
    await arc.events.publish({
      name: 'tracker',
      payload
    })
  }
}


// Directly invokable for testing
if (require.main === module) {
  (async function() {
    try {
      await runTracker()
    }
    catch (err) {
      console.log(err)
    }
  })();
}
