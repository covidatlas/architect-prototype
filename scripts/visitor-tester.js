#!/usr/bin/env node
process.env.NODE_ENV = 'testing'
let arc = require('@architect/functions')

// Runs the visitor without writing to DB; disable debug to write
;(async () => {
  await arc.events.publish({
    name: 'tracker',
    payload: {
      country: 'us',
      region: 'ca',
      locale: 'san-francisco',
      debug: true
    }
  }
)
})()
