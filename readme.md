# metalpipe

## pick metalpipe dep & peers (`package.json`)
```json
{
  "devDependencies":
  {
    "gulp":
      "4",

    "less":
      "3",

    "rollup":
      "1",

    "typescript":
      "^3.7",

    "metalpipe":
      "*"
  },
  "dependencies":
  {
    "pug-runtime":
      "2"
  }
}
```

## pick prefab (`gulpfile.js`)
```js
module.exports.default = require('metalpipe/prefab')('frontend', require('gulp'))
module.exports.default = require('metalpipe/prefab')('backend', require('gulp'))
module.exports.default = require('metalpipe/prefab')('library', require('gulp'))
```

## pick release commands (`package.json`)
```json
{
  "scripts":
  {
    "start": "gulp",
    "build": "gulp --final"
  }
}
```

## TODO: features
## TODO: impr test cases (all features, file names, cross false positives)

## license
ISC. © Strider, 2020.
