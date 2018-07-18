# PDF Form Utils for Node.js

A node.js toolkit that wraps [PDFTk](http://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/) to expose two essential utilities - generating a list of form fields in a pdf form and filling a pdf form using a JS object.

## Installation
```npm install --save pdf-form-utils```

## Dependencies
You must have ```pdftk``` binary in your $PATH

## Usage example of reading form Fields

```javascript
const { getFields } = require("pdf-form-utils")

console.log(getFields(sourcePath)) // path.resolve recommended for sourcePath
```

## Usage example of filling a PDF form with Express

```javascript
const fs = require("fs")
const app = require("express")()
const { generatePDF } = require("pdf-form-utils")

app.get('/form', (req, res, next) => {
  generatePDF(data, sourcePath, destinationPath, err => {
    if (err) next(err)
    else {
      res.contentType('application/pdf')
      res.download(destinationPath, 'form.filled.pdf', err => {
        if (err) next(err)
        fs.unlinkSync(destinationPath) // Delete the temporary file
      })
    }
  })
})
```

## Acknowledgements
For JS-to-FDF transform: [utf8-fdf-generator](https://www.npmjs.com/package/utf8-fdf-generator)


