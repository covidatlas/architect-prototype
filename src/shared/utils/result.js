let getDate = require('./get-date')

/**
 * Accepts:
 * - positiveCasesToday
 * - totalPositiveCases
 * - deathsToday
 * - totalDeaths
 * - recoveredToday
 * - totalRecoveries
 * - testsToday
 * - totalTested
 */
module.exports = function getTemplateResult (tz) {
  let date = getDate(tz)

  return Object.assign({}, {
    date,
    created: new Date().toISOString()
  })
}
