const { spawn } = require('child_process')
const generateFDF = require('./generate-fdf')

function generatePDF(data, filePath, callback) {
  const child = spawn('pdftk', [filePath, 'fill_form', '-', 'output', '-'])
  child.stdin.write(generateFDF(data))
  child.stdin.end()

  child.stderr.on('data', data => {
    console.log('stderror\n', data.toString())
    callback(data.toString())
  })

  child.on('error', err => {
    console.log('error\n', error)
    callback(err)
  })

  child.on('exit', code => {
    if (code) {
      const err = new Error('Non 0 exit code from pdftk spawn: ' + code)
      console.log(err)
      callback(err)
    }
  })

  child.stdout.on('data', data => {
    callback(null, data.toString())
  })
}

module.exports = generatePDF
