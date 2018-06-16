#!/usr/bin/env node

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
  .argv

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
    if (!indent) return cb(null, json + '\n')

    var obj = JSON.parse(json)
    cb(null, JSON.stringify(obj, null, indent) + '\n')
  }))
  .pipe(process.stdout)
