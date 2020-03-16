let arc = require('@architect/functions')
let router = require('./_router')
let root = require('./_root')
let location = require('./_location')

exports.handler = arc.http.async(root, router, location)
