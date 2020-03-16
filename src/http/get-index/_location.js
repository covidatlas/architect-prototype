let arc = require('@architect/functions')
let Body = require('./_body')

module.exports = async function location (req) {
  let { country, region, locale, name } = req.route
  let id = `#${country}-#${region}-#${locale}`

  let data = await arc.tables()
  let content = await data.data.query({
    KeyConditionExpression: 'id = :id AND #date > :date',
    ExpressionAttributeNames: { '#date': 'date' },
    ExpressionAttributeValues: {
      ':id': id,
      ':date': '0'
    }
  })
  let html = Body({
    content: JSON.stringify(content.Items,null,2),
    name
  })
  return {
    html
  }
}
