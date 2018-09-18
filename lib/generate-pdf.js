'use strict'

const { spawn } = require('child_process')
const generateFDF = require('./generate-fdf')

function generatePDF(
  data,
  sourcePath,
  destinationPath,
  callback,
  flatten = true
) {
  const child = spawn('pdftk', [
    sourcePath,
    'fill_form',
    '-',
    'output',
    destinationPath,
    ...(flatten ? ['flatten'] : []),
  ])

  // Generate fdf file from data, output to stdout, and use it to write to template pdf
  child.stdin.write(generateFDF(data))
  child.stdin.end()

  // Handle pdftk spawn process exit
  child.on('exit', code => {
    if (code) {
      callback(new Error('PDFtk process failed'))
    } else {
      callback(null)
    }
  })
}

module.exports = generatePDF
