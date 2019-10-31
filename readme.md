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
exports.default = require('metalpipe/prefab')('frontend', require('gulp'))
exports.default = require('metalpipe/prefab')('backend', require('gulp'))
exports.default = require('metalpipe/prefab')('library', require('gulp'))
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

## license
ISC.