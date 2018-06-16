#!/usr/bin/env node

var _ = require('lodash')
var split = require('split2')
var through = require('through2')

var argv = require('yargs')
  .option('indent', {
    alias: 'i',
    describe: 'json indent size',
    default: 0
  })
  .option('clean', {
    alias: 'c',
    describe: 'filter non-json lines',
    default: false
  })
  .option('omit', {
    alias: 'o',
    describe: 'omit keys from objects',
    array: true,
    default: []
  })
  .argv

var omit = argv.omit
var indent = argv.indent

process.stdin
  .pipe(split())
  .pipe(through(function (chunk, enc, cb) {
    var str = chunk.toString()
    var i = str.indexOf('{')
    if (i < 0) {
      if (argv.clean) return cb()
      return cb(null, chunk + '\n')
    }

    var json = str.slice(i)
    if (!indent && !omit.length) return cb(null, json + '\n')

    var obj = JSON.parse(json)
    if (omit.length) obj = _.omit(obj, omit)
    cb(null, JSON.stringify(obj, null, indent) + '\n')
  }))
  .pipe(process.stdout)
