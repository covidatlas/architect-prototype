let visitors = require('@architect/shared/visitors')

module.exports = async function router(req) {
  let sf = { location: '/us/ca/san-francisco' }

  let parts = req.path.split('/').filter(p => p)
  // FIXME this routing logic should only be temporary (famous last words...)
  if (parts.length !== 3) {
    // TODO 404 etc.
    return sf
  }
  else {
    let country = parts[0]
    let region = parts[1]
    let locale = parts[2]
    let hasVisitor = visitors[country][region][locale]
    if (hasVisitor) {
      let name = hasVisitor.friendlyName
      req.route = {
        country,
        region,
        locale,
        name
      }
      return
    }
    else return sf
  }
}
