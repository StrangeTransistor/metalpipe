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
module.exports.default = require('metalpipe/prefab')('frontend', require('gulp'), {})
module.exports.default = require('metalpipe/prefab')('backend', require('gulp'), {})
module.exports.default = require('metalpipe/prefab')('library', require('gulp'), {})
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
--to       - [string] - build name = 'dev' (for `release/dev`)
--to-base  - [string] - build base = 'release/' (for `release/dev`)
--to-rel   - [string] - build path inside base = ''

--final    - [bool]   - final build = false
--test     - [bool]   - test  build = dev
--once     - [bool]   - run once and stop = false
--serve    - [*]      - serve static [bool | number] where number is port = 8080
--clean    - [bool]   - clean destination = final

--hash     - [string] - hash for builds and release.json = [7 random lowercase letters for frontend --final] = null
--instance - [string] - instance name in release.json

--ignore   - [string, string[]] - global stop list for all units
--minify   - [bool]   - minify content = [true for frontend --final] = false
--esm      - [bool]   - output node native esm for backend = false
--maps     - [bool]   - sourcemaps = true

--bundle   - [bool|string[]] - bundle content for backend = false
```


## virtual
### frontend ← javascript/bundle
* js: `~lib` root = `/lib/`
* js: `~metalpipe` = { final, dev, test, hash, instance }
* js: labels `dev`, `test` and `final`
* pug: global var { final, dev, test, hash, instance }
* less: global var { final, dev, test, hash, instance }
* less, pug, html: replace uris that start with `static/` in CSS and HTML to actual static
* copy plain assets `lib/assets/` → `assets/`
* copy lib assets `lib/X/assets/` → `assets/X/`
* asset hash (`static/` index.js, index.css → index.HASH.js, index.HASH.css)
* asset hash (`static/assets/` → `static/assets.HASH/`)
* copy intert stuff (`lib/copy` → `.`)


### backend
* `scripts:final`
* ignore `web/` if it contains gulpfile
* js: labels `dev`, `test` and `final`


## license
ISC. © Strider, 2022.
