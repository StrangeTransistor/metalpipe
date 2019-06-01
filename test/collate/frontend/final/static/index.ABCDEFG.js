"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  'use strict';

  var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  var index = 42;

  var factory = function factory() {
    return function () {};
  };

  var noop3 = factory();

  function curry(fn) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return function () {
      for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
        _args[_key] = arguments[_key];
      }

      return function (rest) {
        return rest.length >= fn.length ? fn.apply(void 0, _toConsumableArray(rest)) : curry(fn, rest);
      }([].concat(_toConsumableArray(args), _args));
    };
  }

  function other$1() {
    return 'Other';
  }

  function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
  }

  function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
  }

  var cachedSetTimeout = defaultSetTimout;
  var cachedClearTimeout = defaultClearTimeout;

  if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
  }

  if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
  }

  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      return setTimeout(fun, 0);
    }

    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }

    try {
      return cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e) {
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }

  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      return clearTimeout(marker);
    }

    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }

    try {
      return cachedClearTimeout(marker);
    } catch (e) {
      try {
        return cachedClearTimeout.call(null, marker);
      } catch (e) {
        return cachedClearTimeout.call(this, marker);
      }
    }
  }

  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }

    draining = false;

    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }

    if (queue.length) {
      drainQueue();
    }
  }

  function drainQueue() {
    if (draining) {
      return;
    }

    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;

    while (len) {
      currentQueue = queue;
      queue = [];

      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }

      queueIndex = -1;
      len = queue.length;
    }

    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }

  function nextTick(fun) {
    var args = new Array(arguments.length - 1);

    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }

    queue.push(new Item(fun, args));

    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue);
    }
  }

  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }

  Item.prototype.run = function () {
    this.fun.apply(null, this.array);
  };

  var title = 'browser';
  var platform = 'browser';
  var browser = true;
  var env = {};
  var argv = [];
  var version = '';
  var versions = {};
  var release = {};
  var config = {};

  function noop() {}

  var on = noop;
  var addListener = noop;
  var once = noop;
  var off = noop;
  var removeListener = noop;
  var removeAllListeners = noop;
  var emit = noop;

  function binding(name) {
    throw new Error('process.binding is not supported');
  }

  function cwd() {
    return '/';
  }

  function chdir(dir) {
    throw new Error('process.chdir is not supported');
  }

  function umask() {
    return 0;
  }

  var performance = global$1.performance || {};

  var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
    return new Date().getTime();
  };

  function hrtime(previousTimestamp) {
    var clocktime = performanceNow.call(performance) * 1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor(clocktime % 1 * 1e9);

    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];

      if (nanoseconds < 0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }

    return [seconds, nanoseconds];
  }

  var startTime = new Date();

  function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
  }

  var p = {
    nextTick: nextTick,
    title: title,
    browser: browser,
    env: env,
    argv: argv,
    version: version,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform,
    release: release,
    config: config,
    uptime: uptime
  };
  var pug_static = "<div>Some Static</div>";
  var require$$0 = {};
  var pug_has_own_property = Object.prototype.hasOwnProperty;
  var merge = pug_merge;

  function pug_merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];

      for (var i = 1; i < a.length; i++) {
        attrs = pug_merge(attrs, a[i]);
      }

      return attrs;
    }

    for (var key in b) {
      if (key === 'class') {
        var valA = a[key] || [];
        a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
      } else if (key === 'style') {
        var valA = pug_style(a[key]);
        valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
        var valB = pug_style(b[key]);
        valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
        a[key] = valA + valB;
      } else {
        a[key] = b[key];
      }
    }

    return a;
  }

  var classes = pug_classes;

  function pug_classes_array(val, escaping) {
    var classString = '',
        className,
        padding = '',
        escapeEnabled = Array.isArray(escaping);

    for (var i = 0; i < val.length; i++) {
      className = pug_classes(val[i]);
      if (!className) continue;
      escapeEnabled && escaping[i] && (className = pug_escape(className));
      classString = classString + padding + className;
      padding = ' ';
    }

    return classString;
  }

  function pug_classes_object(val) {
    var classString = '',
        padding = '';

    for (var key in val) {
      if (key && val[key] && pug_has_own_property.call(val, key)) {
        classString = classString + padding + key;
        padding = ' ';
      }
    }

    return classString;
  }

  function pug_classes(val, escaping) {
    if (Array.isArray(val)) {
      return pug_classes_array(val, escaping);
    } else if (val && _typeof(val) === 'object') {
      return pug_classes_object(val);
    } else {
      return val || '';
    }
  }

  var style = pug_style;

  function pug_style(val) {
    if (!val) return '';

    if (_typeof(val) === 'object') {
      var out = '';

      for (var style in val) {
        if (pug_has_own_property.call(val, style)) {
          out = out + style + ':' + val[style] + ';';
        }
      }

      return out;
    } else {
      return val + '';
    }
  }

  var attr = pug_attr;

  function pug_attr(key, val, escaped, terse) {
    if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
      return '';
    }

    if (val === true) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    }

    if (typeof val.toJSON === 'function') {
      val = val.toJSON();
    }

    if (typeof val !== 'string') {
      val = JSON.stringify(val);

      if (!escaped && val.indexOf('"') !== -1) {
        return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
      }
    }

    if (escaped) val = pug_escape(val);
    return ' ' + key + '="' + val + '"';
  }

  var attrs = pug_attrs;

  function pug_attrs(obj, terse) {
    var attrs = '';

    for (var key in obj) {
      if (pug_has_own_property.call(obj, key)) {
        var val = obj[key];

        if ('class' === key) {
          val = pug_classes(val);
          attrs = pug_attr(key, val, false, terse) + attrs;
          continue;
        }

        if ('style' === key) {
          val = pug_style(val);
        }

        attrs += pug_attr(key, val, false, terse);
      }
    }

    return attrs;
  }

  var pug_match_html = /["&<>]/;
  var escape = pug_escape;

  function pug_escape(_html) {
    var html = '' + _html;
    var regexResult = pug_match_html.exec(html);
    if (!regexResult) return _html;
    var result = '';
    var i, lastIndex, escape;

    for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
      switch (html.charCodeAt(i)) {
        case 34:
          escape = '&quot;';
          break;

        case 38:
          escape = '&amp;';
          break;

        case 60:
          escape = '&lt;';
          break;

        case 62:
          escape = '&gt;';
          break;

        default:
          continue;
      }

      if (lastIndex !== i) result += html.substring(lastIndex, i);
      lastIndex = i + 1;
      result += escape;
    }

    if (lastIndex !== i) return result + html.substring(lastIndex, i);else return result;
  }

  var rethrow = pug_rethrow;

  function pug_rethrow(err, filename, lineno, str) {
    if (!(err instanceof Error)) throw err;

    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }

    try {
      str = str || require$$0.readFileSync(filename, 'utf8');
    } catch (ex) {
      pug_rethrow(err, null, lineno);
    }

    var context = 3,
        lines = str.split('\n'),
        start = Math.max(lineno - context, 0),
        end = Math.min(lines.length, lineno + context);
    var context = lines.slice(start, end).map(function (line, i) {
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;
    }).join('\n');
    err.path = filename;
    err.message = (filename || 'Pug') + ':' + lineno + '\n' + context + '\n\n' + err.message;
    throw err;
  }

  var pugRuntime = {
    merge: merge,
    classes: classes,
    style: style,
    attr: attr,
    attrs: attrs,
    escape: escape,
    rethrow: rethrow
  };

  function pug(locals) {
    var pug_html = "",
        pug_interp;
    var pug_debug_filename, pug_debug_line;

    try {
      var pug_debug_sources = {};
      var locals_for_with = locals || {};
      (function (other, some) {
        pug_html = pug_html + "<!DOCTYPE html>";
        pug_html = pug_html + "<head>";
        pug_html = pug_html + "<meta charset=\"utf-8\">";
        pug_html = pug_html + "<title>";
        pug_html = pug_html + "index</title>";
        pug_html = pug_html + "<link rel=\"stylesheet\" href=\"index.css\">";
        pug_html = pug_html + "<script src=\"static/index.js\"></script></head>";
        pug_html = pug_html + "<body>";
        pug_html = pug_html + "<div class=\"some\">";
        pug_html = pug_html + pugRuntime.escape(null == (pug_interp = some) ? "" : pug_interp) + "</div>";
        pug_html = pug_html + "<div class=\"other some\">";
        pug_html = pug_html + pugRuntime.escape(null == (pug_interp = other) ? "" : pug_interp) + "</div></body>";
      }).call(this, "other" in locals_for_with ? locals_for_with.other : typeof other !== "undefined" ? other : undefined, "some" in locals_for_with ? locals_for_with.some : typeof some !== "undefined" ? some : undefined);
    } catch (err) {
      pugRuntime.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }

    return pug_html;
  }

  console.log('answer', index);
  console.log('noop', noop3);
  console.log('curry', curry);
  console.log(other$1);
  console.log(!!global$1.global);
  console.log(p);
  var yes = 'yes';
  console.log(yes);
  console.log(pug_static);
  console.log(pug({
    other: 'Other',
    some: 'Some'
  }));
})();
