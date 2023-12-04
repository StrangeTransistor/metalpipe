"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function () {
  'use strict';

  var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  var index = 42;
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }
  var factory = function factory() {
    return function () {};
  };
  var noopFactory = factory;
  var noop3 = noopFactory();
  var noop$1 = /*@__PURE__*/getDefaultExportFromCjs(noop3);

  /**
   * taken from the last comment of https://gist.github.com/mkuklis/5294248
   * Returns a curried equivalent of the provided function. The curried function
   * has two unusual capabilities. First, its arguments needn't be provided one
   * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
   * following are equivalent:
   *
   *   - `g(1)(2)(3)`
   *   - `g(1)(2, 3)`
   *   - `g(1, 2)(3)`
   *   - `g(1, 2, 3)`
   *
   * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
   * "gaps", allowing partial application of any combination of arguments,
   * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
   * the following are equivalent:
   *
   *   - `g(1, 2, 3)`
   *   - `g(_, 2, 3)(1)`
   *   - `g(_, _, 3)(1)(2)`
   *   - `g(_, _, 3)(1, 2)`
   *   - `g(_, 2)(1)(3)`
   *   - `g(_, 2)(1, 3)`
   *   - `g(_, 2)(_, 3)(1)`
   *
   * @func
   * @category Function
   * @sig (* -> a) -> (* -> a)
   * @param {Function} fn The function to curry.
   * @return {Function} A new, curried function.
   * @example
   *
   *      const addFourNumbers = (a, b, c, d) => a + b + c + d;
   *
   *      const curriedAddFourNumbers = R.curry(addFourNumbers);
   *      const f = curriedAddFourNumbers(1, 2);
   *      const g = f(3);
   *      g(4); //=> 10
   */
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
  function other$2() {
    return 'Other';
  }
  var foo1 = 'foo1';
  var answer = index;
  var mixed = foo1;
  var cjs = {
    cjs: 'yes',
    answer: answer,
    mixed: mixed
  };
  var cjs$1 = /*@__PURE__*/getDefaultExportFromCjs(cjs);
  var other$1 = "json";
  var json = {
    other: other$1
  };
  var custom_opt$1 = "ABCDEFG_0.0.0";
  var version$1 = "0.0.0";
  var final$1 = true;
  var dev$1 = false;
  var test$1 = false;
  var hash$1 = "ABCDEFG";
  var instance$1 = null;

  // shim for using process in browser
  // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

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
      //normal enviroments in sane situations
      return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }
    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      //normal enviroments in sane situations
      return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }
    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return cachedClearTimeout(marker);
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
        return cachedClearTimeout.call(null, marker);
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
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
  // v8 likes predictible objects
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
  var version = ''; // empty string to avoid regexp issues
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

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance = global$1.performance || {};
  var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
    return new Date().getTime();
  };

  // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime
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
  var compiler = {};

  /*
   *  Copyright 2011 Twitter, Inc.
   *  Licensed under the Apache License, Version 2.0 (the "License");
   *  you may not use this file except in compliance with the License.
   *  You may obtain a copy of the License at
   *
   *  http://www.apache.org/licenses/LICENSE-2.0
   *
   *  Unless required by applicable law or agreed to in writing, software
   *  distributed under the License is distributed on an "AS IS" BASIS,
   *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   *  See the License for the specific language governing permissions and
   *  limitations under the License.
   */

  (function (exports) {
    (function (Hogan) {
      // Setup regex  assignments
      // remove whitespace according to Mustache spec
      var rIsWhitespace = /\S/,
        rQuot = /\"/g,
        rNewline = /\n/g,
        rCr = /\r/g,
        rSlash = /\\/g,
        rLineSep = /\u2028/,
        rParagraphSep = /\u2029/;
      Hogan.tags = {
        '#': 1,
        '^': 2,
        '<': 3,
        '$': 4,
        '/': 5,
        '!': 6,
        '>': 7,
        '=': 8,
        '_v': 9,
        '{': 10,
        '&': 11,
        '_t': 12
      };
      Hogan.scan = function scan(text, delimiters) {
        var len = text.length,
          IN_TEXT = 0,
          IN_TAG_TYPE = 1,
          IN_TAG = 2,
          state = IN_TEXT,
          tagType = null,
          tag = null,
          buf = '',
          tokens = [],
          seenTag = false,
          i = 0,
          lineStart = 0,
          otag = '{{',
          ctag = '}}';
        function addBuf() {
          if (buf.length > 0) {
            tokens.push({
              tag: '_t',
              text: new String(buf)
            });
            buf = '';
          }
        }
        function lineIsWhitespace() {
          var isAllWhitespace = true;
          for (var j = lineStart; j < tokens.length; j++) {
            isAllWhitespace = Hogan.tags[tokens[j].tag] < Hogan.tags['_v'] || tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null;
            if (!isAllWhitespace) {
              return false;
            }
          }
          return isAllWhitespace;
        }
        function filterLine(haveSeenTag, noNewLine) {
          addBuf();
          if (haveSeenTag && lineIsWhitespace()) {
            for (var j = lineStart, next; j < tokens.length; j++) {
              if (tokens[j].text) {
                if ((next = tokens[j + 1]) && next.tag == '>') {
                  // set indent to token value
                  next.indent = tokens[j].text.toString();
                }
                tokens.splice(j, 1);
              }
            }
          } else if (!noNewLine) {
            tokens.push({
              tag: '\n'
            });
          }
          seenTag = false;
          lineStart = tokens.length;
        }
        function changeDelimiters(text, index) {
          var close = '=' + ctag,
            closeIndex = text.indexOf(close, index),
            delimiters = trim(text.substring(text.indexOf('=', index) + 1, closeIndex)).split(' ');
          otag = delimiters[0];
          ctag = delimiters[delimiters.length - 1];
          return closeIndex + close.length - 1;
        }
        if (delimiters) {
          delimiters = delimiters.split(' ');
          otag = delimiters[0];
          ctag = delimiters[1];
        }
        for (i = 0; i < len; i++) {
          if (state == IN_TEXT) {
            if (tagChange(otag, text, i)) {
              --i;
              addBuf();
              state = IN_TAG_TYPE;
            } else {
              if (text.charAt(i) == '\n') {
                filterLine(seenTag);
              } else {
                buf += text.charAt(i);
              }
            }
          } else if (state == IN_TAG_TYPE) {
            i += otag.length - 1;
            tag = Hogan.tags[text.charAt(i + 1)];
            tagType = tag ? text.charAt(i + 1) : '_v';
            if (tagType == '=') {
              i = changeDelimiters(text, i);
              state = IN_TEXT;
            } else {
              if (tag) {
                i++;
              }
              state = IN_TAG;
            }
            seenTag = i;
          } else {
            if (tagChange(ctag, text, i)) {
              tokens.push({
                tag: tagType,
                n: trim(buf),
                otag: otag,
                ctag: ctag,
                i: tagType == '/' ? seenTag - otag.length : i + ctag.length
              });
              buf = '';
              i += ctag.length - 1;
              state = IN_TEXT;
              if (tagType == '{') {
                if (ctag == '}}') {
                  i++;
                } else {
                  cleanTripleStache(tokens[tokens.length - 1]);
                }
              }
            } else {
              buf += text.charAt(i);
            }
          }
        }
        filterLine(seenTag, true);
        return tokens;
      };
      function cleanTripleStache(token) {
        if (token.n.substr(token.n.length - 1) === '}') {
          token.n = token.n.substring(0, token.n.length - 1);
        }
      }
      function trim(s) {
        if (s.trim) {
          return s.trim();
        }
        return s.replace(/^\s*|\s*$/g, '');
      }
      function tagChange(tag, text, index) {
        if (text.charAt(index) != tag.charAt(0)) {
          return false;
        }
        for (var i = 1, l = tag.length; i < l; i++) {
          if (text.charAt(index + i) != tag.charAt(i)) {
            return false;
          }
        }
        return true;
      }

      // the tags allowed inside super templates
      var allowedInSuper = {
        '_t': true,
        '\n': true,
        '$': true,
        '/': true
      };
      function buildTree(tokens, kind, stack, customTags) {
        var instructions = [],
          opener = null,
          tail = null,
          token = null;
        tail = stack[stack.length - 1];
        while (tokens.length > 0) {
          token = tokens.shift();
          if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
            throw new Error('Illegal content in < super tag.');
          }
          if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
            stack.push(token);
            token.nodes = buildTree(tokens, token.tag, stack, customTags);
          } else if (token.tag == '/') {
            if (stack.length === 0) {
              throw new Error('Closing tag without opener: /' + token.n);
            }
            opener = stack.pop();
            if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
              throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
            }
            opener.end = token.i;
            return instructions;
          } else if (token.tag == '\n') {
            token.last = tokens.length == 0 || tokens[0].tag == '\n';
          }
          instructions.push(token);
        }
        if (stack.length > 0) {
          throw new Error('missing closing tag: ' + stack.pop().n);
        }
        return instructions;
      }
      function isOpener(token, tags) {
        for (var i = 0, l = tags.length; i < l; i++) {
          if (tags[i].o == token.n) {
            token.tag = '#';
            return true;
          }
        }
      }
      function isCloser(close, open, tags) {
        for (var i = 0, l = tags.length; i < l; i++) {
          if (tags[i].c == close && tags[i].o == open) {
            return true;
          }
        }
      }
      function stringifySubstitutions(obj) {
        var items = [];
        for (var key in obj) {
          items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
        }
        return "{ " + items.join(",") + " }";
      }
      function stringifyPartials(codeObj) {
        var partials = [];
        for (var key in codeObj.partials) {
          partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
        }
        return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
      }
      Hogan.stringify = function (codeObj, text, options) {
        return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) + "}";
      };
      var serialNo = 0;
      Hogan.generate = function (tree, text, options) {
        serialNo = 0;
        var context = {
          code: '',
          subs: {},
          partials: {}
        };
        Hogan.walk(tree, context);
        if (options.asString) {
          return this.stringify(context, text, options);
        }
        return this.makeTemplate(context, text, options);
      };
      Hogan.wrapMain = function (code) {
        return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
      };
      Hogan.template = Hogan.Template;
      Hogan.makeTemplate = function (codeObj, text, options) {
        var template = this.makePartials(codeObj);
        template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
        return new this.template(template, text, this, options);
      };
      Hogan.makePartials = function (codeObj) {
        var key,
          template = {
            subs: {},
            partials: codeObj.partials,
            name: codeObj.name
          };
        for (key in template.partials) {
          template.partials[key] = this.makePartials(template.partials[key]);
        }
        for (key in codeObj.subs) {
          template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
        }
        return template;
      };
      function esc(s) {
        return s.replace(rSlash, '\\\\').replace(rQuot, '\\\"').replace(rNewline, '\\n').replace(rCr, '\\r').replace(rLineSep, "\\u2028").replace(rParagraphSep, "\\u2029");
      }
      function chooseMethod(s) {
        return ~s.indexOf('.') ? 'd' : 'f';
      }
      function createPartial(node, context) {
        var prefix = "<" + (context.prefix || "");
        var sym = prefix + node.n + serialNo++;
        context.partials[sym] = {
          name: node.n,
          partials: {}
        };
        context.code += 't.b(t.rp("' + esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
        return sym;
      }
      Hogan.codegen = {
        '#': function _(node, context) {
          context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' + 'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' + 't.rs(c,p,' + 'function(c,p,t){';
          Hogan.walk(node.nodes, context);
          context.code += '});c.pop();}';
        },
        '^': function _(node, context) {
          context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
          Hogan.walk(node.nodes, context);
          context.code += '};';
        },
        '>': createPartial,
        '<': function _(node, context) {
          var ctx = {
            partials: {},
            code: '',
            subs: {},
            inPartial: true
          };
          Hogan.walk(node.nodes, ctx);
          var template = context.partials[createPartial(node, context)];
          template.subs = ctx.subs;
          template.partials = ctx.partials;
        },
        '$': function $(node, context) {
          var ctx = {
            subs: {},
            code: '',
            partials: context.partials,
            prefix: node.n
          };
          Hogan.walk(node.nodes, ctx);
          context.subs[node.n] = ctx.code;
          if (!context.inPartial) {
            context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
          }
        },
        '\n': function _(node, context) {
          context.code += write('"\\n"' + (node.last ? '' : ' + i'));
        },
        '_v': function _v(node, context) {
          context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
        },
        '_t': function _t(node, context) {
          context.code += write('"' + esc(node.text) + '"');
        },
        '{': tripleStache,
        '&': tripleStache
      };
      function tripleStache(node, context) {
        context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
      }
      function write(s) {
        return 't.b(' + s + ');';
      }
      Hogan.walk = function (nodelist, context) {
        var func;
        for (var i = 0, l = nodelist.length; i < l; i++) {
          func = Hogan.codegen[nodelist[i].tag];
          func && func(nodelist[i], context);
        }
        return context;
      };
      Hogan.parse = function (tokens, text, options) {
        options = options || {};
        return buildTree(tokens, '', [], options.sectionTags || []);
      };
      Hogan.cache = {};
      Hogan.cacheKey = function (text, options) {
        return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
      };
      Hogan.compile = function (text, options) {
        options = options || {};
        var key = Hogan.cacheKey(text, options);
        var template = this.cache[key];
        if (template) {
          var partials = template.partials;
          for (var name in partials) {
            delete partials[name].instance;
          }
          return template;
        }
        template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
        return this.cache[key] = template;
      };
    })(exports);
  })(compiler);
  var template = {};

  /*
   *  Copyright 2011 Twitter, Inc.
   *  Licensed under the Apache License, Version 2.0 (the "License");
   *  you may not use this file except in compliance with the License.
   *  You may obtain a copy of the License at
   *
   *  http://www.apache.org/licenses/LICENSE-2.0
   *
   *  Unless required by applicable law or agreed to in writing, software
   *  distributed under the License is distributed on an "AS IS" BASIS,
   *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   *  See the License for the specific language governing permissions and
   *  limitations under the License.
   */

  (function (exports) {
    (function (Hogan) {
      Hogan.Template = function (codeObj, text, compiler, options) {
        codeObj = codeObj || {};
        this.r = codeObj.code || this.r;
        this.c = compiler;
        this.options = options || {};
        this.text = text || '';
        this.partials = codeObj.partials || {};
        this.subs = codeObj.subs || {};
        this.buf = '';
      };
      Hogan.Template.prototype = {
        // render: replaced by generated code.
        r: function r(context, partials, indent) {
          return '';
        },
        // variable escaping
        v: hoganEscape,
        // triple stache
        t: coerceToString,
        render: function render(context, partials, indent) {
          return this.ri([context], partials || {}, indent);
        },
        // render internal -- a hook for overrides that catches partials too
        ri: function ri(context, partials, indent) {
          return this.r(context, partials, indent);
        },
        // ensurePartial
        ep: function ep(symbol, partials) {
          var partial = this.partials[symbol];

          // check to see that if we've instantiated this partial before
          var template = partials[partial.name];
          if (partial.instance && partial.base == template) {
            return partial.instance;
          }
          if (typeof template == 'string') {
            if (!this.c) {
              throw new Error("No compiler available.");
            }
            template = this.c.compile(template, this.options);
          }
          if (!template) {
            return null;
          }

          // We use this to check whether the partials dictionary has changed
          this.partials[symbol].base = template;
          if (partial.subs) {
            // Make sure we consider parent template now
            if (!partials.stackText) partials.stackText = {};
            for (key in partial.subs) {
              if (!partials.stackText[key]) {
                partials.stackText[key] = this.activeSub !== undefined && partials.stackText[this.activeSub] ? partials.stackText[this.activeSub] : this.text;
              }
            }
            template = createSpecializedPartial(template, partial.subs, partial.partials, this.stackSubs, this.stackPartials, partials.stackText);
          }
          this.partials[symbol].instance = template;
          return template;
        },
        // tries to find a partial in the current scope and render it
        rp: function rp(symbol, context, partials, indent) {
          var partial = this.ep(symbol, partials);
          if (!partial) {
            return '';
          }
          return partial.ri(context, partials, indent);
        },
        // render a section
        rs: function rs(context, partials, section) {
          var tail = context[context.length - 1];
          if (!isArray(tail)) {
            section(context, partials, this);
            return;
          }
          for (var i = 0; i < tail.length; i++) {
            context.push(tail[i]);
            section(context, partials, this);
            context.pop();
          }
        },
        // maybe start a section
        s: function s(val, ctx, partials, inverted, start, end, tags) {
          var pass;
          if (isArray(val) && val.length === 0) {
            return false;
          }
          if (typeof val == 'function') {
            val = this.ms(val, ctx, partials, inverted, start, end, tags);
          }
          pass = !!val;
          if (!inverted && pass && ctx) {
            ctx.push(_typeof(val) == 'object' ? val : ctx[ctx.length - 1]);
          }
          return pass;
        },
        // find values with dotted names
        d: function d(key, ctx, partials, returnFound) {
          var found,
            names = key.split('.'),
            val = this.f(names[0], ctx, partials, returnFound),
            doModelGet = this.options.modelGet,
            cx = null;
          if (key === '.' && isArray(ctx[ctx.length - 2])) {
            val = ctx[ctx.length - 1];
          } else {
            for (var i = 1; i < names.length; i++) {
              found = findInScope(names[i], val, doModelGet);
              if (found !== undefined) {
                cx = val;
                val = found;
              } else {
                val = '';
              }
            }
          }
          if (returnFound && !val) {
            return false;
          }
          if (!returnFound && typeof val == 'function') {
            ctx.push(cx);
            val = this.mv(val, ctx, partials);
            ctx.pop();
          }
          return val;
        },
        // find values with normal names
        f: function f(key, ctx, partials, returnFound) {
          var val = false,
            v = null,
            found = false,
            doModelGet = this.options.modelGet;
          for (var i = ctx.length - 1; i >= 0; i--) {
            v = ctx[i];
            val = findInScope(key, v, doModelGet);
            if (val !== undefined) {
              found = true;
              break;
            }
          }
          if (!found) {
            return returnFound ? false : "";
          }
          if (!returnFound && typeof val == 'function') {
            val = this.mv(val, ctx, partials);
          }
          return val;
        },
        // higher order templates
        ls: function ls(func, cx, partials, text, tags) {
          var oldTags = this.options.delimiters;
          this.options.delimiters = tags;
          this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
          this.options.delimiters = oldTags;
          return false;
        },
        // compile text
        ct: function ct(text, cx, partials) {
          if (this.options.disableLambda) {
            throw new Error('Lambda features disabled.');
          }
          return this.c.compile(text, this.options).render(cx, partials);
        },
        // template result buffering
        b: function b(s) {
          this.buf += s;
        },
        fl: function fl() {
          var r = this.buf;
          this.buf = '';
          return r;
        },
        // method replace section
        ms: function ms(func, ctx, partials, inverted, start, end, tags) {
          var textSource,
            cx = ctx[ctx.length - 1],
            result = func.call(cx);
          if (typeof result == 'function') {
            if (inverted) {
              return true;
            } else {
              textSource = this.activeSub && this.subsText && this.subsText[this.activeSub] ? this.subsText[this.activeSub] : this.text;
              return this.ls(result, cx, partials, textSource.substring(start, end), tags);
            }
          }
          return result;
        },
        // method replace variable
        mv: function mv(func, ctx, partials) {
          var cx = ctx[ctx.length - 1];
          var result = func.call(cx);
          if (typeof result == 'function') {
            return this.ct(coerceToString(result.call(cx)), cx, partials);
          }
          return result;
        },
        sub: function sub(name, context, partials, indent) {
          var f = this.subs[name];
          if (f) {
            this.activeSub = name;
            f(context, partials, this, indent);
            this.activeSub = false;
          }
        }
      };

      //Find a key in an object
      function findInScope(key, scope, doModelGet) {
        var val;
        if (scope && _typeof(scope) == 'object') {
          if (scope[key] !== undefined) {
            val = scope[key];

            // try lookup with get for backbone or similar model data
          } else if (doModelGet && scope.get && typeof scope.get == 'function') {
            val = scope.get(key);
          }
        }
        return val;
      }
      function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
        function PartialTemplate() {}
        PartialTemplate.prototype = instance;
        function Substitutions() {}
        Substitutions.prototype = instance.subs;
        var key;
        var partial = new PartialTemplate();
        partial.subs = new Substitutions();
        partial.subsText = {}; //hehe. substext.
        partial.buf = '';
        stackSubs = stackSubs || {};
        partial.stackSubs = stackSubs;
        partial.subsText = stackText;
        for (key in subs) {
          if (!stackSubs[key]) stackSubs[key] = subs[key];
        }
        for (key in stackSubs) {
          partial.subs[key] = stackSubs[key];
        }
        stackPartials = stackPartials || {};
        partial.stackPartials = stackPartials;
        for (key in partials) {
          if (!stackPartials[key]) stackPartials[key] = partials[key];
        }
        for (key in stackPartials) {
          partial.partials[key] = stackPartials[key];
        }
        return partial;
      }
      var rAmp = /&/g,
        rLt = /</g,
        rGt = />/g,
        rApos = /\'/g,
        rQuot = /\"/g,
        hChars = /[&<>\"\']/;
      function coerceToString(val) {
        return String(val === null || val === undefined ? '' : val);
      }
      function hoganEscape(str) {
        str = coerceToString(str);
        return hChars.test(str) ? str.replace(rAmp, '&amp;').replace(rLt, '&lt;').replace(rGt, '&gt;').replace(rApos, '&#39;').replace(rQuot, '&quot;') : str;
      }
      var isArray = Array.isArray || function (a) {
        return Object.prototype.toString.call(a) === '[object Array]';
      };
    })(exports);
  })(template);

  /*
   *  Copyright 2011 Twitter, Inc.
   *  Licensed under the Apache License, Version 2.0 (the "License");
   *  you may not use this file except in compliance with the License.
   *  You may obtain a copy of the License at
   *
   *  http://www.apache.org/licenses/LICENSE-2.0
   *
   *  Unless required by applicable law or agreed to in writing, software
   *  distributed under the License is distributed on an "AS IS" BASIS,
   *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   *  See the License for the specific language governing permissions and
   *  limitations under the License.
   */

  // This file is for use with Node.js. See dist/ for browser files.

  var Hogan = compiler;
  Hogan.Template = template.Template;
  Hogan.template = Hogan.Template;
  var hogan = Hogan;
  var Hogan$1 = /*@__PURE__*/getDefaultExportFromCjs(hogan);
  var mst = new Hogan$1.Template({
    code: function code(c, p, i) {
      var t = this;
      t.b(i = i || "");
      t.b(t.v(t.f("data", c, p, 0)));
      return t.fl();
    },
    partials: {},
    subs: {}
  });
  var pug_static = "<div>Some Static</div><div class=\"dev\">false</div><div class=\"test\">false</div><div class=\"final\">true</div><div class=\"hash\">ABCDEFG</div><div class=\"instance\"></div><div class=\"custom\">ABCDEFG_0.0.0</div>";
  var pugRuntime = {};
  var require$$0 = {};
  var pug_has_own_property = Object.prototype.hasOwnProperty;

  /**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */

  pugRuntime.merge = pug_merge;
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
  /**
   * Process array, object, or string as a string of classes delimited by a space.
   *
   * If `val` is an array, all members of it and its subarrays are counted as
   * classes. If `escaping` is an array, then whether or not the item in `val` is
   * escaped depends on the corresponding item in `escaping`. If `escaping` is
   * not an array, no escaping is done.
   *
   * If `val` is an object, all the keys whose value is truthy are counted as
   * classes. No escaping is done.
   *
   * If `val` is a string, it is counted as a class. No escaping is done.
   *
   * @param {(Array.<string>|Object.<string, boolean>|string)} val
   * @param {?Array.<string>} escaping
   * @return {String}
   */
  pugRuntime.classes = pug_classes;
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

  /**
   * Convert object or string to a string of CSS styles delimited by a semicolon.
   *
   * @param {(Object.<string, string>|string)} val
   * @return {String}
   */

  pugRuntime.style = pug_style;
  function pug_style(val) {
    if (!val) return '';
    if (_typeof(val) === 'object') {
      var out = '';
      for (var style in val) {
        /* istanbul ignore else */
        if (pug_has_own_property.call(val, style)) {
          out = out + style + ':' + val[style] + ';';
        }
      }
      return out;
    } else {
      return val + '';
    }
  }
  /**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */
  pugRuntime.attr = pug_attr;
  function pug_attr(key, val, escaped, terse) {
    if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
      return '';
    }
    if (val === true) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    }
    var type = _typeof(val);
    if ((type === 'object' || type === 'function') && typeof val.toJSON === 'function') {
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
  /**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} terse whether to use HTML5 terse boolean attributes
   * @return {String}
   */
  pugRuntime.attrs = pug_attrs;
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
  /**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */

  var pug_match_html = /["&<>]/;
  pugRuntime.escape = pug_escape;
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
  /**
   * Re-throw the given `err` in context to the
   * the pug in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @param {String} str original source
   * @api private
   */

  pugRuntime.rethrow = pug_rethrow;
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

    // Error context
    var context = lines.slice(start, end).map(function (line, i) {
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;
    }).join('\n');

    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Pug') + ':' + lineno + '\n' + context + '\n\n' + err.message;
    throw err;
  }
  function pug(locals) {
    var pug_html = "",
      pug_interp;
    var pug_debug_filename, pug_debug_line;
    try {
      var pug_debug_sources = {};
      ;
      var locals_for_with = locals || {};
      (function (custom_opt, dev, final, hash, instance, other, some, test) {
        pug_html = pug_html + "<!DOCTYPE html>";
        pug_html = pug_html + "<head>";
        pug_html = pug_html + "<meta charset=\"utf-8\">";
        pug_html = pug_html + "<title>";
        pug_html = pug_html + "index</title>";
        pug_html = pug_html + "<link rel=\"stylesheet\" href=\"static/index.css\">";
        pug_html = pug_html + "<script src=\"static/index.js\"></script></head>";
        pug_html = pug_html + "<body>";
        pug_html = pug_html + "<div class=\"some\">";
        pug_html = pug_html + pugRuntime.escape(null == (pug_interp = some) ? "" : pug_interp) + "</div>";
        pug_html = pug_html + "<div class=\"other some\">";
        pug_html = pug_html + pugRuntime.escape(null == (pug_interp = other) ? "" : pug_interp) + "</div>";
        pug_html = pug_html + "<div class=\"dev\">";
        pug_html = pug_html + pugRuntime.escape(null == (pug_interp = dev) ? "" : pug_interp) + "</div>";
        pug_html = pug_html + "<div class=\"test\">";
        pug_html = pug_html + pugRuntime.escape(null == (pug_interp = test) ? "" : pug_interp) + "</div>";
        pug_html = pug_html + "<div class=\"final\">";
        pug_html = pug_html + pugRuntime.escape(null == (pug_interp = final) ? "" : pug_interp) + "</div>";
        pug_html = pug_html + "<div class=\"hash\">";
        pug_html = pug_html + pugRuntime.escape(null == (pug_interp = hash) ? "" : pug_interp) + "</div>";
        pug_html = pug_html + "<div class=\"instance\">";
        pug_html = pug_html + pugRuntime.escape(null == (pug_interp = instance) ? "" : pug_interp) + "</div>";
        pug_html = pug_html + "<div class=\"custom\">";
        pug_html = pug_html + pugRuntime.escape(null == (pug_interp = custom_opt) ? "" : pug_interp) + "</div>";
        if (dev) {
          pug_html = pug_html + "<div class=\"dev\">";
          pug_html = pug_html + "Yes</div>";
        }
        pug_html = pug_html + "<div class=\"bg img1\"></div>";
        pug_html = pug_html + "<img src=\"static/assets/red.png\">";
        pug_html = pug_html + "<div class=\"bg img2\"></div>";
        pug_html = pug_html + "<img src=\"static/assets/dir/violet.png\">";
        pug_html = pug_html + "<div class=\"bg img3\"></div>";
        pug_html = pug_html + "<img src=\"static/assets/index/green.png\">";
        pug_html = pug_html + "<div class=\"bg img4\"></div>";
        pug_html = pug_html + "<img src=\"static/assets/index/dir/blue.png\">";
        pug_html = pug_html + "<a href=\"localhost:8080/static/assets/red.png\"></a></body>";
      }).call(this, "custom_opt" in locals_for_with ? locals_for_with.custom_opt : typeof custom_opt !== "undefined" ? custom_opt : undefined, "dev" in locals_for_with ? locals_for_with.dev : typeof dev !== "undefined" ? dev : undefined, "final" in locals_for_with ? locals_for_with.final : typeof final !== "undefined" ? final : undefined, "hash" in locals_for_with ? locals_for_with.hash : typeof hash !== "undefined" ? hash : undefined, "instance" in locals_for_with ? locals_for_with.instance : typeof instance !== "undefined" ? instance : undefined, "other" in locals_for_with ? locals_for_with.other : typeof other !== "undefined" ? other : undefined, "some" in locals_for_with ? locals_for_with.some : typeof some !== "undefined" ? some : undefined, "test" in locals_for_with ? locals_for_with.test : typeof test !== "undefined" ? test : undefined);
    } catch (err) {
      pugRuntime.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    return pug_html;
  }
  console.log('answer', index);
  console.log('noop', noop$1);
  console.log('curry', curry);
  console.log(other$2);
  console.log(cjs$1);
  console.log(json);
  console.log(dev$1);
  console.log({
    final: final$1,
    test: test$1,
    hash: hash$1,
    instance: instance$1,
    version: version$1
  });
  console.log(custom_opt$1);
  console.log('production');
  console.log(!!global$1.global);
  console.log(p);
  var foo = {
    yes: 'yes'
  };
  console.log(foo);
  console.log(mst.render({
    data: 'yes'
  }));
  console.log(pug_static);
  console.log(pug({
    other: 'Other',
    some: 'Some'
  }));
  console.log('final');
})();