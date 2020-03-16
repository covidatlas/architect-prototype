#!/usr/bin/env node

// $ ./scripts/visitor-tester.js us ca san-francisco

process.env.NODE_ENV = 'testing'
let arc = require('@architect/functions')
let country = process.argv[2] || 'us'
let region = process.argv[3] || 'ca'
let locale = process.argv[4] || 'san-francisco'

// Runs the visitor without writing to DB; disable debug to write
;(async () => {
  await arc.events.publish({
    name: 'tracker',
    payload: {
      country,
      region,
      locale,
      debug: true
    }
  }
)
})()
