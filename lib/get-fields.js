'use strict'

const { spawnSync } = require('child_process')

const parseDump = text =>
  text.match(/FieldName: (\S+)/gm).map(match => /: (\S+$)/g.exec(match)[1])

const getFields = filePath => {
  const { stdout, stderr, status } = spawnSync('pdftk', [
    filePath,
    'dump_data_fields',
  ])
  if (status !== 0) {
    throw new Error(stderr.toString().trim())
  } else {
    return parseDump(stdout.toString())
  }
}

module.exports = getFields
