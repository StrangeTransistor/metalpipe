'use strict';

require('console-ultimate');


var Context = require('metalpipe/Context');
var Backend = require('metalpipe/prefab/backend');


exports.default = Backend(Context({ gulp: require('gulp') }));
