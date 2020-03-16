let spacetime = require('spacetime')

module.exports = function getDate (ianaTimezone) {
  let s = spacetime(Date.now(), ianaTimezone)
  let y = s.format('{year}')
  let m = `${Number(s.format('{month-pad}')) + 1}`.padStart(2, '0')
  let d = s.format('{date-pad}')
  return (`${y}-${m}-${d}`)
}
