'use strict'

const iconvLite = require('iconv-lite')

function convertUTF16(text) {
  const buffer = iconvLite.encode(text, 'utf16')
  let tmp
  for (let i = 0; i < buffer.length; i += 2) {
    tmp = buffer[i]
    buffer[i] = buffer[i + 1]
    buffer[i + 1] = tmp
  }
  return buffer
}

function generateFDF(data) {
  let header = Buffer.from([])
  header = Buffer.concat([header, Buffer.from('%FDF-1.2\n')])
  header = Buffer.concat([
    header,
    Buffer.from(
      String.fromCharCode(226) +
        String.fromCharCode(227) +
        String.fromCharCode(207) +
        String.fromCharCode(211) +
        '\n'
    ),
  ])
  header = Buffer.concat([header, Buffer.from('1 0 obj \n')])
  header = Buffer.concat([header, Buffer.from('<<\n')])
  header = Buffer.concat([header, Buffer.from('/FDF \n')])
  header = Buffer.concat([header, Buffer.from('<<\n')])
  header = Buffer.concat([header, Buffer.from('/Fields [\n')])

  let footer = Buffer.from([])
  footer = Buffer.concat([footer, Buffer.from(']\n')])
  footer = Buffer.concat([footer, Buffer.from('>>\n')])
  footer = Buffer.concat([footer, Buffer.from('>>\n')])
  footer = Buffer.concat([footer, Buffer.from('endobj \n')])
  footer = Buffer.concat([footer, Buffer.from('trailer\n')])
  footer = Buffer.concat([footer, Buffer.from('\n')])
  footer = Buffer.concat([footer, Buffer.from('<<\n')])
  footer = Buffer.concat([footer, Buffer.from('/Root 1 0 R\n')])
  footer = Buffer.concat([footer, Buffer.from('>>\n')])
  footer = Buffer.concat([footer, Buffer.from('%%EOF\n')])

  let body = Buffer.from([])
  Object.entries(data).forEach(([key, value]) => {
    body = Buffer.concat([body, Buffer.from('<<\n')])
    body = Buffer.concat([body, Buffer.from('/T (')])
    body = Buffer.concat([body, convertUTF16(key.toString())])
    body = Buffer.concat([body, Buffer.from(')\n')])
    body = Buffer.concat([body, Buffer.from('/V (')])
    body = Buffer.concat([body, convertUTF16(value.toString())])
    body = Buffer.concat([body, Buffer.from(')\n')])
    body = Buffer.concat([body, Buffer.from('>>\n')])
  })

  return Buffer.concat([header, body, footer])
}

module.exports = generateFDF
