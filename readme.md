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

    "postcss":
      "8",

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

## opts
```sh
--to       - [string] - build destination = 'release/dev/'

--final    - [bool]   - final build = false
--once     - [bool]   - run once and stop = false
--serve    - [*]      - serve static [bool | number] where number is port = 8080

--hash     - [string] - hash for builds and release.json = [7 random lowercase letters for frontend --final] = null
--instance - [string] - instance name in release.json

--minify   - [bool]   - minify content = [true for frontend --final] = false
--maps     - [bool]   - sourcemaps = true
--cjs      - [bool]   - compatibility with synthetic imports (mostly for React plugins to work) = false
```

## virtual
### frontend ← javascript/bundle
* js: `~lib` root = ./lib/
* js: `~metalpipe` = { dev }
* pug: global var { dev }
* less: global var { dev }
* less, pug, html: replace uris that start with static/ in CSS and HTML to actual static

## TODO: inline-resources css (postcss inline), html (web-resource-inliner)
## TODO: obfuscate
## TODO: features
## TODO: impr test cases (all features, file names, cross false positives)
## TODO: sourcemaps

## license
ISC. © Strider, 2021.
