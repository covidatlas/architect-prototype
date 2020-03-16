let getDate = require('./get-date')

module.exports = function getTemplateResult (tz) {
  let date = getDate(tz)

  return Object.assign({}, {
    date,
    positiveCasesToday: null,
    totalPositiveCases: null,
    deathsToday: null,
    totalDeaths: null,
    recoveredToday: null,
    totalRecoveries: null,
    testsToday: null,
    totalTested: null,
    created: new Date().toISOString()
  })
}
