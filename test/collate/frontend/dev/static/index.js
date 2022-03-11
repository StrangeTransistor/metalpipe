(function () {
            'use strict';

            var global$1 = (typeof global !== "undefined" ? global :
                        typeof self !== "undefined" ? self :
                        typeof window !== "undefined" ? window : {});

            var index = 42;

            var factory = () => () => {};

            const noopFactory = factory;

            var noop3 = noopFactory();

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
            function curry (fn, args = []) {
              return (..._args) =>
                (rest => rest.length >= fn.length ? fn(...rest) : curry(fn, rest))([
                  ...args,
                  ..._args,
                ])
            }

            function other$2 ()
            {
            	return 'Other'
            }

            var foo1 = 'foo1';

            var answer = index;
            var mixed  = foo1;


            var cjs = { cjs: 'yes', answer, mixed };

            var other$1 = "json";
            var json = {
            	other: other$1
            };

            var dev$1 = true;

            // shim for using process in browser
            // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

            function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
            }
            function defaultClearTimeout () {
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
                } catch(e){
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                        return cachedSetTimeout.call(null, fun, 0);
                    } catch(e){
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
                } catch (e){
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                        return cachedClearTimeout.call(null, marker);
                    } catch (e){
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
                while(len) {
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

            function cwd () { return '/' }
            function chdir (dir) {
                throw new Error('process.chdir is not supported');
            }function umask() { return 0; }

            // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
            var performance = global$1.performance || {};
            var performanceNow =
              performance.now        ||
              performance.mozNow     ||
              performance.msNow      ||
              performance.oNow       ||
              performance.webkitNow  ||
              function(){ return (new Date()).getTime() };

            // generate timestamp or delta
            // see http://nodejs.org/api/process.html#process_process_hrtime
            function hrtime(previousTimestamp){
              var clocktime = performanceNow.call(performance)*1e-3;
              var seconds = Math.floor(clocktime);
              var nanoseconds = Math.floor((clocktime%1)*1e9);
              if (previousTimestamp) {
                seconds = seconds - previousTimestamp[0];
                nanoseconds = nanoseconds - previousTimestamp[1];
                if (nanoseconds<0) {
                  seconds--;
                  nanoseconds += 1e9;
                }
              }
              return [seconds,nanoseconds]
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
                  rNewline =  /\n/g,
                  rCr = /\r/g,
                  rSlash = /\\/g,
                  rLineSep = /\u2028/,
                  rParagraphSep = /\u2029/;

              Hogan.tags = {
                '#': 1, '^': 2, '<': 3, '$': 4,
                '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
                '{': 10, '&': 11, '_t': 12
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
                    tokens.push({tag: '_t', text: new String(buf)});
                    buf = '';
                  }
                }

                function lineIsWhitespace() {
                  var isAllWhitespace = true;
                  for (var j = lineStart; j < tokens.length; j++) {
                    isAllWhitespace =
                      (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
                      (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
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
                        if ((next = tokens[j+1]) && next.tag == '>') {
                          // set indent to token value
                          next.indent = tokens[j].text.toString();
                        }
                        tokens.splice(j, 1);
                      }
                    }
                  } else if (!noNewLine) {
                    tokens.push({tag:'\n'});
                  }

                  seenTag = false;
                  lineStart = tokens.length;
                }

                function changeDelimiters(text, index) {
                  var close = '=' + ctag,
                      closeIndex = text.indexOf(close, index),
                      delimiters = trim(
                        text.substring(text.indexOf('=', index) + 1, closeIndex)
                      ).split(' ');

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
                      tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                                   i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
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
              var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

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
                    token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
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

              Hogan.stringify = function(codeObj, text, options) {
                return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
              };

              var serialNo = 0;
              Hogan.generate = function(tree, text, options) {
                serialNo = 0;
                var context = { code: '', subs: {}, partials: {} };
                Hogan.walk(tree, context);

                if (options.asString) {
                  return this.stringify(context, text, options);
                }

                return this.makeTemplate(context, text, options);
              };

              Hogan.wrapMain = function(code) {
                return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
              };

              Hogan.template = Hogan.Template;

              Hogan.makeTemplate = function(codeObj, text, options) {
                var template = this.makePartials(codeObj);
                template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
                return new this.template(template, text, this, options);
              };

              Hogan.makePartials = function(codeObj) {
                var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
                for (key in template.partials) {
                  template.partials[key] = this.makePartials(template.partials[key]);
                }
                for (key in codeObj.subs) {
                  template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
                }
                return template;
              };

              function esc(s) {
                return s.replace(rSlash, '\\\\')
                        .replace(rQuot, '\\\"')
                        .replace(rNewline, '\\n')
                        .replace(rCr, '\\r')
                        .replace(rLineSep, '\\u2028')
                        .replace(rParagraphSep, '\\u2029');
              }

              function chooseMethod(s) {
                return (~s.indexOf('.')) ? 'd' : 'f';
              }

              function createPartial(node, context) {
                var prefix = "<" + (context.prefix || "");
                var sym = prefix + node.n + serialNo++;
                context.partials[sym] = {name: node.n, partials: {}};
                context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
                return sym;
              }

              Hogan.codegen = {
                '#': function(node, context) {
                  context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
                                  'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
                                  't.rs(c,p,' + 'function(c,p,t){';
                  Hogan.walk(node.nodes, context);
                  context.code += '});c.pop();}';
                },

                '^': function(node, context) {
                  context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
                  Hogan.walk(node.nodes, context);
                  context.code += '};';
                },

                '>': createPartial,
                '<': function(node, context) {
                  var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
                  Hogan.walk(node.nodes, ctx);
                  var template = context.partials[createPartial(node, context)];
                  template.subs = ctx.subs;
                  template.partials = ctx.partials;
                },

                '$': function(node, context) {
                  var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
                  Hogan.walk(node.nodes, ctx);
                  context.subs[node.n] = ctx.code;
                  if (!context.inPartial) {
                    context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
                  }
                },

                '\n': function(node, context) {
                  context.code += write('"\\n"' + (node.last ? '' : ' + i'));
                },

                '_v': function(node, context) {
                  context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
                },

                '_t': function(node, context) {
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

              Hogan.walk = function(nodelist, context) {
                var func;
                for (var i = 0, l = nodelist.length; i < l; i++) {
                  func = Hogan.codegen[nodelist[i].tag];
                  func && func(nodelist[i], context);
                }
                return context;
              };

              Hogan.parse = function(tokens, text, options) {
                options = options || {};
                return buildTree(tokens, '', [], options.sectionTags || []);
              };

              Hogan.cache = {};

              Hogan.cacheKey = function(text, options) {
                return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
              };

              Hogan.compile = function(text, options) {
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
            })(exports );
            }(compiler));

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
                r: function (context, partials, indent) { return ''; },

                // variable escaping
                v: hoganEscape,

                // triple stache
                t: coerceToString,

                render: function render(context, partials, indent) {
                  return this.ri([context], partials || {}, indent);
                },

                // render internal -- a hook for overrides that catches partials too
                ri: function (context, partials, indent) {
                  return this.r(context, partials, indent);
                },

                // ensurePartial
                ep: function(symbol, partials) {
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
                        partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
                      }
                    }
                    template = createSpecializedPartial(template, partial.subs, partial.partials,
                      this.stackSubs, this.stackPartials, partials.stackText);
                  }
                  this.partials[symbol].instance = template;

                  return template;
                },

                // tries to find a partial in the current scope and render it
                rp: function(symbol, context, partials, indent) {
                  var partial = this.ep(symbol, partials);
                  if (!partial) {
                    return '';
                  }

                  return partial.ri(context, partials, indent);
                },

                // render a section
                rs: function(context, partials, section) {
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
                s: function(val, ctx, partials, inverted, start, end, tags) {
                  var pass;

                  if (isArray(val) && val.length === 0) {
                    return false;
                  }

                  if (typeof val == 'function') {
                    val = this.ms(val, ctx, partials, inverted, start, end, tags);
                  }

                  pass = !!val;

                  if (!inverted && pass && ctx) {
                    ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
                  }

                  return pass;
                },

                // find values with dotted names
                d: function(key, ctx, partials, returnFound) {
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
                f: function(key, ctx, partials, returnFound) {
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
                    return (returnFound) ? false : "";
                  }

                  if (!returnFound && typeof val == 'function') {
                    val = this.mv(val, ctx, partials);
                  }

                  return val;
                },

                // higher order templates
                ls: function(func, cx, partials, text, tags) {
                  var oldTags = this.options.delimiters;

                  this.options.delimiters = tags;
                  this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
                  this.options.delimiters = oldTags;

                  return false;
                },

                // compile text
                ct: function(text, cx, partials) {
                  if (this.options.disableLambda) {
                    throw new Error('Lambda features disabled.');
                  }
                  return this.c.compile(text, this.options).render(cx, partials);
                },

                // template result buffering
                b: function(s) { this.buf += s; },

                fl: function() { var r = this.buf; this.buf = ''; return r; },

                // method replace section
                ms: function(func, ctx, partials, inverted, start, end, tags) {
                  var textSource,
                      cx = ctx[ctx.length - 1],
                      result = func.call(cx);

                  if (typeof result == 'function') {
                    if (inverted) {
                      return true;
                    } else {
                      textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
                      return this.ls(result, cx, partials, textSource.substring(start, end), tags);
                    }
                  }

                  return result;
                },

                // method replace variable
                mv: function(func, ctx, partials) {
                  var cx = ctx[ctx.length - 1];
                  var result = func.call(cx);

                  if (typeof result == 'function') {
                    return this.ct(coerceToString(result.call(cx)), cx, partials);
                  }

                  return result;
                },

                sub: function(name, context, partials, indent) {
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

                if (scope && typeof scope == 'object') {

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
                function PartialTemplate() {}    PartialTemplate.prototype = instance;
                function Substitutions() {}    Substitutions.prototype = instance.subs;
                var key;
                var partial = new PartialTemplate();
                partial.subs = new Substitutions();
                partial.subsText = {};  //hehe. substext.
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
                return String((val === null || val === undefined) ? '' : val);
              }

              function hoganEscape(str) {
                str = coerceToString(str);
                return hChars.test(str) ?
                  str
                    .replace(rAmp, '&amp;')
                    .replace(rLt, '&lt;')
                    .replace(rGt, '&gt;')
                    .replace(rApos, '&#39;')
                    .replace(rQuot, '&quot;') :
                  str;
              }

              var isArray = Array.isArray || function(a) {
                return Object.prototype.toString.call(a) === '[object Array]';
              };

            })(exports );
            }(template));

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

            var mst = new hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b(t.v(t.f("data",c,p,0)));return t.fl(); },partials: {}, subs: {  }});

            var pug_static = "<div>Some Static</div>";

            var pugRuntime = {};

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
              var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
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
              var classString = '', padding = '';
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
              } else if (val && typeof val === 'object') {
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
              if (typeof val === 'object') {
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
              var type = typeof val;
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
            function pug_attrs(obj, terse){
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
            function pug_escape(_html){
              var html = '' + _html;
              var regexResult = pug_match_html.exec(html);
              if (!regexResult) return _html;

              var result = '';
              var i, lastIndex, escape;
              for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
                switch (html.charCodeAt(i)) {
                  case 34: escape = '&quot;'; break;
                  case 38: escape = '&amp;'; break;
                  case 60: escape = '&lt;'; break;
                  case 62: escape = '&gt;'; break;
                  default: continue;
                }
                if (lastIndex !== i) result += html.substring(lastIndex, i);
                lastIndex = i + 1;
                result += escape;
              }
              if (lastIndex !== i) return result + html.substring(lastIndex, i);
              else return result;
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
            function pug_rethrow(err, filename, lineno, str){
              if (!(err instanceof Error)) throw err;
              if ((typeof window != 'undefined' || !filename) && !str) {
                err.message += ' on line ' + lineno;
                throw err;
              }
              try {
                str = str || require('fs').readFileSync(filename, 'utf8');
              } catch (ex) {
                pug_rethrow(err, null, lineno);
              }
              var context = 3
                , lines = str.split('\n')
                , start = Math.max(lineno - context, 0)
                , end = Math.min(lines.length, lineno + context);

              // Error context
              var context = lines.slice(start, end).map(function(line, i){
                var curr = i + start + 1;
                return (curr == lineno ? '  > ' : '    ')
                  + curr
                  + '| '
                  + line;
              }).join('\n');

              // Alter exception message
              err.path = filename;
              err.message = (filename || 'Pug') + ':' + lineno
                + '\n' + context + '\n\n' + err.message;
              throw err;
            }

            function pug(locals) {var pug_html = "", pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {};
            ;var locals_for_with = (locals || {});(function (dev, other, some) {
            pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
            pug_html = pug_html + "\u003Chead\u003E";
            pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
            pug_html = pug_html + "\u003Ctitle\u003E";
            pug_html = pug_html + "index\u003C\u002Ftitle\u003E";
            pug_html = pug_html + "\u003Clink rel=\"stylesheet\" href=\"static\u002Findex.css\"\u003E";
            pug_html = pug_html + "\u003Cscript src=\"static\u002Findex.js\"\u003E\u003C\u002Fscript\u003E\u003C\u002Fhead\u003E";
            pug_html = pug_html + "\u003Cbody\u003E";
            pug_html = pug_html + "\u003Cdiv class=\"some\"\u003E";
            pug_html = pug_html + (pugRuntime.escape(null == (pug_interp = some) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
            pug_html = pug_html + "\u003Cdiv class=\"other some\"\u003E";
            pug_html = pug_html + (pugRuntime.escape(null == (pug_interp = other) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
            pug_html = pug_html + "\u003Cdiv class=\"dev\"\u003E";
            pug_html = pug_html + (pugRuntime.escape(null == (pug_interp = dev) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
            if (dev) {
            pug_html = pug_html + "\u003Cdiv class=\"dev\"\u003E";
            pug_html = pug_html + "Yes\u003C\u002Fdiv\u003E";
            }
            pug_html = pug_html + "\u003Cdiv class=\"bg img1\"\u003E\u003C\u002Fdiv\u003E";
            pug_html = pug_html + "\u003Cimg src=\"static\u002Fassets\u002Fred.png\"\u003E";
            pug_html = pug_html + "\u003Cdiv class=\"bg img2\"\u003E\u003C\u002Fdiv\u003E";
            pug_html = pug_html + "\u003Cimg src=\"static\u002Fassets\u002Fdir\u002Fviolet.png\"\u003E";
            pug_html = pug_html + "\u003Cdiv class=\"bg img3\"\u003E\u003C\u002Fdiv\u003E";
            pug_html = pug_html + "\u003Cimg src=\"static\u002Fassets\u002Findex\u002Fgreen.png\"\u003E";
            pug_html = pug_html + "\u003Cdiv class=\"bg img4\"\u003E\u003C\u002Fdiv\u003E";
            pug_html = pug_html + "\u003Cimg src=\"static\u002Fassets\u002Findex\u002Fdir\u002Fblue.png\"\u003E";
            pug_html = pug_html + "\u003Ca href=\"localhost:8080\u002Fstatic\u002Fassets\u002Fred.png\"\u003E\u003C\u002Fa\u003E\u003C\u002Fbody\u003E";
            }.call(this,"dev" in locals_for_with?locals_for_with.dev:typeof dev!=="undefined"?dev:undefined,"other" in locals_for_with?locals_for_with.other:typeof other!=="undefined"?other:undefined,"some" in locals_for_with?locals_for_with.some:typeof some!=="undefined"?some:undefined));} catch (err) {pugRuntime.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);}return pug_html;}

            console.log('answer', index);
            console.log('noop', noop3);
            console.log('curry', curry);
            console.log(other$2);
            console.log(cjs);
            console.log(json);
            function debug (...args)
            {
            	console.log(...args);
            }
            console.log(dev$1);
            debug(1, 2, 3);

            console.log('development');

            console.log(!! global$1.global);
            console.log(p);



            var foo = { yes: 'yes' };
            console.log(foo);
            console.log(mst.render({ data: 'yes' }));
            console.log(pug_static);
            console.log(pug({ other: 'Other', some: 'Some' }));

            console.log('dev');

            console.log('test');

            debugger

})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2hvbWUvc3RyaWRlci9Qcm9qZWN0cy9tZXRhbHBpcGUvbm9kZV9tb2R1bGVzL3JvbGx1cC1wbHVnaW4tbm9kZS1nbG9iYWxzL3NyYy9nbG9iYWwuanMiLCIuLi9ob21lL3N0cmlkZXIvUHJvamVjdHMvbWV0YWxwaXBlL2ZpeHQvZnJvbnRlbmQvbm9kZV9tb2R1bGVzL3RoZS1hbnN3ZXIvZGlzdC90aGUtYW5zd2VyLmVzLmpzIiwiLi4vaG9tZS9zdHJpZGVyL1Byb2plY3RzL21ldGFscGlwZS9maXh0L2Zyb250ZW5kL25vZGVfbW9kdWxlcy9ub29wMy9mYWN0b3J5LmpzIiwiLi4vaG9tZS9zdHJpZGVyL1Byb2plY3RzL21ldGFscGlwZS9maXh0L2Zyb250ZW5kL25vZGVfbW9kdWxlcy9ub29wMy9pbmRleC5qcyIsIi4uL2hvbWUvc3RyaWRlci9Qcm9qZWN0cy9tZXRhbHBpcGUvZml4dC9mcm9udGVuZC9ub2RlX21vZHVsZXMvcmFtYmRhL3NyYy9jdXJyeS5qcyIsIi4uL2xpYi9vdGhlci9vdGhlci5qcyIsIi4uL2xpYi9vdGhlci9taXhlZC5qcyIsIi4uL2xpYi9vdGhlci9janMuanMiLCIuLi9ob21lL3N0cmlkZXIvUHJvamVjdHMvbWV0YWxwaXBlL25vZGVfbW9kdWxlcy9wcm9jZXNzLWVzNi9icm93c2VyLmpzIiwiLi4vaG9tZS9zdHJpZGVyL1Byb2plY3RzL21ldGFscGlwZS9ub2RlX21vZHVsZXMvaG9nYW4uanMvbGliL2NvbXBpbGVyLmpzIiwiLi4vaG9tZS9zdHJpZGVyL1Byb2plY3RzL21ldGFscGlwZS9ub2RlX21vZHVsZXMvaG9nYW4uanMvbGliL3RlbXBsYXRlLmpzIiwiLi4vaG9tZS9zdHJpZGVyL1Byb2plY3RzL21ldGFscGlwZS9ub2RlX21vZHVsZXMvaG9nYW4uanMvbGliL2hvZ2FuLmpzIiwiLi4vbGliL290aGVyL3NvbWUuc3RhdGljLnB1ZyIsIi4uL2hvbWUvc3RyaWRlci9Qcm9qZWN0cy9tZXRhbHBpcGUvbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lL2luZGV4LmpzIiwiLi4vbGliL2luZGV4L2luZGV4LnB1ZyIsIi4uL2xpYi9pbmRleC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6XG4gICAgICAgICAgICB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOlxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KTtcbiIsInZhciBpbmRleCA9IDQyO1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gKCkgPT4gKCkgPT4ge307XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBub29wRmFjdG9yeSA9IHJlcXVpcmUoJy4vZmFjdG9yeScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vb3BGYWN0b3J5KCk7XG4iLCIvKipcbiAqIHRha2VuIGZyb20gdGhlIGxhc3QgY29tbWVudCBvZiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9ta3VrbGlzLzUyOTQyNDhcbiAqIFJldHVybnMgYSBjdXJyaWVkIGVxdWl2YWxlbnQgb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLiBUaGUgY3VycmllZCBmdW5jdGlvblxuICogaGFzIHR3byB1bnVzdWFsIGNhcGFiaWxpdGllcy4gRmlyc3QsIGl0cyBhcmd1bWVudHMgbmVlZG4ndCBiZSBwcm92aWRlZCBvbmVcbiAqIGF0IGEgdGltZS4gSWYgYGZgIGlzIGEgdGVybmFyeSBmdW5jdGlvbiBhbmQgYGdgIGlzIGBSLmN1cnJ5KGYpYCwgdGhlXG4gKiBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEpKDIpKDMpYFxuICogICAtIGBnKDEpKDIsIDMpYFxuICogICAtIGBnKDEsIDIpKDMpYFxuICogICAtIGBnKDEsIDIsIDMpYFxuICpcbiAqIFNlY29uZGx5LCB0aGUgc3BlY2lhbCBwbGFjZWhvbGRlciB2YWx1ZSBbYFIuX19gXSgjX18pIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAqIFwiZ2Fwc1wiLCBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsXG4gKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgW2BSLl9fYF0oI19fKSxcbiAqIHRoZSBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEsIDIsIDMpYFxuICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICogICAtIGBnKF8sIF8sIDMpKDEsIDIpYFxuICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICogICAtIGBnKF8sIDIpKF8sIDMpKDEpYFxuICpcbiAqIEBmdW5jXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCogLT4gYSkgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldywgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBjb25zdCBhZGRGb3VyTnVtYmVycyA9IChhLCBiLCBjLCBkKSA9PiBhICsgYiArIGMgKyBkO1xuICpcbiAqICAgICAgY29uc3QgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeShhZGRGb3VyTnVtYmVycyk7XG4gKiAgICAgIGNvbnN0IGYgPSBjdXJyaWVkQWRkRm91ck51bWJlcnMoMSwgMik7XG4gKiAgICAgIGNvbnN0IGcgPSBmKDMpO1xuICogICAgICBnKDQpOyAvLz0+IDEwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjdXJyeSAoZm4sIGFyZ3MgPSBbXSkge1xuICByZXR1cm4gKC4uLl9hcmdzKSA9PlxuICAgIChyZXN0ID0+IHJlc3QubGVuZ3RoID49IGZuLmxlbmd0aCA/IGZuKC4uLnJlc3QpIDogY3VycnkoZm4sIHJlc3QpKShbXG4gICAgICAuLi5hcmdzLFxuICAgICAgLi4uX2FyZ3MsXG4gICAgXSlcbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKClcbntcblx0cmV0dXJuICdPdGhlcidcbn1cbiIsIlxudmFyIGZvbzEgPSAnZm9vMSdcblxuZXhwb3J0IGRlZmF1bHQgZm9vMVxuXG5leHBvcnQgdmFyIGZvbzIgPSAnZm9vMidcbiIsIlxudmFyIGFuc3dlciA9IHJlcXVpcmUoJ3RoZS1hbnN3ZXInKVxudmFyIG1peGVkICA9IHJlcXVpcmUoJy4vbWl4ZWQnKVxuXG5cbm1vZHVsZS5leHBvcnRzID0geyBjanM6ICd5ZXMnLCBhbnN3ZXIsIG1peGVkIH1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuLy8gYmFzZWQgb2ZmIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWZ1bmN0em9tYmllL25vZGUtcHJvY2Vzcy9ibG9iL21hc3Rlci9icm93c2VyLmpzXG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxudmFyIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG5pZiAodHlwZW9mIGdsb2JhbC5zZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG59XG5pZiAodHlwZW9mIGdsb2JhbC5jbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG59XG5cbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBuZXh0VGljayhmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufVxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbmV4cG9ydCB2YXIgdGl0bGUgPSAnYnJvd3Nlcic7XG5leHBvcnQgdmFyIHBsYXRmb3JtID0gJ2Jyb3dzZXInO1xuZXhwb3J0IHZhciBicm93c2VyID0gdHJ1ZTtcbmV4cG9ydCB2YXIgZW52ID0ge307XG5leHBvcnQgdmFyIGFyZ3YgPSBbXTtcbmV4cG9ydCB2YXIgdmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xuZXhwb3J0IHZhciB2ZXJzaW9ucyA9IHt9O1xuZXhwb3J0IHZhciByZWxlYXNlID0ge307XG5leHBvcnQgdmFyIGNvbmZpZyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuZXhwb3J0IHZhciBvbiA9IG5vb3A7XG5leHBvcnQgdmFyIGFkZExpc3RlbmVyID0gbm9vcDtcbmV4cG9ydCB2YXIgb25jZSA9IG5vb3A7XG5leHBvcnQgdmFyIG9mZiA9IG5vb3A7XG5leHBvcnQgdmFyIHJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbmV4cG9ydCB2YXIgcmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbmV4cG9ydCB2YXIgZW1pdCA9IG5vb3A7XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kaW5nKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjd2QgKCkgeyByZXR1cm4gJy8nIH1cbmV4cG9ydCBmdW5jdGlvbiBjaGRpciAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gdW1hc2soKSB7IHJldHVybiAwOyB9XG5cbi8vIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2t1bWF2aXMvYnJvd3Nlci1wcm9jZXNzLWhydGltZS9ibG9iL21hc3Rlci9pbmRleC5qc1xudmFyIHBlcmZvcm1hbmNlID0gZ2xvYmFsLnBlcmZvcm1hbmNlIHx8IHt9XG52YXIgcGVyZm9ybWFuY2VOb3cgPVxuICBwZXJmb3JtYW5jZS5ub3cgICAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLm1vek5vdyAgICAgfHxcbiAgcGVyZm9ybWFuY2UubXNOb3cgICAgICB8fFxuICBwZXJmb3JtYW5jZS5vTm93ICAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLndlYmtpdE5vdyAgfHxcbiAgZnVuY3Rpb24oKXsgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgfVxuXG4vLyBnZW5lcmF0ZSB0aW1lc3RhbXAgb3IgZGVsdGFcbi8vIHNlZSBodHRwOi8vbm9kZWpzLm9yZy9hcGkvcHJvY2Vzcy5odG1sI3Byb2Nlc3NfcHJvY2Vzc19ocnRpbWVcbmV4cG9ydCBmdW5jdGlvbiBocnRpbWUocHJldmlvdXNUaW1lc3RhbXApe1xuICB2YXIgY2xvY2t0aW1lID0gcGVyZm9ybWFuY2VOb3cuY2FsbChwZXJmb3JtYW5jZSkqMWUtM1xuICB2YXIgc2Vjb25kcyA9IE1hdGguZmxvb3IoY2xvY2t0aW1lKVxuICB2YXIgbmFub3NlY29uZHMgPSBNYXRoLmZsb29yKChjbG9ja3RpbWUlMSkqMWU5KVxuICBpZiAocHJldmlvdXNUaW1lc3RhbXApIHtcbiAgICBzZWNvbmRzID0gc2Vjb25kcyAtIHByZXZpb3VzVGltZXN0YW1wWzBdXG4gICAgbmFub3NlY29uZHMgPSBuYW5vc2Vjb25kcyAtIHByZXZpb3VzVGltZXN0YW1wWzFdXG4gICAgaWYgKG5hbm9zZWNvbmRzPDApIHtcbiAgICAgIHNlY29uZHMtLVxuICAgICAgbmFub3NlY29uZHMgKz0gMWU5XG4gICAgfVxuICB9XG4gIHJldHVybiBbc2Vjb25kcyxuYW5vc2Vjb25kc11cbn1cblxudmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5leHBvcnQgZnVuY3Rpb24gdXB0aW1lKCkge1xuICB2YXIgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpO1xuICB2YXIgZGlmID0gY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gIHJldHVybiBkaWYgLyAxMDAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5leHRUaWNrOiBuZXh0VGljayxcbiAgdGl0bGU6IHRpdGxlLFxuICBicm93c2VyOiBicm93c2VyLFxuICBlbnY6IGVudixcbiAgYXJndjogYXJndixcbiAgdmVyc2lvbjogdmVyc2lvbixcbiAgdmVyc2lvbnM6IHZlcnNpb25zLFxuICBvbjogb24sXG4gIGFkZExpc3RlbmVyOiBhZGRMaXN0ZW5lcixcbiAgb25jZTogb25jZSxcbiAgb2ZmOiBvZmYsXG4gIHJlbW92ZUxpc3RlbmVyOiByZW1vdmVMaXN0ZW5lcixcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzOiByZW1vdmVBbGxMaXN0ZW5lcnMsXG4gIGVtaXQ6IGVtaXQsXG4gIGJpbmRpbmc6IGJpbmRpbmcsXG4gIGN3ZDogY3dkLFxuICBjaGRpcjogY2hkaXIsXG4gIHVtYXNrOiB1bWFzayxcbiAgaHJ0aW1lOiBocnRpbWUsXG4gIHBsYXRmb3JtOiBwbGF0Zm9ybSxcbiAgcmVsZWFzZTogcmVsZWFzZSxcbiAgY29uZmlnOiBjb25maWcsXG4gIHVwdGltZTogdXB0aW1lXG59O1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxMSBUd2l0dGVyLCBJbmMuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24gKEhvZ2FuKSB7XG4gIC8vIFNldHVwIHJlZ2V4ICBhc3NpZ25tZW50c1xuICAvLyByZW1vdmUgd2hpdGVzcGFjZSBhY2NvcmRpbmcgdG8gTXVzdGFjaGUgc3BlY1xuICB2YXIgcklzV2hpdGVzcGFjZSA9IC9cXFMvLFxuICAgICAgclF1b3QgPSAvXFxcIi9nLFxuICAgICAgck5ld2xpbmUgPSAgL1xcbi9nLFxuICAgICAgckNyID0gL1xcci9nLFxuICAgICAgclNsYXNoID0gL1xcXFwvZyxcbiAgICAgIHJMaW5lU2VwID0gL1xcdTIwMjgvLFxuICAgICAgclBhcmFncmFwaFNlcCA9IC9cXHUyMDI5LztcblxuICBIb2dhbi50YWdzID0ge1xuICAgICcjJzogMSwgJ14nOiAyLCAnPCc6IDMsICckJzogNCxcbiAgICAnLyc6IDUsICchJzogNiwgJz4nOiA3LCAnPSc6IDgsICdfdic6IDksXG4gICAgJ3snOiAxMCwgJyYnOiAxMSwgJ190JzogMTJcbiAgfTtcblxuICBIb2dhbi5zY2FuID0gZnVuY3Rpb24gc2Nhbih0ZXh0LCBkZWxpbWl0ZXJzKSB7XG4gICAgdmFyIGxlbiA9IHRleHQubGVuZ3RoLFxuICAgICAgICBJTl9URVhUID0gMCxcbiAgICAgICAgSU5fVEFHX1RZUEUgPSAxLFxuICAgICAgICBJTl9UQUcgPSAyLFxuICAgICAgICBzdGF0ZSA9IElOX1RFWFQsXG4gICAgICAgIHRhZ1R5cGUgPSBudWxsLFxuICAgICAgICB0YWcgPSBudWxsLFxuICAgICAgICBidWYgPSAnJyxcbiAgICAgICAgdG9rZW5zID0gW10sXG4gICAgICAgIHNlZW5UYWcgPSBmYWxzZSxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIGxpbmVTdGFydCA9IDAsXG4gICAgICAgIG90YWcgPSAne3snLFxuICAgICAgICBjdGFnID0gJ319JztcblxuICAgIGZ1bmN0aW9uIGFkZEJ1ZigpIHtcbiAgICAgIGlmIChidWYubGVuZ3RoID4gMCkge1xuICAgICAgICB0b2tlbnMucHVzaCh7dGFnOiAnX3QnLCB0ZXh0OiBuZXcgU3RyaW5nKGJ1Zil9KTtcbiAgICAgICAgYnVmID0gJyc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGluZUlzV2hpdGVzcGFjZSgpIHtcbiAgICAgIHZhciBpc0FsbFdoaXRlc3BhY2UgPSB0cnVlO1xuICAgICAgZm9yICh2YXIgaiA9IGxpbmVTdGFydDsgaiA8IHRva2Vucy5sZW5ndGg7IGorKykge1xuICAgICAgICBpc0FsbFdoaXRlc3BhY2UgPVxuICAgICAgICAgIChIb2dhbi50YWdzW3Rva2Vuc1tqXS50YWddIDwgSG9nYW4udGFnc1snX3YnXSkgfHxcbiAgICAgICAgICAodG9rZW5zW2pdLnRhZyA9PSAnX3QnICYmIHRva2Vuc1tqXS50ZXh0Lm1hdGNoKHJJc1doaXRlc3BhY2UpID09PSBudWxsKTtcbiAgICAgICAgaWYgKCFpc0FsbFdoaXRlc3BhY2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGlzQWxsV2hpdGVzcGFjZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXJMaW5lKGhhdmVTZWVuVGFnLCBub05ld0xpbmUpIHtcbiAgICAgIGFkZEJ1ZigpO1xuXG4gICAgICBpZiAoaGF2ZVNlZW5UYWcgJiYgbGluZUlzV2hpdGVzcGFjZSgpKSB7XG4gICAgICAgIGZvciAodmFyIGogPSBsaW5lU3RhcnQsIG5leHQ7IGogPCB0b2tlbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAodG9rZW5zW2pdLnRleHQpIHtcbiAgICAgICAgICAgIGlmICgobmV4dCA9IHRva2Vuc1tqKzFdKSAmJiBuZXh0LnRhZyA9PSAnPicpIHtcbiAgICAgICAgICAgICAgLy8gc2V0IGluZGVudCB0byB0b2tlbiB2YWx1ZVxuICAgICAgICAgICAgICBuZXh0LmluZGVudCA9IHRva2Vuc1tqXS50ZXh0LnRvU3RyaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2Vucy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFub05ld0xpbmUpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goe3RhZzonXFxuJ30pO1xuICAgICAgfVxuXG4gICAgICBzZWVuVGFnID0gZmFsc2U7XG4gICAgICBsaW5lU3RhcnQgPSB0b2tlbnMubGVuZ3RoO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoYW5nZURlbGltaXRlcnModGV4dCwgaW5kZXgpIHtcbiAgICAgIHZhciBjbG9zZSA9ICc9JyArIGN0YWcsXG4gICAgICAgICAgY2xvc2VJbmRleCA9IHRleHQuaW5kZXhPZihjbG9zZSwgaW5kZXgpLFxuICAgICAgICAgIGRlbGltaXRlcnMgPSB0cmltKFxuICAgICAgICAgICAgdGV4dC5zdWJzdHJpbmcodGV4dC5pbmRleE9mKCc9JywgaW5kZXgpICsgMSwgY2xvc2VJbmRleClcbiAgICAgICAgICApLnNwbGl0KCcgJyk7XG5cbiAgICAgIG90YWcgPSBkZWxpbWl0ZXJzWzBdO1xuICAgICAgY3RhZyA9IGRlbGltaXRlcnNbZGVsaW1pdGVycy5sZW5ndGggLSAxXTtcblxuICAgICAgcmV0dXJuIGNsb3NlSW5kZXggKyBjbG9zZS5sZW5ndGggLSAxO1xuICAgIH1cblxuICAgIGlmIChkZWxpbWl0ZXJzKSB7XG4gICAgICBkZWxpbWl0ZXJzID0gZGVsaW1pdGVycy5zcGxpdCgnICcpO1xuICAgICAgb3RhZyA9IGRlbGltaXRlcnNbMF07XG4gICAgICBjdGFnID0gZGVsaW1pdGVyc1sxXTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChzdGF0ZSA9PSBJTl9URVhUKSB7XG4gICAgICAgIGlmICh0YWdDaGFuZ2Uob3RhZywgdGV4dCwgaSkpIHtcbiAgICAgICAgICAtLWk7XG4gICAgICAgICAgYWRkQnVmKCk7XG4gICAgICAgICAgc3RhdGUgPSBJTl9UQUdfVFlQRTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGV4dC5jaGFyQXQoaSkgPT0gJ1xcbicpIHtcbiAgICAgICAgICAgIGZpbHRlckxpbmUoc2VlblRhZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1ZiArPSB0ZXh0LmNoYXJBdChpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gSU5fVEFHX1RZUEUpIHtcbiAgICAgICAgaSArPSBvdGFnLmxlbmd0aCAtIDE7XG4gICAgICAgIHRhZyA9IEhvZ2FuLnRhZ3NbdGV4dC5jaGFyQXQoaSArIDEpXTtcbiAgICAgICAgdGFnVHlwZSA9IHRhZyA/IHRleHQuY2hhckF0KGkgKyAxKSA6ICdfdic7XG4gICAgICAgIGlmICh0YWdUeXBlID09ICc9Jykge1xuICAgICAgICAgIGkgPSBjaGFuZ2VEZWxpbWl0ZXJzKHRleHQsIGkpO1xuICAgICAgICAgIHN0YXRlID0gSU5fVEVYVDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGFnKSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXRlID0gSU5fVEFHO1xuICAgICAgICB9XG4gICAgICAgIHNlZW5UYWcgPSBpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRhZ0NoYW5nZShjdGFnLCB0ZXh0LCBpKSkge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHt0YWc6IHRhZ1R5cGUsIG46IHRyaW0oYnVmKSwgb3RhZzogb3RhZywgY3RhZzogY3RhZyxcbiAgICAgICAgICAgICAgICAgICAgICAgaTogKHRhZ1R5cGUgPT0gJy8nKSA/IHNlZW5UYWcgLSBvdGFnLmxlbmd0aCA6IGkgKyBjdGFnLmxlbmd0aH0pO1xuICAgICAgICAgIGJ1ZiA9ICcnO1xuICAgICAgICAgIGkgKz0gY3RhZy5sZW5ndGggLSAxO1xuICAgICAgICAgIHN0YXRlID0gSU5fVEVYVDtcbiAgICAgICAgICBpZiAodGFnVHlwZSA9PSAneycpIHtcbiAgICAgICAgICAgIGlmIChjdGFnID09ICd9fScpIHtcbiAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2xlYW5UcmlwbGVTdGFjaGUodG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1ZiArPSB0ZXh0LmNoYXJBdChpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZpbHRlckxpbmUoc2VlblRhZywgdHJ1ZSk7XG5cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYW5UcmlwbGVTdGFjaGUodG9rZW4pIHtcbiAgICBpZiAodG9rZW4ubi5zdWJzdHIodG9rZW4ubi5sZW5ndGggLSAxKSA9PT0gJ30nKSB7XG4gICAgICB0b2tlbi5uID0gdG9rZW4ubi5zdWJzdHJpbmcoMCwgdG9rZW4ubi5sZW5ndGggLSAxKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0cmltKHMpIHtcbiAgICBpZiAocy50cmltKSB7XG4gICAgICByZXR1cm4gcy50cmltKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHMucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFnQ2hhbmdlKHRhZywgdGV4dCwgaW5kZXgpIHtcbiAgICBpZiAodGV4dC5jaGFyQXQoaW5kZXgpICE9IHRhZy5jaGFyQXQoMCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMSwgbCA9IHRhZy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmICh0ZXh0LmNoYXJBdChpbmRleCArIGkpICE9IHRhZy5jaGFyQXQoaSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gdGhlIHRhZ3MgYWxsb3dlZCBpbnNpZGUgc3VwZXIgdGVtcGxhdGVzXG4gIHZhciBhbGxvd2VkSW5TdXBlciA9IHsnX3QnOiB0cnVlLCAnXFxuJzogdHJ1ZSwgJyQnOiB0cnVlLCAnLyc6IHRydWV9O1xuXG4gIGZ1bmN0aW9uIGJ1aWxkVHJlZSh0b2tlbnMsIGtpbmQsIHN0YWNrLCBjdXN0b21UYWdzKSB7XG4gICAgdmFyIGluc3RydWN0aW9ucyA9IFtdLFxuICAgICAgICBvcGVuZXIgPSBudWxsLFxuICAgICAgICB0YWlsID0gbnVsbCxcbiAgICAgICAgdG9rZW4gPSBudWxsO1xuXG4gICAgdGFpbCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuXG4gICAgd2hpbGUgKHRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICB0b2tlbiA9IHRva2Vucy5zaGlmdCgpO1xuXG4gICAgICBpZiAodGFpbCAmJiB0YWlsLnRhZyA9PSAnPCcgJiYgISh0b2tlbi50YWcgaW4gYWxsb3dlZEluU3VwZXIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBjb250ZW50IGluIDwgc3VwZXIgdGFnLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoSG9nYW4udGFnc1t0b2tlbi50YWddIDw9IEhvZ2FuLnRhZ3NbJyQnXSB8fCBpc09wZW5lcih0b2tlbiwgY3VzdG9tVGFncykpIHtcbiAgICAgICAgc3RhY2sucHVzaCh0b2tlbik7XG4gICAgICAgIHRva2VuLm5vZGVzID0gYnVpbGRUcmVlKHRva2VucywgdG9rZW4udGFnLCBzdGFjaywgY3VzdG9tVGFncyk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnRhZyA9PSAnLycpIHtcbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2xvc2luZyB0YWcgd2l0aG91dCBvcGVuZXI6IC8nICsgdG9rZW4ubik7XG4gICAgICAgIH1cbiAgICAgICAgb3BlbmVyID0gc3RhY2sucG9wKCk7XG4gICAgICAgIGlmICh0b2tlbi5uICE9IG9wZW5lci5uICYmICFpc0Nsb3Nlcih0b2tlbi5uLCBvcGVuZXIubiwgY3VzdG9tVGFncykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lc3RpbmcgZXJyb3I6ICcgKyBvcGVuZXIubiArICcgdnMuICcgKyB0b2tlbi5uKTtcbiAgICAgICAgfVxuICAgICAgICBvcGVuZXIuZW5kID0gdG9rZW4uaTtcbiAgICAgICAgcmV0dXJuIGluc3RydWN0aW9ucztcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udGFnID09ICdcXG4nKSB7XG4gICAgICAgIHRva2VuLmxhc3QgPSAodG9rZW5zLmxlbmd0aCA9PSAwKSB8fCAodG9rZW5zWzBdLnRhZyA9PSAnXFxuJyk7XG4gICAgICB9XG5cbiAgICAgIGluc3RydWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNsb3NpbmcgdGFnOiAnICsgc3RhY2sucG9wKCkubik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3RydWN0aW9ucztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT3BlbmVyKHRva2VuLCB0YWdzKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0YWdzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKHRhZ3NbaV0ubyA9PSB0b2tlbi5uKSB7XG4gICAgICAgIHRva2VuLnRhZyA9ICcjJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNDbG9zZXIoY2xvc2UsIG9wZW4sIHRhZ3MpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRhZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAodGFnc1tpXS5jID09IGNsb3NlICYmIHRhZ3NbaV0ubyA9PSBvcGVuKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0cmluZ2lmeVN1YnN0aXR1dGlvbnMob2JqKSB7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaXRlbXMucHVzaCgnXCInICsgZXNjKGtleSkgKyAnXCI6IGZ1bmN0aW9uKGMscCx0LGkpIHsnICsgb2JqW2tleV0gKyAnfScpO1xuICAgIH1cbiAgICByZXR1cm4gXCJ7IFwiICsgaXRlbXMuam9pbihcIixcIikgKyBcIiB9XCI7XG4gIH1cblxuICBmdW5jdGlvbiBzdHJpbmdpZnlQYXJ0aWFscyhjb2RlT2JqKSB7XG4gICAgdmFyIHBhcnRpYWxzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIGNvZGVPYmoucGFydGlhbHMpIHtcbiAgICAgIHBhcnRpYWxzLnB1c2goJ1wiJyArIGVzYyhrZXkpICsgJ1wiOntuYW1lOlwiJyArIGVzYyhjb2RlT2JqLnBhcnRpYWxzW2tleV0ubmFtZSkgKyAnXCIsICcgKyBzdHJpbmdpZnlQYXJ0aWFscyhjb2RlT2JqLnBhcnRpYWxzW2tleV0pICsgXCJ9XCIpO1xuICAgIH1cbiAgICByZXR1cm4gXCJwYXJ0aWFsczoge1wiICsgcGFydGlhbHMuam9pbihcIixcIikgKyBcIn0sIHN1YnM6IFwiICsgc3RyaW5naWZ5U3Vic3RpdHV0aW9ucyhjb2RlT2JqLnN1YnMpO1xuICB9XG5cbiAgSG9nYW4uc3RyaW5naWZ5ID0gZnVuY3Rpb24oY29kZU9iaiwgdGV4dCwgb3B0aW9ucykge1xuICAgIHJldHVybiBcIntjb2RlOiBmdW5jdGlvbiAoYyxwLGkpIHsgXCIgKyBIb2dhbi53cmFwTWFpbihjb2RlT2JqLmNvZGUpICsgXCIgfSxcIiArIHN0cmluZ2lmeVBhcnRpYWxzKGNvZGVPYmopICsgIFwifVwiO1xuICB9XG5cbiAgdmFyIHNlcmlhbE5vID0gMDtcbiAgSG9nYW4uZ2VuZXJhdGUgPSBmdW5jdGlvbih0cmVlLCB0ZXh0LCBvcHRpb25zKSB7XG4gICAgc2VyaWFsTm8gPSAwO1xuICAgIHZhciBjb250ZXh0ID0geyBjb2RlOiAnJywgc3Viczoge30sIHBhcnRpYWxzOiB7fSB9O1xuICAgIEhvZ2FuLndhbGsodHJlZSwgY29udGV4dCk7XG5cbiAgICBpZiAob3B0aW9ucy5hc1N0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KGNvbnRleHQsIHRleHQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1ha2VUZW1wbGF0ZShjb250ZXh0LCB0ZXh0LCBvcHRpb25zKTtcbiAgfVxuXG4gIEhvZ2FuLndyYXBNYWluID0gZnVuY3Rpb24oY29kZSkge1xuICAgIHJldHVybiAndmFyIHQ9dGhpczt0LmIoaT1pfHxcIlwiKTsnICsgY29kZSArICdyZXR1cm4gdC5mbCgpOyc7XG4gIH1cblxuICBIb2dhbi50ZW1wbGF0ZSA9IEhvZ2FuLlRlbXBsYXRlO1xuXG4gIEhvZ2FuLm1ha2VUZW1wbGF0ZSA9IGZ1bmN0aW9uKGNvZGVPYmosIHRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLm1ha2VQYXJ0aWFscyhjb2RlT2JqKTtcbiAgICB0ZW1wbGF0ZS5jb2RlID0gbmV3IEZ1bmN0aW9uKCdjJywgJ3AnLCAnaScsIHRoaXMud3JhcE1haW4oY29kZU9iai5jb2RlKSk7XG4gICAgcmV0dXJuIG5ldyB0aGlzLnRlbXBsYXRlKHRlbXBsYXRlLCB0ZXh0LCB0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIEhvZ2FuLm1ha2VQYXJ0aWFscyA9IGZ1bmN0aW9uKGNvZGVPYmopIHtcbiAgICB2YXIga2V5LCB0ZW1wbGF0ZSA9IHtzdWJzOiB7fSwgcGFydGlhbHM6IGNvZGVPYmoucGFydGlhbHMsIG5hbWU6IGNvZGVPYmoubmFtZX07XG4gICAgZm9yIChrZXkgaW4gdGVtcGxhdGUucGFydGlhbHMpIHtcbiAgICAgIHRlbXBsYXRlLnBhcnRpYWxzW2tleV0gPSB0aGlzLm1ha2VQYXJ0aWFscyh0ZW1wbGF0ZS5wYXJ0aWFsc1trZXldKTtcbiAgICB9XG4gICAgZm9yIChrZXkgaW4gY29kZU9iai5zdWJzKSB7XG4gICAgICB0ZW1wbGF0ZS5zdWJzW2tleV0gPSBuZXcgRnVuY3Rpb24oJ2MnLCAncCcsICd0JywgJ2knLCBjb2RlT2JqLnN1YnNba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzYyhzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZShyU2xhc2gsICdcXFxcXFxcXCcpXG4gICAgICAgICAgICAucmVwbGFjZShyUXVvdCwgJ1xcXFxcXFwiJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHJOZXdsaW5lLCAnXFxcXG4nKVxuICAgICAgICAgICAgLnJlcGxhY2UockNyLCAnXFxcXHInKVxuICAgICAgICAgICAgLnJlcGxhY2UockxpbmVTZXAsICdcXFxcdTIwMjgnKVxuICAgICAgICAgICAgLnJlcGxhY2UoclBhcmFncmFwaFNlcCwgJ1xcXFx1MjAyOScpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hvb3NlTWV0aG9kKHMpIHtcbiAgICByZXR1cm4gKH5zLmluZGV4T2YoJy4nKSkgPyAnZCcgOiAnZic7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQYXJ0aWFsKG5vZGUsIGNvbnRleHQpIHtcbiAgICB2YXIgcHJlZml4ID0gXCI8XCIgKyAoY29udGV4dC5wcmVmaXggfHwgXCJcIik7XG4gICAgdmFyIHN5bSA9IHByZWZpeCArIG5vZGUubiArIHNlcmlhbE5vKys7XG4gICAgY29udGV4dC5wYXJ0aWFsc1tzeW1dID0ge25hbWU6IG5vZGUubiwgcGFydGlhbHM6IHt9fTtcbiAgICBjb250ZXh0LmNvZGUgKz0gJ3QuYih0LnJwKFwiJyArICBlc2Moc3ltKSArICdcIixjLHAsXCInICsgKG5vZGUuaW5kZW50IHx8ICcnKSArICdcIikpOyc7XG4gICAgcmV0dXJuIHN5bTtcbiAgfVxuXG4gIEhvZ2FuLmNvZGVnZW4gPSB7XG4gICAgJyMnOiBmdW5jdGlvbihub2RlLCBjb250ZXh0KSB7XG4gICAgICBjb250ZXh0LmNvZGUgKz0gJ2lmKHQucyh0LicgKyBjaG9vc2VNZXRob2Qobm9kZS5uKSArICcoXCInICsgZXNjKG5vZGUubikgKyAnXCIsYyxwLDEpLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICdjLHAsMCwnICsgbm9kZS5pICsgJywnICsgbm9kZS5lbmQgKyAnLFwiJyArIG5vZGUub3RhZyArIFwiIFwiICsgbm9kZS5jdGFnICsgJ1wiKSl7JyArXG4gICAgICAgICAgICAgICAgICAgICAgJ3QucnMoYyxwLCcgKyAnZnVuY3Rpb24oYyxwLHQpeyc7XG4gICAgICBIb2dhbi53YWxrKG5vZGUubm9kZXMsIGNvbnRleHQpO1xuICAgICAgY29udGV4dC5jb2RlICs9ICd9KTtjLnBvcCgpO30nO1xuICAgIH0sXG5cbiAgICAnXic6IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQuY29kZSArPSAnaWYoIXQucyh0LicgKyBjaG9vc2VNZXRob2Qobm9kZS5uKSArICcoXCInICsgZXNjKG5vZGUubikgKyAnXCIsYyxwLDEpLGMscCwxLDAsMCxcIlwiKSl7JztcbiAgICAgIEhvZ2FuLndhbGsobm9kZS5ub2RlcywgY29udGV4dCk7XG4gICAgICBjb250ZXh0LmNvZGUgKz0gJ307JztcbiAgICB9LFxuXG4gICAgJz4nOiBjcmVhdGVQYXJ0aWFsLFxuICAgICc8JzogZnVuY3Rpb24obm9kZSwgY29udGV4dCkge1xuICAgICAgdmFyIGN0eCA9IHtwYXJ0aWFsczoge30sIGNvZGU6ICcnLCBzdWJzOiB7fSwgaW5QYXJ0aWFsOiB0cnVlfTtcbiAgICAgIEhvZ2FuLndhbGsobm9kZS5ub2RlcywgY3R4KTtcbiAgICAgIHZhciB0ZW1wbGF0ZSA9IGNvbnRleHQucGFydGlhbHNbY3JlYXRlUGFydGlhbChub2RlLCBjb250ZXh0KV07XG4gICAgICB0ZW1wbGF0ZS5zdWJzID0gY3R4LnN1YnM7XG4gICAgICB0ZW1wbGF0ZS5wYXJ0aWFscyA9IGN0eC5wYXJ0aWFscztcbiAgICB9LFxuXG4gICAgJyQnOiBmdW5jdGlvbihub2RlLCBjb250ZXh0KSB7XG4gICAgICB2YXIgY3R4ID0ge3N1YnM6IHt9LCBjb2RlOiAnJywgcGFydGlhbHM6IGNvbnRleHQucGFydGlhbHMsIHByZWZpeDogbm9kZS5ufTtcbiAgICAgIEhvZ2FuLndhbGsobm9kZS5ub2RlcywgY3R4KTtcbiAgICAgIGNvbnRleHQuc3Vic1tub2RlLm5dID0gY3R4LmNvZGU7XG4gICAgICBpZiAoIWNvbnRleHQuaW5QYXJ0aWFsKSB7XG4gICAgICAgIGNvbnRleHQuY29kZSArPSAndC5zdWIoXCInICsgZXNjKG5vZGUubikgKyAnXCIsYyxwLGkpOyc7XG4gICAgICB9XG4gICAgfSxcblxuICAgICdcXG4nOiBmdW5jdGlvbihub2RlLCBjb250ZXh0KSB7XG4gICAgICBjb250ZXh0LmNvZGUgKz0gd3JpdGUoJ1wiXFxcXG5cIicgKyAobm9kZS5sYXN0ID8gJycgOiAnICsgaScpKTtcbiAgICB9LFxuXG4gICAgJ192JzogZnVuY3Rpb24obm9kZSwgY29udGV4dCkge1xuICAgICAgY29udGV4dC5jb2RlICs9ICd0LmIodC52KHQuJyArIGNob29zZU1ldGhvZChub2RlLm4pICsgJyhcIicgKyBlc2Mobm9kZS5uKSArICdcIixjLHAsMCkpKTsnO1xuICAgIH0sXG5cbiAgICAnX3QnOiBmdW5jdGlvbihub2RlLCBjb250ZXh0KSB7XG4gICAgICBjb250ZXh0LmNvZGUgKz0gd3JpdGUoJ1wiJyArIGVzYyhub2RlLnRleHQpICsgJ1wiJyk7XG4gICAgfSxcblxuICAgICd7JzogdHJpcGxlU3RhY2hlLFxuXG4gICAgJyYnOiB0cmlwbGVTdGFjaGVcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyaXBsZVN0YWNoZShub2RlLCBjb250ZXh0KSB7XG4gICAgY29udGV4dC5jb2RlICs9ICd0LmIodC50KHQuJyArIGNob29zZU1ldGhvZChub2RlLm4pICsgJyhcIicgKyBlc2Mobm9kZS5uKSArICdcIixjLHAsMCkpKTsnO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUocykge1xuICAgIHJldHVybiAndC5iKCcgKyBzICsgJyk7JztcbiAgfVxuXG4gIEhvZ2FuLndhbGsgPSBmdW5jdGlvbihub2RlbGlzdCwgY29udGV4dCkge1xuICAgIHZhciBmdW5jO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbm9kZWxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmdW5jID0gSG9nYW4uY29kZWdlbltub2RlbGlzdFtpXS50YWddO1xuICAgICAgZnVuYyAmJiBmdW5jKG5vZGVsaXN0W2ldLCBjb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG4gIH1cblxuICBIb2dhbi5wYXJzZSA9IGZ1bmN0aW9uKHRva2VucywgdGV4dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHJldHVybiBidWlsZFRyZWUodG9rZW5zLCAnJywgW10sIG9wdGlvbnMuc2VjdGlvblRhZ3MgfHwgW10pO1xuICB9XG5cbiAgSG9nYW4uY2FjaGUgPSB7fTtcblxuICBIb2dhbi5jYWNoZUtleSA9IGZ1bmN0aW9uKHRleHQsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gW3RleHQsICEhb3B0aW9ucy5hc1N0cmluZywgISFvcHRpb25zLmRpc2FibGVMYW1iZGEsIG9wdGlvbnMuZGVsaW1pdGVycywgISFvcHRpb25zLm1vZGVsR2V0XS5qb2luKCd8fCcpO1xuICB9XG5cbiAgSG9nYW4uY29tcGlsZSA9IGZ1bmN0aW9uKHRleHQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIga2V5ID0gSG9nYW4uY2FjaGVLZXkodGV4dCwgb3B0aW9ucyk7XG4gICAgdmFyIHRlbXBsYXRlID0gdGhpcy5jYWNoZVtrZXldO1xuXG4gICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICB2YXIgcGFydGlhbHMgPSB0ZW1wbGF0ZS5wYXJ0aWFscztcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gcGFydGlhbHMpIHtcbiAgICAgICAgZGVsZXRlIHBhcnRpYWxzW25hbWVdLmluc3RhbmNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cblxuICAgIHRlbXBsYXRlID0gdGhpcy5nZW5lcmF0ZSh0aGlzLnBhcnNlKHRoaXMuc2Nhbih0ZXh0LCBvcHRpb25zLmRlbGltaXRlcnMpLCB0ZXh0LCBvcHRpb25zKSwgdGV4dCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XSA9IHRlbXBsYXRlO1xuICB9XG59KSh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgPyBleHBvcnRzIDogSG9nYW4pO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxMSBUd2l0dGVyLCBJbmMuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG52YXIgSG9nYW4gPSB7fTtcblxuKGZ1bmN0aW9uIChIb2dhbikge1xuICBIb2dhbi5UZW1wbGF0ZSA9IGZ1bmN0aW9uIChjb2RlT2JqLCB0ZXh0LCBjb21waWxlciwgb3B0aW9ucykge1xuICAgIGNvZGVPYmogPSBjb2RlT2JqIHx8IHt9O1xuICAgIHRoaXMuciA9IGNvZGVPYmouY29kZSB8fCB0aGlzLnI7XG4gICAgdGhpcy5jID0gY29tcGlsZXI7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLnRleHQgPSB0ZXh0IHx8ICcnO1xuICAgIHRoaXMucGFydGlhbHMgPSBjb2RlT2JqLnBhcnRpYWxzIHx8IHt9O1xuICAgIHRoaXMuc3VicyA9IGNvZGVPYmouc3VicyB8fCB7fTtcbiAgICB0aGlzLmJ1ZiA9ICcnO1xuICB9XG5cbiAgSG9nYW4uVGVtcGxhdGUucHJvdG90eXBlID0ge1xuICAgIC8vIHJlbmRlcjogcmVwbGFjZWQgYnkgZ2VuZXJhdGVkIGNvZGUuXG4gICAgcjogZnVuY3Rpb24gKGNvbnRleHQsIHBhcnRpYWxzLCBpbmRlbnQpIHsgcmV0dXJuICcnOyB9LFxuXG4gICAgLy8gdmFyaWFibGUgZXNjYXBpbmdcbiAgICB2OiBob2dhbkVzY2FwZSxcblxuICAgIC8vIHRyaXBsZSBzdGFjaGVcbiAgICB0OiBjb2VyY2VUb1N0cmluZyxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKGNvbnRleHQsIHBhcnRpYWxzLCBpbmRlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnJpKFtjb250ZXh0XSwgcGFydGlhbHMgfHwge30sIGluZGVudCk7XG4gICAgfSxcblxuICAgIC8vIHJlbmRlciBpbnRlcm5hbCAtLSBhIGhvb2sgZm9yIG92ZXJyaWRlcyB0aGF0IGNhdGNoZXMgcGFydGlhbHMgdG9vXG4gICAgcmk6IGZ1bmN0aW9uIChjb250ZXh0LCBwYXJ0aWFscywgaW5kZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5yKGNvbnRleHQsIHBhcnRpYWxzLCBpbmRlbnQpO1xuICAgIH0sXG5cbiAgICAvLyBlbnN1cmVQYXJ0aWFsXG4gICAgZXA6IGZ1bmN0aW9uKHN5bWJvbCwgcGFydGlhbHMpIHtcbiAgICAgIHZhciBwYXJ0aWFsID0gdGhpcy5wYXJ0aWFsc1tzeW1ib2xdO1xuXG4gICAgICAvLyBjaGVjayB0byBzZWUgdGhhdCBpZiB3ZSd2ZSBpbnN0YW50aWF0ZWQgdGhpcyBwYXJ0aWFsIGJlZm9yZVxuICAgICAgdmFyIHRlbXBsYXRlID0gcGFydGlhbHNbcGFydGlhbC5uYW1lXTtcbiAgICAgIGlmIChwYXJ0aWFsLmluc3RhbmNlICYmIHBhcnRpYWwuYmFzZSA9PSB0ZW1wbGF0ZSkge1xuICAgICAgICByZXR1cm4gcGFydGlhbC5pbnN0YW5jZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSA9PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoIXRoaXMuYykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbXBpbGVyIGF2YWlsYWJsZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGVtcGxhdGUgPSB0aGlzLmMuY29tcGlsZSh0ZW1wbGF0ZSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0ZW1wbGF0ZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgLy8gV2UgdXNlIHRoaXMgdG8gY2hlY2sgd2hldGhlciB0aGUgcGFydGlhbHMgZGljdGlvbmFyeSBoYXMgY2hhbmdlZFxuICAgICAgdGhpcy5wYXJ0aWFsc1tzeW1ib2xdLmJhc2UgPSB0ZW1wbGF0ZTtcblxuICAgICAgaWYgKHBhcnRpYWwuc3Vicykge1xuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgY29uc2lkZXIgcGFyZW50IHRlbXBsYXRlIG5vd1xuICAgICAgICBpZiAoIXBhcnRpYWxzLnN0YWNrVGV4dCkgcGFydGlhbHMuc3RhY2tUZXh0ID0ge307XG4gICAgICAgIGZvciAoa2V5IGluIHBhcnRpYWwuc3Vicykge1xuICAgICAgICAgIGlmICghcGFydGlhbHMuc3RhY2tUZXh0W2tleV0pIHtcbiAgICAgICAgICAgIHBhcnRpYWxzLnN0YWNrVGV4dFtrZXldID0gKHRoaXMuYWN0aXZlU3ViICE9PSB1bmRlZmluZWQgJiYgcGFydGlhbHMuc3RhY2tUZXh0W3RoaXMuYWN0aXZlU3ViXSkgPyBwYXJ0aWFscy5zdGFja1RleHRbdGhpcy5hY3RpdmVTdWJdIDogdGhpcy50ZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0ZW1wbGF0ZSA9IGNyZWF0ZVNwZWNpYWxpemVkUGFydGlhbCh0ZW1wbGF0ZSwgcGFydGlhbC5zdWJzLCBwYXJ0aWFsLnBhcnRpYWxzLFxuICAgICAgICAgIHRoaXMuc3RhY2tTdWJzLCB0aGlzLnN0YWNrUGFydGlhbHMsIHBhcnRpYWxzLnN0YWNrVGV4dCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW3N5bWJvbF0uaW5zdGFuY2UgPSB0ZW1wbGF0ZTtcblxuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH0sXG5cbiAgICAvLyB0cmllcyB0byBmaW5kIGEgcGFydGlhbCBpbiB0aGUgY3VycmVudCBzY29wZSBhbmQgcmVuZGVyIGl0XG4gICAgcnA6IGZ1bmN0aW9uKHN5bWJvbCwgY29udGV4dCwgcGFydGlhbHMsIGluZGVudCkge1xuICAgICAgdmFyIHBhcnRpYWwgPSB0aGlzLmVwKHN5bWJvbCwgcGFydGlhbHMpO1xuICAgICAgaWYgKCFwYXJ0aWFsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcnRpYWwucmkoY29udGV4dCwgcGFydGlhbHMsIGluZGVudCk7XG4gICAgfSxcblxuICAgIC8vIHJlbmRlciBhIHNlY3Rpb25cbiAgICByczogZnVuY3Rpb24oY29udGV4dCwgcGFydGlhbHMsIHNlY3Rpb24pIHtcbiAgICAgIHZhciB0YWlsID0gY29udGV4dFtjb250ZXh0Lmxlbmd0aCAtIDFdO1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFpbCkpIHtcbiAgICAgICAgc2VjdGlvbihjb250ZXh0LCBwYXJ0aWFscywgdGhpcyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWlsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnRleHQucHVzaCh0YWlsW2ldKTtcbiAgICAgICAgc2VjdGlvbihjb250ZXh0LCBwYXJ0aWFscywgdGhpcyk7XG4gICAgICAgIGNvbnRleHQucG9wKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIG1heWJlIHN0YXJ0IGEgc2VjdGlvblxuICAgIHM6IGZ1bmN0aW9uKHZhbCwgY3R4LCBwYXJ0aWFscywgaW52ZXJ0ZWQsIHN0YXJ0LCBlbmQsIHRhZ3MpIHtcbiAgICAgIHZhciBwYXNzO1xuXG4gICAgICBpZiAoaXNBcnJheSh2YWwpICYmIHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbCA9IHRoaXMubXModmFsLCBjdHgsIHBhcnRpYWxzLCBpbnZlcnRlZCwgc3RhcnQsIGVuZCwgdGFncyk7XG4gICAgICB9XG5cbiAgICAgIHBhc3MgPSAhIXZhbDtcblxuICAgICAgaWYgKCFpbnZlcnRlZCAmJiBwYXNzICYmIGN0eCkge1xuICAgICAgICBjdHgucHVzaCgodHlwZW9mIHZhbCA9PSAnb2JqZWN0JykgPyB2YWwgOiBjdHhbY3R4Lmxlbmd0aCAtIDFdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhc3M7XG4gICAgfSxcblxuICAgIC8vIGZpbmQgdmFsdWVzIHdpdGggZG90dGVkIG5hbWVzXG4gICAgZDogZnVuY3Rpb24oa2V5LCBjdHgsIHBhcnRpYWxzLCByZXR1cm5Gb3VuZCkge1xuICAgICAgdmFyIGZvdW5kLFxuICAgICAgICAgIG5hbWVzID0ga2V5LnNwbGl0KCcuJyksXG4gICAgICAgICAgdmFsID0gdGhpcy5mKG5hbWVzWzBdLCBjdHgsIHBhcnRpYWxzLCByZXR1cm5Gb3VuZCksXG4gICAgICAgICAgZG9Nb2RlbEdldCA9IHRoaXMub3B0aW9ucy5tb2RlbEdldCxcbiAgICAgICAgICBjeCA9IG51bGw7XG5cbiAgICAgIGlmIChrZXkgPT09ICcuJyAmJiBpc0FycmF5KGN0eFtjdHgubGVuZ3RoIC0gMl0pKSB7XG4gICAgICAgIHZhbCA9IGN0eFtjdHgubGVuZ3RoIC0gMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZm91bmQgPSBmaW5kSW5TY29wZShuYW1lc1tpXSwgdmFsLCBkb01vZGVsR2V0KTtcbiAgICAgICAgICBpZiAoZm91bmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY3ggPSB2YWw7XG4gICAgICAgICAgICB2YWwgPSBmb3VuZDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsID0gJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXR1cm5Gb3VuZCAmJiAhdmFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFyZXR1cm5Gb3VuZCAmJiB0eXBlb2YgdmFsID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY3R4LnB1c2goY3gpO1xuICAgICAgICB2YWwgPSB0aGlzLm12KHZhbCwgY3R4LCBwYXJ0aWFscyk7XG4gICAgICAgIGN0eC5wb3AoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9LFxuXG4gICAgLy8gZmluZCB2YWx1ZXMgd2l0aCBub3JtYWwgbmFtZXNcbiAgICBmOiBmdW5jdGlvbihrZXksIGN0eCwgcGFydGlhbHMsIHJldHVybkZvdW5kKSB7XG4gICAgICB2YXIgdmFsID0gZmFsc2UsXG4gICAgICAgICAgdiA9IG51bGwsXG4gICAgICAgICAgZm91bmQgPSBmYWxzZSxcbiAgICAgICAgICBkb01vZGVsR2V0ID0gdGhpcy5vcHRpb25zLm1vZGVsR2V0O1xuXG4gICAgICBmb3IgKHZhciBpID0gY3R4Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHYgPSBjdHhbaV07XG4gICAgICAgIHZhbCA9IGZpbmRJblNjb3BlKGtleSwgdiwgZG9Nb2RlbEdldCk7XG4gICAgICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIHJldHVybiAocmV0dXJuRm91bmQpID8gZmFsc2UgOiBcIlwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJldHVybkZvdW5kICYmIHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YWwgPSB0aGlzLm12KHZhbCwgY3R4LCBwYXJ0aWFscyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWw7XG4gICAgfSxcblxuICAgIC8vIGhpZ2hlciBvcmRlciB0ZW1wbGF0ZXNcbiAgICBsczogZnVuY3Rpb24oZnVuYywgY3gsIHBhcnRpYWxzLCB0ZXh0LCB0YWdzKSB7XG4gICAgICB2YXIgb2xkVGFncyA9IHRoaXMub3B0aW9ucy5kZWxpbWl0ZXJzO1xuXG4gICAgICB0aGlzLm9wdGlvbnMuZGVsaW1pdGVycyA9IHRhZ3M7XG4gICAgICB0aGlzLmIodGhpcy5jdChjb2VyY2VUb1N0cmluZyhmdW5jLmNhbGwoY3gsIHRleHQpKSwgY3gsIHBhcnRpYWxzKSk7XG4gICAgICB0aGlzLm9wdGlvbnMuZGVsaW1pdGVycyA9IG9sZFRhZ3M7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLy8gY29tcGlsZSB0ZXh0XG4gICAgY3Q6IGZ1bmN0aW9uKHRleHQsIGN4LCBwYXJ0aWFscykge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlTGFtYmRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTGFtYmRhIGZlYXR1cmVzIGRpc2FibGVkLicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYy5jb21waWxlKHRleHQsIHRoaXMub3B0aW9ucykucmVuZGVyKGN4LCBwYXJ0aWFscyk7XG4gICAgfSxcblxuICAgIC8vIHRlbXBsYXRlIHJlc3VsdCBidWZmZXJpbmdcbiAgICBiOiBmdW5jdGlvbihzKSB7IHRoaXMuYnVmICs9IHM7IH0sXG5cbiAgICBmbDogZnVuY3Rpb24oKSB7IHZhciByID0gdGhpcy5idWY7IHRoaXMuYnVmID0gJyc7IHJldHVybiByOyB9LFxuXG4gICAgLy8gbWV0aG9kIHJlcGxhY2Ugc2VjdGlvblxuICAgIG1zOiBmdW5jdGlvbihmdW5jLCBjdHgsIHBhcnRpYWxzLCBpbnZlcnRlZCwgc3RhcnQsIGVuZCwgdGFncykge1xuICAgICAgdmFyIHRleHRTb3VyY2UsXG4gICAgICAgICAgY3ggPSBjdHhbY3R4Lmxlbmd0aCAtIDFdLFxuICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuY2FsbChjeCk7XG5cbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaWYgKGludmVydGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGV4dFNvdXJjZSA9ICh0aGlzLmFjdGl2ZVN1YiAmJiB0aGlzLnN1YnNUZXh0ICYmIHRoaXMuc3Vic1RleHRbdGhpcy5hY3RpdmVTdWJdKSA/IHRoaXMuc3Vic1RleHRbdGhpcy5hY3RpdmVTdWJdIDogdGhpcy50ZXh0O1xuICAgICAgICAgIHJldHVybiB0aGlzLmxzKHJlc3VsdCwgY3gsIHBhcnRpYWxzLCB0ZXh0U291cmNlLnN1YnN0cmluZyhzdGFydCwgZW5kKSwgdGFncyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgLy8gbWV0aG9kIHJlcGxhY2UgdmFyaWFibGVcbiAgICBtdjogZnVuY3Rpb24oZnVuYywgY3R4LCBwYXJ0aWFscykge1xuICAgICAgdmFyIGN4ID0gY3R4W2N0eC5sZW5ndGggLSAxXTtcbiAgICAgIHZhciByZXN1bHQgPSBmdW5jLmNhbGwoY3gpO1xuXG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN0KGNvZXJjZVRvU3RyaW5nKHJlc3VsdC5jYWxsKGN4KSksIGN4LCBwYXJ0aWFscyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIHN1YjogZnVuY3Rpb24obmFtZSwgY29udGV4dCwgcGFydGlhbHMsIGluZGVudCkge1xuICAgICAgdmFyIGYgPSB0aGlzLnN1YnNbbmFtZV07XG4gICAgICBpZiAoZikge1xuICAgICAgICB0aGlzLmFjdGl2ZVN1YiA9IG5hbWU7XG4gICAgICAgIGYoY29udGV4dCwgcGFydGlhbHMsIHRoaXMsIGluZGVudCk7XG4gICAgICAgIHRoaXMuYWN0aXZlU3ViID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgLy9GaW5kIGEga2V5IGluIGFuIG9iamVjdFxuICBmdW5jdGlvbiBmaW5kSW5TY29wZShrZXksIHNjb3BlLCBkb01vZGVsR2V0KSB7XG4gICAgdmFyIHZhbDtcblxuICAgIGlmIChzY29wZSAmJiB0eXBlb2Ygc2NvcGUgPT0gJ29iamVjdCcpIHtcblxuICAgICAgaWYgKHNjb3BlW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWwgPSBzY29wZVtrZXldO1xuXG4gICAgICAvLyB0cnkgbG9va3VwIHdpdGggZ2V0IGZvciBiYWNrYm9uZSBvciBzaW1pbGFyIG1vZGVsIGRhdGFcbiAgICAgIH0gZWxzZSBpZiAoZG9Nb2RlbEdldCAmJiBzY29wZS5nZXQgJiYgdHlwZW9mIHNjb3BlLmdldCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbCA9IHNjb3BlLmdldChrZXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTcGVjaWFsaXplZFBhcnRpYWwoaW5zdGFuY2UsIHN1YnMsIHBhcnRpYWxzLCBzdGFja1N1YnMsIHN0YWNrUGFydGlhbHMsIHN0YWNrVGV4dCkge1xuICAgIGZ1bmN0aW9uIFBhcnRpYWxUZW1wbGF0ZSgpIHt9O1xuICAgIFBhcnRpYWxUZW1wbGF0ZS5wcm90b3R5cGUgPSBpbnN0YW5jZTtcbiAgICBmdW5jdGlvbiBTdWJzdGl0dXRpb25zKCkge307XG4gICAgU3Vic3RpdHV0aW9ucy5wcm90b3R5cGUgPSBpbnN0YW5jZS5zdWJzO1xuICAgIHZhciBrZXk7XG4gICAgdmFyIHBhcnRpYWwgPSBuZXcgUGFydGlhbFRlbXBsYXRlKCk7XG4gICAgcGFydGlhbC5zdWJzID0gbmV3IFN1YnN0aXR1dGlvbnMoKTtcbiAgICBwYXJ0aWFsLnN1YnNUZXh0ID0ge307ICAvL2hlaGUuIHN1YnN0ZXh0LlxuICAgIHBhcnRpYWwuYnVmID0gJyc7XG5cbiAgICBzdGFja1N1YnMgPSBzdGFja1N1YnMgfHwge307XG4gICAgcGFydGlhbC5zdGFja1N1YnMgPSBzdGFja1N1YnM7XG4gICAgcGFydGlhbC5zdWJzVGV4dCA9IHN0YWNrVGV4dDtcbiAgICBmb3IgKGtleSBpbiBzdWJzKSB7XG4gICAgICBpZiAoIXN0YWNrU3Vic1trZXldKSBzdGFja1N1YnNba2V5XSA9IHN1YnNba2V5XTtcbiAgICB9XG4gICAgZm9yIChrZXkgaW4gc3RhY2tTdWJzKSB7XG4gICAgICBwYXJ0aWFsLnN1YnNba2V5XSA9IHN0YWNrU3Vic1trZXldO1xuICAgIH1cblxuICAgIHN0YWNrUGFydGlhbHMgPSBzdGFja1BhcnRpYWxzIHx8IHt9O1xuICAgIHBhcnRpYWwuc3RhY2tQYXJ0aWFscyA9IHN0YWNrUGFydGlhbHM7XG4gICAgZm9yIChrZXkgaW4gcGFydGlhbHMpIHtcbiAgICAgIGlmICghc3RhY2tQYXJ0aWFsc1trZXldKSBzdGFja1BhcnRpYWxzW2tleV0gPSBwYXJ0aWFsc1trZXldO1xuICAgIH1cbiAgICBmb3IgKGtleSBpbiBzdGFja1BhcnRpYWxzKSB7XG4gICAgICBwYXJ0aWFsLnBhcnRpYWxzW2tleV0gPSBzdGFja1BhcnRpYWxzW2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnRpYWw7XG4gIH1cblxuICB2YXIgckFtcCA9IC8mL2csXG4gICAgICByTHQgPSAvPC9nLFxuICAgICAgckd0ID0gLz4vZyxcbiAgICAgIHJBcG9zID0gL1xcJy9nLFxuICAgICAgclF1b3QgPSAvXFxcIi9nLFxuICAgICAgaENoYXJzID0gL1smPD5cXFwiXFwnXS87XG5cbiAgZnVuY3Rpb24gY29lcmNlVG9TdHJpbmcodmFsKSB7XG4gICAgcmV0dXJuIFN0cmluZygodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSA/ICcnIDogdmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhvZ2FuRXNjYXBlKHN0cikge1xuICAgIHN0ciA9IGNvZXJjZVRvU3RyaW5nKHN0cik7XG4gICAgcmV0dXJuIGhDaGFycy50ZXN0KHN0cikgP1xuICAgICAgc3RyXG4gICAgICAgIC5yZXBsYWNlKHJBbXAsICcmYW1wOycpXG4gICAgICAgIC5yZXBsYWNlKHJMdCwgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZShyR3QsICcmZ3Q7JylcbiAgICAgICAgLnJlcGxhY2UockFwb3MsICcmIzM5OycpXG4gICAgICAgIC5yZXBsYWNlKHJRdW90LCAnJnF1b3Q7JykgOlxuICAgICAgc3RyO1xuICB9XG5cbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKGEpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG59KSh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgPyBleHBvcnRzIDogSG9nYW4pO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxMSBUd2l0dGVyLCBJbmMuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vLyBUaGlzIGZpbGUgaXMgZm9yIHVzZSB3aXRoIE5vZGUuanMuIFNlZSBkaXN0LyBmb3IgYnJvd3NlciBmaWxlcy5cblxudmFyIEhvZ2FuID0gcmVxdWlyZSgnLi9jb21waWxlcicpO1xuSG9nYW4uVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlJykuVGVtcGxhdGU7XG5Ib2dhbi50ZW1wbGF0ZSA9IEhvZ2FuLlRlbXBsYXRlO1xubW9kdWxlLmV4cG9ydHMgPSBIb2dhbjtcbiIsImRpdiBTb21lIFN0YXRpYyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHB1Z19oYXNfb3duX3Byb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gcHVnX21lcmdlO1xuZnVuY3Rpb24gcHVnX21lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBwdWdfbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgPT09ICdjbGFzcycpIHtcbiAgICAgIHZhciB2YWxBID0gYVtrZXldIHx8IFtdO1xuICAgICAgYVtrZXldID0gKEFycmF5LmlzQXJyYXkodmFsQSkgPyB2YWxBIDogW3ZhbEFdKS5jb25jYXQoYltrZXldIHx8IFtdKTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgICAgdmFyIHZhbEEgPSBwdWdfc3R5bGUoYVtrZXldKTtcbiAgICAgIHZhbEEgPSB2YWxBICYmIHZhbEFbdmFsQS5sZW5ndGggLSAxXSAhPT0gJzsnID8gdmFsQSArICc7JyA6IHZhbEE7XG4gICAgICB2YXIgdmFsQiA9IHB1Z19zdHlsZShiW2tleV0pO1xuICAgICAgdmFsQiA9IHZhbEIgJiYgdmFsQlt2YWxCLmxlbmd0aCAtIDFdICE9PSAnOycgPyB2YWxCICsgJzsnIDogdmFsQjtcbiAgICAgIGFba2V5XSA9IHZhbEEgKyB2YWxCO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYXJyYXksIG9iamVjdCwgb3Igc3RyaW5nIGFzIGEgc3RyaW5nIG9mIGNsYXNzZXMgZGVsaW1pdGVkIGJ5IGEgc3BhY2UuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gYXJyYXksIGFsbCBtZW1iZXJzIG9mIGl0IGFuZCBpdHMgc3ViYXJyYXlzIGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBJZiBgZXNjYXBpbmdgIGlzIGFuIGFycmF5LCB0aGVuIHdoZXRoZXIgb3Igbm90IHRoZSBpdGVtIGluIGB2YWxgIGlzXG4gKiBlc2NhcGVkIGRlcGVuZHMgb24gdGhlIGNvcnJlc3BvbmRpbmcgaXRlbSBpbiBgZXNjYXBpbmdgLiBJZiBgZXNjYXBpbmdgIGlzXG4gKiBub3QgYW4gYXJyYXksIG5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gb2JqZWN0LCBhbGwgdGhlIGtleXMgd2hvc2UgdmFsdWUgaXMgdHJ1dGh5IGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBObyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIElmIGB2YWxgIGlzIGEgc3RyaW5nLCBpdCBpcyBjb3VudGVkIGFzIGEgY2xhc3MuIE5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogQHBhcmFtIHsoQXJyYXkuPHN0cmluZz58T2JqZWN0LjxzdHJpbmcsIGJvb2xlYW4+fHN0cmluZyl9IHZhbFxuICogQHBhcmFtIHs/QXJyYXkuPHN0cmluZz59IGVzY2FwaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xhc3NlcyA9IHB1Z19jbGFzc2VzO1xuZnVuY3Rpb24gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZykge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgY2xhc3NOYW1lLCBwYWRkaW5nID0gJycsIGVzY2FwZUVuYWJsZWQgPSBBcnJheS5pc0FycmF5KGVzY2FwaW5nKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICBjbGFzc05hbWUgPSBwdWdfY2xhc3Nlcyh2YWxbaV0pO1xuICAgIGlmICghY2xhc3NOYW1lKSBjb250aW51ZTtcbiAgICBlc2NhcGVFbmFibGVkICYmIGVzY2FwaW5nW2ldICYmIChjbGFzc05hbWUgPSBwdWdfZXNjYXBlKGNsYXNzTmFtZSkpO1xuICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyBwYWRkaW5nICsgY2xhc3NOYW1lO1xuICAgIHBhZGRpbmcgPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNsYXNzU3RyaW5nO1xufVxuZnVuY3Rpb24gcHVnX2NsYXNzZXNfb2JqZWN0KHZhbCkge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgcGFkZGluZyA9ICcnO1xuICBmb3IgKHZhciBrZXkgaW4gdmFsKSB7XG4gICAgaWYgKGtleSAmJiB2YWxba2V5XSAmJiBwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwga2V5KSkge1xuICAgICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHBhZGRpbmcgKyBrZXk7XG4gICAgICBwYWRkaW5nID0gJyAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3NTdHJpbmc7XG59XG5mdW5jdGlvbiBwdWdfY2xhc3Nlcyh2YWwsIGVzY2FwaW5nKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICByZXR1cm4gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZyk7XG4gIH0gZWxzZSBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHB1Z19jbGFzc2VzX29iamVjdCh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWwgfHwgJyc7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IG9iamVjdCBvciBzdHJpbmcgdG8gYSBzdHJpbmcgb2YgQ1NTIHN0eWxlcyBkZWxpbWl0ZWQgYnkgYSBzZW1pY29sb24uXG4gKlxuICogQHBhcmFtIHsoT2JqZWN0LjxzdHJpbmcsIHN0cmluZz58c3RyaW5nKX0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZXhwb3J0cy5zdHlsZSA9IHB1Z19zdHlsZTtcbmZ1bmN0aW9uIHB1Z19zdHlsZSh2YWwpIHtcbiAgaWYgKCF2YWwpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIHN0eWxlIGluIHZhbCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwgc3R5bGUpKSB7XG4gICAgICAgIG91dCA9IG91dCArIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXSArICc7JztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsICsgJyc7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IHB1Z19hdHRyO1xuZnVuY3Rpb24gcHVnX2F0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmICh2YWwgPT09IGZhbHNlIHx8IHZhbCA9PSBudWxsIHx8ICF2YWwgJiYgKGtleSA9PT0gJ2NsYXNzJyB8fCBrZXkgPT09ICdzdHlsZScpKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICgodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIHZhbC50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YWwgPSB2YWwudG9KU09OKCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICBpZiAoIWVzY2FwZWQgJiYgdmFsLmluZGV4T2YoJ1wiJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cXCcnICsgdmFsLnJlcGxhY2UoLycvZywgJyYjMzk7JykgKyAnXFwnJztcbiAgICB9XG4gIH1cbiAgaWYgKGVzY2FwZWQpIHZhbCA9IHB1Z19lc2NhcGUodmFsKTtcbiAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gdGVyc2Ugd2hldGhlciB0byB1c2UgSFRNTDUgdGVyc2UgYm9vbGVhbiBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBwdWdfYXR0cnM7XG5mdW5jdGlvbiBwdWdfYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBhdHRycyA9ICcnO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAocHVnX2hhc19vd25fcHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfY2xhc3Nlcyh2YWwpO1xuICAgICAgICBhdHRycyA9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpICsgYXR0cnM7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKCdzdHlsZScgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfc3R5bGUodmFsKTtcbiAgICAgIH1cbiAgICAgIGF0dHJzICs9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdHRycztcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcHVnX21hdGNoX2h0bWwgPSAvW1wiJjw+XS87XG5leHBvcnRzLmVzY2FwZSA9IHB1Z19lc2NhcGU7XG5mdW5jdGlvbiBwdWdfZXNjYXBlKF9odG1sKXtcbiAgdmFyIGh0bWwgPSAnJyArIF9odG1sO1xuICB2YXIgcmVnZXhSZXN1bHQgPSBwdWdfbWF0Y2hfaHRtbC5leGVjKGh0bWwpO1xuICBpZiAoIXJlZ2V4UmVzdWx0KSByZXR1cm4gX2h0bWw7XG5cbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgaSwgbGFzdEluZGV4LCBlc2NhcGU7XG4gIGZvciAoaSA9IHJlZ2V4UmVzdWx0LmluZGV4LCBsYXN0SW5kZXggPSAwOyBpIDwgaHRtbC5sZW5ndGg7IGkrKykge1xuICAgIHN3aXRjaCAoaHRtbC5jaGFyQ29kZUF0KGkpKSB7XG4gICAgICBjYXNlIDM0OiBlc2NhcGUgPSAnJnF1b3Q7JzsgYnJlYWs7XG4gICAgICBjYXNlIDM4OiBlc2NhcGUgPSAnJmFtcDsnOyBicmVhaztcbiAgICAgIGNhc2UgNjA6IGVzY2FwZSA9ICcmbHQ7JzsgYnJlYWs7XG4gICAgICBjYXNlIDYyOiBlc2NhcGUgPSAnJmd0Oyc7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogY29udGludWU7XG4gICAgfVxuICAgIGlmIChsYXN0SW5kZXggIT09IGkpIHJlc3VsdCArPSBodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsIGkpO1xuICAgIGxhc3RJbmRleCA9IGkgKyAxO1xuICAgIHJlc3VsdCArPSBlc2NhcGU7XG4gIH1cbiAgaWYgKGxhc3RJbmRleCAhPT0gaSkgcmV0dXJuIHJlc3VsdCArIGh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCwgaSk7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgcHVnIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIG9yaWdpbmFsIHNvdXJjZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gcHVnX3JldGhyb3c7XG5mdW5jdGlvbiBwdWdfcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcHVnX3JldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdQdWcnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcbiIsImRvY3R5cGUgaHRtbFxuaGVhZFxuXHRtZXRhKGNoYXJzZXQ9J3V0Zi04Jylcblx0dGl0bGUgaW5kZXhcblxuXHRsaW5rKHJlbD0nc3R5bGVzaGVldCcgaHJlZj0nc3RhdGljL2luZGV4LmNzcycpXG5cdHNjcmlwdChzcmM9J3N0YXRpYy9pbmRleC5qcycpXG5ib2R5XG5cdGluY2x1ZGUgc29tZVxuXHRpbmNsdWRlIC9vdGhlci9zb21lXG5cdC5kZXY9IGRldlxuXHRpZiBkZXZcblx0XHQuZGV2IFllc1xuXG5cdC5iZy5pbWcxXG5cdGltZyhzcmM9J3N0YXRpYy9hc3NldHMvcmVkLnBuZycpXG5cdC5iZy5pbWcyXG5cdGltZyhzcmM9J3N0YXRpYy9hc3NldHMvZGlyL3Zpb2xldC5wbmcnKVxuXHQuYmcuaW1nM1xuXHRpbWcoc3JjPSdzdGF0aWMvYXNzZXRzL2luZGV4L2dyZWVuLnBuZycpXG5cdC5iZy5pbWc0XG5cdGltZyhzcmM9J3N0YXRpYy9hc3NldHMvaW5kZXgvZGlyL2JsdWUucG5nJylcblxuXHRhKGhyZWY9J2xvY2FsaG9zdDo4MDgwL3N0YXRpYy9hc3NldHMvcmVkLnBuZycpXG4iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgYW5zd2VyIGZyb20gJ3RoZS1hbnN3ZXInXG5jb25zb2xlLmxvZygnYW5zd2VyJywgYW5zd2VyKVxuXG5pbXBvcnQgbm9vcCBmcm9tICdub29wMydcbmNvbnNvbGUubG9nKCdub29wJywgbm9vcClcblxuaW1wb3J0IHsgY3VycnkgfSBmcm9tICdyYW1iZGEvc3JjL2N1cnJ5J1xuY29uc29sZS5sb2coJ2N1cnJ5JywgY3VycnkpXG5cbmltcG9ydCBvdGhlciBmcm9tICd+bGliL290aGVyL290aGVyJ1xuY29uc29sZS5sb2cob3RoZXIpXG5cbmltcG9ydCBjanMgZnJvbSAnfmxpYi9vdGhlci9janMnXG5jb25zb2xlLmxvZyhjanMpXG5cbmltcG9ydCBqc29uIGZyb20gJ35saWIvb3RoZXIvb3RoZXIuanNvbidcbmNvbnNvbGUubG9nKGpzb24pXG5cblxuaW1wb3J0IHsgZGV2IH0gZnJvbSAnfm1ldGFscGlwZSdcbmZ1bmN0aW9uIGRlYnVnICguLi5hcmdzKVxue1xuXHRkZXYgJiYgY29uc29sZS5sb2coLi4uYXJncylcbn1cbmNvbnNvbGUubG9nKGRldilcbmRlYnVnKDEsIDIsIDMpXG5cbmNvbnNvbGUubG9nKHByb2Nlc3MuZW52Lk5PREVfRU5WKVxuXG5jb25zb2xlLmxvZyghISBnbG9iYWwuZ2xvYmFsKVxuXG5pbXBvcnQgcCBmcm9tICdwcm9jZXNzJ1xuY29uc29sZS5sb2cocClcblxudHlwZSBGb28gPSB7IHllczogc3RyaW5nIH1cblxudmFyIGZvbzogRm9vID0geyB5ZXM6ICd5ZXMnIH1cbmNvbnNvbGUubG9nKGZvbylcblxuLyogdGVtcGxhdGluZzogKi9cbmltcG9ydCBtc3QgZnJvbSAnfmxpYi9vdGhlci9vdGhlci5tc3QuaHRtbCdcbmNvbnNvbGUubG9nKG1zdC5yZW5kZXIoeyBkYXRhOiAneWVzJyB9KSlcblxuaW1wb3J0IHB1Z19zdGF0aWMgZnJvbSAnfmxpYi9vdGhlci9zb21lLnN0YXRpYy5wdWcnXG5jb25zb2xlLmxvZyhwdWdfc3RhdGljKVxuXG5pbXBvcnQgcHVnIGZyb20gJy4vaW5kZXgucHVnJ1xuY29uc29sZS5sb2cocHVnKHsgb3RoZXI6ICdPdGhlcicsIHNvbWU6ICdTb21lJyB9KSlcblxuZGV2OiBjb25zb2xlLmxvZygnZGV2JylcblxuZmluYWw6IGNvbnNvbGUubG9nKCdmaW5hbCcpXG5cbnRlc3Q6IGNvbnNvbGUubG9nKCd0ZXN0JylcblxuZGVidWdnZXJcbiJdLCJuYW1lcyI6WyJyZXF1aXJlJCQwIiwicmVxdWlyZSQkMSIsImdsb2JhbCIsImFuc3dlciIsIm5vb3AiLCJvdGhlciIsImRldiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQUEsQ0FBQSxPQUFBLE1BQUEsS0FBQSxXQUFBLEdBQUEsTUFBQTtZQUNBLFlBQUEsT0FBQSxJQUFBLEtBQUEsV0FBQSxHQUFBLElBQUE7WUFDQSxZQUFBLE9BQUEsTUFBQSxLQUFBLFdBQUEsR0FBQSxNQUFBLEdBQUEsRUFBQTs7WUNGQSxJQUFBLEtBQUEsR0FBQSxFQUFBOztnQkNDQSxPQUFBLEdBQUEsTUFBQSxNQUFBLEVBQUE7O1lDQUEsTUFBQSxXQUFBLEdBQUFBLE9BQUEsQ0FBQTtBQUNBO2dCQUNBLEtBQUEsR0FBQSxXQUFBLEVBQUE7O1lDSEE7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0EsU0FBQSxLQUFBLEVBQUEsRUFBQSxFQUFBLElBQUEsR0FBQSxFQUFBLEVBQUE7WUFDQSxFQUFBLE9BQUEsQ0FBQSxHQUFBLEtBQUE7WUFDQSxJQUFBLENBQUEsSUFBQSxJQUFBLElBQUEsQ0FBQSxNQUFBLElBQUEsRUFBQSxDQUFBLE1BQUEsR0FBQSxFQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsRUFBQSxFQUFBLElBQUEsQ0FBQSxFQUFBO1lBQ0EsTUFBQSxHQUFBLElBQUE7WUFDQSxNQUFBLEdBQUEsS0FBQTtZQUNBLEtBQUEsQ0FBQTtZQUNBOztZQzVDQSxnQkFBQTtZQUNBO1lBQ0EsQ0FBQSxPQUFBLE9BQUE7WUFDQTs7WUNIQSxJQUFBLElBQUEsR0FBQTs7WUNBQSxJQUFBLE1BQUEsR0FBQUEsTUFBQTtZQUNBLElBQUEsS0FBQSxJQUFBQyxLQUFBO0FBQ0E7QUFDQTtnQkFDQSxHQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxLQUFBOzs7Ozs7Ozs7WUNMQTs7O1lBR0EsU0FBQSxnQkFBQSxHQUFBO1lBQ0EsSUFBQSxNQUFBLElBQUEsS0FBQSxDQUFBLGlDQUFBLENBQUEsQ0FBQTtZQUNBLENBQUE7WUFDQSxTQUFBLG1CQUFBLElBQUE7WUFDQSxJQUFBLE1BQUEsSUFBQSxLQUFBLENBQUEsbUNBQUEsQ0FBQSxDQUFBO1lBQ0EsQ0FBQTtZQUNBLElBQUEsZ0JBQUEsR0FBQSxnQkFBQSxDQUFBO1lBQ0EsSUFBQSxrQkFBQSxHQUFBLG1CQUFBLENBQUE7WUFDQSxJQUFBLE9BQUFDLFFBQUEsQ0FBQSxVQUFBLEtBQUEsVUFBQSxFQUFBO2dCQUNBLGdCQUFBLEdBQUEsVUFBQSxDQUFBO1lBQ0EsQ0FBQTtZQUNBLElBQUEsT0FBQUEsUUFBQSxDQUFBLFlBQUEsS0FBQSxVQUFBLEVBQUE7Z0JBQ0Esa0JBQUEsR0FBQSxZQUFBLENBQUE7WUFDQSxDQUFBOztZQUVBLFNBQUEsVUFBQSxDQUFBLEdBQUEsRUFBQTtnQkFDQSxJQUFBLGdCQUFBLEtBQUEsVUFBQSxFQUFBOztZQUVBLFFBQUEsT0FBQSxVQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTs7Z0JBRUEsSUFBQSxDQUFBLGdCQUFBLEtBQUEsZ0JBQUEsSUFBQSxDQUFBLGdCQUFBLEtBQUEsVUFBQSxFQUFBO29CQUNBLGdCQUFBLEdBQUEsVUFBQSxDQUFBO1lBQ0EsUUFBQSxPQUFBLFVBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxLQUFBO2dCQUNBLElBQUE7O1lBRUEsUUFBQSxPQUFBLGdCQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBO2lCQUNBLENBQUEsTUFBQSxDQUFBLENBQUE7b0JBQ0EsSUFBQTs7d0JBRUEsT0FBQSxnQkFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBO3FCQUNBLENBQUEsTUFBQSxDQUFBLENBQUE7O3dCQUVBLE9BQUEsZ0JBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLFNBQUE7WUFDQSxLQUFBOzs7WUFHQSxDQUFBO1lBQ0EsU0FBQSxlQUFBLENBQUEsTUFBQSxFQUFBO2dCQUNBLElBQUEsa0JBQUEsS0FBQSxZQUFBLEVBQUE7O1lBRUEsUUFBQSxPQUFBLFlBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7O2dCQUVBLElBQUEsQ0FBQSxrQkFBQSxLQUFBLG1CQUFBLElBQUEsQ0FBQSxrQkFBQSxLQUFBLFlBQUEsRUFBQTtvQkFDQSxrQkFBQSxHQUFBLFlBQUEsQ0FBQTtZQUNBLFFBQUEsT0FBQSxZQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7WUFDQSxLQUFBO2dCQUNBLElBQUE7O1lBRUEsUUFBQSxPQUFBLGtCQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7aUJBQ0EsQ0FBQSxPQUFBLENBQUEsQ0FBQTtvQkFDQSxJQUFBOzt3QkFFQSxPQUFBLGtCQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBQSxNQUFBLENBQUEsQ0FBQTtxQkFDQSxDQUFBLE9BQUEsQ0FBQSxDQUFBOzs7d0JBR0EsT0FBQSxrQkFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsTUFBQSxDQUFBLENBQUE7WUFDQSxTQUFBO1lBQ0EsS0FBQTs7OztZQUlBLENBQUE7WUFDQSxJQUFBLEtBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxJQUFBLFFBQUEsR0FBQSxLQUFBLENBQUE7WUFDQSxJQUFBLFlBQUEsQ0FBQTtZQUNBLElBQUEsVUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBOztZQUVBLFNBQUEsZUFBQSxHQUFBO1lBQ0EsSUFBQSxJQUFBLENBQUEsUUFBQSxJQUFBLENBQUEsWUFBQSxFQUFBO29CQUNBLE9BQUE7WUFDQSxLQUFBO2dCQUNBLFFBQUEsR0FBQSxLQUFBLENBQUE7Z0JBQ0EsSUFBQSxZQUFBLENBQUEsTUFBQSxFQUFBO1lBQ0EsUUFBQSxLQUFBLEdBQUEsWUFBQSxDQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQTtpQkFDQSxNQUFBO29CQUNBLFVBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7Z0JBQ0EsSUFBQSxLQUFBLENBQUEsTUFBQSxFQUFBO1lBQ0EsUUFBQSxVQUFBLEVBQUEsQ0FBQTtZQUNBLEtBQUE7WUFDQSxDQUFBOztZQUVBLFNBQUEsVUFBQSxHQUFBO1lBQ0EsSUFBQSxJQUFBLFFBQUEsRUFBQTtvQkFDQSxPQUFBO1lBQ0EsS0FBQTtZQUNBLElBQUEsSUFBQSxPQUFBLEdBQUEsVUFBQSxDQUFBLGVBQUEsQ0FBQSxDQUFBO2dCQUNBLFFBQUEsR0FBQSxJQUFBLENBQUE7O1lBRUEsSUFBQSxJQUFBLEdBQUEsR0FBQSxLQUFBLENBQUEsTUFBQSxDQUFBO1lBQ0EsSUFBQSxNQUFBLEdBQUEsRUFBQTtvQkFDQSxZQUFBLEdBQUEsS0FBQSxDQUFBO29CQUNBLEtBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxRQUFBLE9BQUEsRUFBQSxVQUFBLEdBQUEsR0FBQSxFQUFBO1lBQ0EsWUFBQSxJQUFBLFlBQUEsRUFBQTtZQUNBLGdCQUFBLFlBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQTtZQUNBLGFBQUE7WUFDQSxTQUFBO29CQUNBLFVBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLFFBQUEsR0FBQSxHQUFBLEtBQUEsQ0FBQSxNQUFBLENBQUE7WUFDQSxLQUFBO2dCQUNBLFlBQUEsR0FBQSxJQUFBLENBQUE7Z0JBQ0EsUUFBQSxHQUFBLEtBQUEsQ0FBQTtnQkFDQSxlQUFBLENBQUEsT0FBQSxDQUFBLENBQUE7WUFDQSxDQUFBO1lBQ0EsU0FBQSxRQUFBLENBQUEsR0FBQSxFQUFBO2dCQUNBLElBQUEsSUFBQSxHQUFBLElBQUEsS0FBQSxDQUFBLFNBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxJQUFBLElBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUE7WUFDQSxRQUFBLEtBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxTQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxFQUFBO3dCQUNBLElBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsU0FBQTtZQUNBLEtBQUE7Z0JBQ0EsS0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLElBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQTtnQkFDQSxJQUFBLEtBQUEsQ0FBQSxNQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxFQUFBO29CQUNBLFVBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7WUFDQSxDQUFBOztZQUVBLFNBQUEsSUFBQSxDQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUE7WUFDQSxJQUFBLElBQUEsQ0FBQSxHQUFBLEdBQUEsR0FBQSxDQUFBO1lBQ0EsSUFBQSxJQUFBLENBQUEsS0FBQSxHQUFBLEtBQUEsQ0FBQTtZQUNBLENBQUE7WUFDQSxJQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsR0FBQSxZQUFBO2dCQUNBLElBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBQSxJQUFBLENBQUEsS0FBQSxDQUFBLENBQUE7YUFDQSxDQUFBO1lBQ0EsSUFBQSxLQUFBLEdBQUEsU0FBQSxDQUFBO1lBQ0EsSUFBQSxRQUFBLEdBQUEsU0FBQSxDQUFBO1lBQ0EsSUFBQSxPQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsSUFBQSxHQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxJQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxPQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxRQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxPQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxNQUFBLEdBQUEsRUFBQSxDQUFBOztZQUVBLFNBQUEsSUFBQSxHQUFBLEVBQUE7O1lBRUEsSUFBQSxFQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsSUFBQSxXQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsSUFBQSxJQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsSUFBQSxHQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsSUFBQSxjQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsSUFBQSxrQkFBQSxHQUFBLElBQUEsQ0FBQTtZQUNBLElBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQTs7WUFFQSxTQUFBLE9BQUEsQ0FBQSxJQUFBLEVBQUE7WUFDQSxJQUFBLE1BQUEsSUFBQSxLQUFBLENBQUEsa0NBQUEsQ0FBQSxDQUFBO1lBQ0EsQ0FBQTs7WUFFQSxTQUFBLEdBQUEsSUFBQSxFQUFBLE9BQUEsR0FBQSxFQUFBO1lBQ0EsU0FBQSxLQUFBLEVBQUEsR0FBQSxFQUFBO1lBQ0EsSUFBQSxNQUFBLElBQUEsS0FBQSxDQUFBLGdDQUFBLENBQUEsQ0FBQTthQUVBLFNBQUEsS0FBQSxHQUFBLEVBQUEsT0FBQSxDQUFBLENBQUEsRUFBQTs7O1lBR0EsSUFBQSxXQUFBLEdBQUFBLFFBQUEsQ0FBQSxXQUFBLElBQUEsR0FBQTtZQUNBLElBQUEsY0FBQTtZQUNBLEVBQUEsV0FBQSxDQUFBLEdBQUE7WUFDQSxFQUFBLFdBQUEsQ0FBQSxNQUFBO1lBQ0EsRUFBQSxXQUFBLENBQUEsS0FBQTtZQUNBLEVBQUEsV0FBQSxDQUFBLElBQUE7WUFDQSxFQUFBLFdBQUEsQ0FBQSxTQUFBO2NBQ0EsVUFBQSxFQUFBLE9BQUEsQ0FBQSxJQUFBLElBQUEsRUFBQSxFQUFBLE9BQUEsRUFBQSxHQUFBOzs7O1lBSUEsU0FBQSxNQUFBLENBQUEsaUJBQUEsQ0FBQTtjQUNBLElBQUEsU0FBQSxHQUFBLGNBQUEsQ0FBQSxJQUFBLENBQUEsV0FBQSxDQUFBLENBQUEsS0FBQTtZQUNBLEVBQUEsSUFBQSxPQUFBLEdBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLEVBQUE7WUFDQSxFQUFBLElBQUEsV0FBQSxHQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQTtZQUNBLEVBQUEsSUFBQSxpQkFBQSxFQUFBO1lBQ0EsSUFBQSxPQUFBLEdBQUEsT0FBQSxHQUFBLGlCQUFBLENBQUEsQ0FBQSxFQUFBO1lBQ0EsSUFBQSxXQUFBLEdBQUEsV0FBQSxHQUFBLGlCQUFBLENBQUEsQ0FBQSxFQUFBO2dCQUNBLElBQUEsV0FBQSxDQUFBLENBQUEsRUFBQTtZQUNBLE1BQUEsT0FBQSxHQUFBO1lBQ0EsTUFBQSxXQUFBLElBQUEsSUFBQTtZQUNBLEtBQUE7WUFDQSxHQUFBO1lBQ0EsRUFBQSxPQUFBLENBQUEsT0FBQSxDQUFBLFdBQUEsQ0FBQTtZQUNBLENBQUE7O1lBRUEsSUFBQSxTQUFBLEdBQUEsSUFBQSxJQUFBLEVBQUEsQ0FBQTtZQUNBLFNBQUEsTUFBQSxHQUFBO1lBQ0EsRUFBQSxJQUFBLFdBQUEsR0FBQSxJQUFBLElBQUEsRUFBQSxDQUFBO1lBQ0EsRUFBQSxJQUFBLEdBQUEsR0FBQSxXQUFBLEdBQUEsU0FBQSxDQUFBO2NBQ0EsT0FBQSxHQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsQ0FBQTs7QUFFQSxvQkFBQTtZQUNBLEVBQUEsUUFBQSxFQUFBLFFBQUE7WUFDQSxFQUFBLEtBQUEsRUFBQSxLQUFBO1lBQ0EsRUFBQSxPQUFBLEVBQUEsT0FBQTtZQUNBLEVBQUEsR0FBQSxFQUFBLEdBQUE7WUFDQSxFQUFBLElBQUEsRUFBQSxJQUFBO1lBQ0EsRUFBQSxPQUFBLEVBQUEsT0FBQTtZQUNBLEVBQUEsUUFBQSxFQUFBLFFBQUE7WUFDQSxFQUFBLEVBQUEsRUFBQSxFQUFBO1lBQ0EsRUFBQSxXQUFBLEVBQUEsV0FBQTtZQUNBLEVBQUEsSUFBQSxFQUFBLElBQUE7WUFDQSxFQUFBLEdBQUEsRUFBQSxHQUFBO1lBQ0EsRUFBQSxjQUFBLEVBQUEsY0FBQTtZQUNBLEVBQUEsa0JBQUEsRUFBQSxrQkFBQTtZQUNBLEVBQUEsSUFBQSxFQUFBLElBQUE7WUFDQSxFQUFBLE9BQUEsRUFBQSxPQUFBO1lBQ0EsRUFBQSxHQUFBLEVBQUEsR0FBQTtZQUNBLEVBQUEsS0FBQSxFQUFBLEtBQUE7WUFDQSxFQUFBLEtBQUEsRUFBQSxLQUFBO1lBQ0EsRUFBQSxNQUFBLEVBQUEsTUFBQTtZQUNBLEVBQUEsUUFBQSxFQUFBLFFBQUE7WUFDQSxFQUFBLE9BQUEsRUFBQSxPQUFBO1lBQ0EsRUFBQSxNQUFBLEVBQUEsTUFBQTtZQUNBLEVBQUEsTUFBQSxFQUFBLE1BQUE7YUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUM5TUEsQ0FBQSxVQUFBLEtBQUEsRUFBQTtZQUNBO1lBQ0E7WUFDQSxFQUFBLElBQUEsYUFBQSxHQUFBLElBQUE7WUFDQSxNQUFBLEtBQUEsR0FBQSxLQUFBO1lBQ0EsTUFBQSxRQUFBLElBQUEsS0FBQTtZQUNBLE1BQUEsR0FBQSxHQUFBLEtBQUE7WUFDQSxNQUFBLE1BQUEsR0FBQSxLQUFBO1lBQ0EsTUFBQSxRQUFBLEdBQUEsUUFBQTtZQUNBLE1BQUEsYUFBQSxHQUFBLFFBQUEsQ0FBQTtBQUNBO1lBQ0EsRUFBQSxLQUFBLENBQUEsSUFBQSxHQUFBO1lBQ0EsSUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQTtZQUNBLElBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQTtZQUNBLElBQUEsR0FBQSxFQUFBLEVBQUEsRUFBQSxHQUFBLEVBQUEsRUFBQSxFQUFBLElBQUEsRUFBQSxFQUFBO1lBQ0EsR0FBQSxDQUFBO0FBQ0E7WUFDQSxFQUFBLEtBQUEsQ0FBQSxJQUFBLEdBQUEsU0FBQSxJQUFBLENBQUEsSUFBQSxFQUFBLFVBQUEsRUFBQTtZQUNBLElBQUEsSUFBQSxHQUFBLEdBQUEsSUFBQSxDQUFBLE1BQUE7WUFDQSxRQUFBLE9BQUEsR0FBQSxDQUFBO1lBQ0EsUUFBQSxXQUFBLEdBQUEsQ0FBQTtZQUNBLFFBQUEsTUFBQSxHQUFBLENBQUE7WUFDQSxRQUFBLEtBQUEsR0FBQSxPQUFBO1lBQ0EsUUFBQSxPQUFBLEdBQUEsSUFBQTtZQUNBLFFBQUEsR0FBQSxHQUFBLElBQUE7WUFDQSxRQUFBLEdBQUEsR0FBQSxFQUFBO1lBQ0EsUUFBQSxNQUFBLEdBQUEsRUFBQTtZQUNBLFFBQUEsT0FBQSxHQUFBLEtBQUE7WUFDQSxRQUFBLENBQUEsR0FBQSxDQUFBO1lBQ0EsUUFBQSxTQUFBLEdBQUEsQ0FBQTtZQUNBLFFBQUEsSUFBQSxHQUFBLElBQUE7WUFDQSxRQUFBLElBQUEsR0FBQSxJQUFBLENBQUE7QUFDQTtZQUNBLElBQUEsU0FBQSxNQUFBLEdBQUE7WUFDQSxNQUFBLElBQUEsR0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUE7WUFDQSxRQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxRQUFBLEdBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxPQUFBO1lBQ0EsS0FBQTtBQUNBO1lBQ0EsSUFBQSxTQUFBLGdCQUFBLEdBQUE7WUFDQSxNQUFBLElBQUEsZUFBQSxHQUFBLElBQUEsQ0FBQTtZQUNBLE1BQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxTQUFBLEVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7WUFDQSxRQUFBLGVBQUE7WUFDQSxVQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUE7WUFDQSxXQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsSUFBQSxJQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLGFBQUEsQ0FBQSxLQUFBLElBQUEsQ0FBQSxDQUFBO1lBQ0EsUUFBQSxJQUFBLENBQUEsZUFBQSxFQUFBO1lBQ0EsVUFBQSxPQUFBLEtBQUEsQ0FBQTtZQUNBLFNBQUE7WUFDQSxPQUFBO0FBQ0E7WUFDQSxNQUFBLE9BQUEsZUFBQSxDQUFBO1lBQ0EsS0FBQTtBQUNBO1lBQ0EsSUFBQSxTQUFBLFVBQUEsQ0FBQSxXQUFBLEVBQUEsU0FBQSxFQUFBO1lBQ0EsTUFBQSxNQUFBLEVBQUEsQ0FBQTtBQUNBO1lBQ0EsTUFBQSxJQUFBLFdBQUEsSUFBQSxnQkFBQSxFQUFBLEVBQUE7WUFDQSxRQUFBLEtBQUEsSUFBQSxDQUFBLEdBQUEsU0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTtZQUNBLFVBQUEsSUFBQSxNQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxFQUFBO1lBQ0EsWUFBQSxJQUFBLENBQUEsSUFBQSxHQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsSUFBQSxDQUFBLEdBQUEsSUFBQSxHQUFBLEVBQUE7WUFDQTtZQUNBLGNBQUEsSUFBQSxDQUFBLE1BQUEsR0FBQSxNQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLFFBQUEsR0FBQTtZQUNBLGFBQUE7WUFDQSxZQUFBLE1BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsV0FBQTtZQUNBLFNBQUE7WUFDQSxPQUFBLE1BQUEsSUFBQSxDQUFBLFNBQUEsRUFBQTtZQUNBLFFBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsT0FBQTtBQUNBO1lBQ0EsTUFBQSxPQUFBLEdBQUEsS0FBQSxDQUFBO1lBQ0EsTUFBQSxTQUFBLEdBQUEsTUFBQSxDQUFBLE1BQUEsQ0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBLElBQUEsU0FBQSxnQkFBQSxDQUFBLElBQUEsRUFBQSxLQUFBLEVBQUE7WUFDQSxNQUFBLElBQUEsS0FBQSxHQUFBLEdBQUEsR0FBQSxJQUFBO1lBQ0EsVUFBQSxVQUFBLEdBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxLQUFBLEVBQUEsS0FBQSxDQUFBO1lBQ0EsVUFBQSxVQUFBLEdBQUEsSUFBQTtZQUNBLFlBQUEsSUFBQSxDQUFBLFNBQUEsQ0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLEdBQUEsRUFBQSxLQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsVUFBQSxDQUFBO1lBQ0EsV0FBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQTtBQUNBO1lBQ0EsTUFBQSxJQUFBLEdBQUEsVUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsTUFBQSxJQUFBLEdBQUEsVUFBQSxDQUFBLFVBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQTtZQUNBLE1BQUEsT0FBQSxVQUFBLEdBQUEsS0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQSxJQUFBLElBQUEsVUFBQSxFQUFBO1lBQ0EsTUFBQSxVQUFBLEdBQUEsVUFBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsSUFBQSxHQUFBLFVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsSUFBQSxHQUFBLFVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBLElBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7WUFDQSxNQUFBLElBQUEsS0FBQSxJQUFBLE9BQUEsRUFBQTtZQUNBLFFBQUEsSUFBQSxTQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxDQUFBLENBQUEsRUFBQTtZQUNBLFVBQUEsRUFBQSxDQUFBLENBQUE7WUFDQSxVQUFBLE1BQUEsRUFBQSxDQUFBO1lBQ0EsVUFBQSxLQUFBLEdBQUEsV0FBQSxDQUFBO1lBQ0EsU0FBQSxNQUFBO1lBQ0EsVUFBQSxJQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsSUFBQSxFQUFBO1lBQ0EsWUFBQSxVQUFBLENBQUEsT0FBQSxDQUFBLENBQUE7WUFDQSxXQUFBLE1BQUE7WUFDQSxZQUFBLEdBQUEsSUFBQSxJQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsV0FBQTtZQUNBLFNBQUE7WUFDQSxPQUFBLE1BQUEsSUFBQSxLQUFBLElBQUEsV0FBQSxFQUFBO1lBQ0EsUUFBQSxDQUFBLElBQUEsSUFBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxRQUFBLEdBQUEsR0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxRQUFBLE9BQUEsR0FBQSxHQUFBLEdBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsUUFBQSxJQUFBLE9BQUEsSUFBQSxHQUFBLEVBQUE7WUFDQSxVQUFBLENBQUEsR0FBQSxnQkFBQSxDQUFBLElBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLFVBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQTtZQUNBLFNBQUEsTUFBQTtZQUNBLFVBQUEsSUFBQSxHQUFBLEVBQUE7WUFDQSxZQUFBLENBQUEsRUFBQSxDQUFBO1lBQ0EsV0FBQTtZQUNBLFVBQUEsS0FBQSxHQUFBLE1BQUEsQ0FBQTtZQUNBLFNBQUE7WUFDQSxRQUFBLE9BQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxPQUFBLE1BQUE7WUFDQSxRQUFBLElBQUEsU0FBQSxDQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQUE7WUFDQSxVQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLENBQUEsRUFBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQTtZQUNBLHVCQUFBLENBQUEsRUFBQSxDQUFBLE9BQUEsSUFBQSxHQUFBLElBQUEsT0FBQSxHQUFBLElBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsVUFBQSxHQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsVUFBQSxDQUFBLElBQUEsSUFBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxVQUFBLEtBQUEsR0FBQSxPQUFBLENBQUE7WUFDQSxVQUFBLElBQUEsT0FBQSxJQUFBLEdBQUEsRUFBQTtZQUNBLFlBQUEsSUFBQSxJQUFBLElBQUEsSUFBQSxFQUFBO1lBQ0EsY0FBQSxDQUFBLEVBQUEsQ0FBQTtZQUNBLGFBQUEsTUFBQTtZQUNBLGNBQUEsaUJBQUEsQ0FBQSxNQUFBLENBQUEsTUFBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsYUFBQTtZQUNBLFdBQUE7WUFDQSxTQUFBLE1BQUE7WUFDQSxVQUFBLEdBQUEsSUFBQSxJQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsU0FBQTtZQUNBLE9BQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQSxJQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7QUFDQTtZQUNBLElBQUEsT0FBQSxNQUFBLENBQUE7WUFDQSxJQUFBO0FBQ0E7WUFDQSxFQUFBLFNBQUEsaUJBQUEsQ0FBQSxLQUFBLEVBQUE7WUFDQSxJQUFBLElBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxFQUFBO1lBQ0EsTUFBQSxLQUFBLENBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7WUFDQSxHQUFBO0FBQ0E7WUFDQSxFQUFBLFNBQUEsSUFBQSxDQUFBLENBQUEsRUFBQTtZQUNBLElBQUEsSUFBQSxDQUFBLENBQUEsSUFBQSxFQUFBO1lBQ0EsTUFBQSxPQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUEsQ0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBLElBQUEsT0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLFlBQUEsRUFBQSxFQUFBLENBQUEsQ0FBQTtZQUNBLEdBQUE7QUFDQTtZQUNBLEVBQUEsU0FBQSxTQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUE7WUFDQSxJQUFBLElBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBO1lBQ0EsTUFBQSxPQUFBLEtBQUEsQ0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBLElBQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTtZQUNBLE1BQUEsSUFBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBO1lBQ0EsUUFBQSxPQUFBLEtBQUEsQ0FBQTtZQUNBLE9BQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQSxJQUFBLE9BQUEsSUFBQSxDQUFBO1lBQ0EsR0FBQTtBQUNBO1lBQ0E7WUFDQSxFQUFBLElBQUEsY0FBQSxHQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsQ0FBQSxDQUFBO0FBQ0E7WUFDQSxFQUFBLFNBQUEsU0FBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLFVBQUEsRUFBQTtZQUNBLElBQUEsSUFBQSxZQUFBLEdBQUEsRUFBQTtZQUNBLFFBQUEsTUFBQSxHQUFBLElBQUE7WUFDQSxRQUFBLElBQUEsR0FBQSxJQUFBO1lBQ0EsUUFBQSxLQUFBLEdBQUEsSUFBQSxDQUFBO0FBQ0E7WUFDQSxJQUFBLElBQUEsR0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBO1lBQ0EsSUFBQSxPQUFBLE1BQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxFQUFBO1lBQ0EsTUFBQSxLQUFBLEdBQUEsTUFBQSxDQUFBLEtBQUEsRUFBQSxDQUFBO0FBQ0E7WUFDQSxNQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQSxJQUFBLEVBQUEsS0FBQSxDQUFBLEdBQUEsSUFBQSxjQUFBLENBQUEsRUFBQTtZQUNBLFFBQUEsTUFBQSxJQUFBLEtBQUEsQ0FBQSxpQ0FBQSxDQUFBLENBQUE7WUFDQSxPQUFBO0FBQ0E7WUFDQSxNQUFBLElBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxRQUFBLENBQUEsS0FBQSxFQUFBLFVBQUEsQ0FBQSxFQUFBO1lBQ0EsUUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBO1lBQ0EsUUFBQSxLQUFBLENBQUEsS0FBQSxHQUFBLFNBQUEsQ0FBQSxNQUFBLEVBQUEsS0FBQSxDQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsVUFBQSxDQUFBLENBQUE7WUFDQSxPQUFBLE1BQUEsSUFBQSxLQUFBLENBQUEsR0FBQSxJQUFBLEdBQUEsRUFBQTtZQUNBLFFBQUEsSUFBQSxLQUFBLENBQUEsTUFBQSxLQUFBLENBQUEsRUFBQTtZQUNBLFVBQUEsTUFBQSxJQUFBLEtBQUEsQ0FBQSwrQkFBQSxHQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLFNBQUE7WUFDQSxRQUFBLE1BQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxRQUFBLElBQUEsS0FBQSxDQUFBLENBQUEsSUFBQSxNQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLENBQUEsRUFBQSxVQUFBLENBQUEsRUFBQTtZQUNBLFVBQUEsTUFBQSxJQUFBLEtBQUEsQ0FBQSxpQkFBQSxHQUFBLE1BQUEsQ0FBQSxDQUFBLEdBQUEsT0FBQSxHQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLFNBQUE7WUFDQSxRQUFBLE1BQUEsQ0FBQSxHQUFBLEdBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLFFBQUEsT0FBQSxZQUFBLENBQUE7WUFDQSxPQUFBLE1BQUEsSUFBQSxLQUFBLENBQUEsR0FBQSxJQUFBLElBQUEsRUFBQTtZQUNBLFFBQUEsS0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxNQUFBLElBQUEsQ0FBQSxNQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsSUFBQSxDQUFBLENBQUE7WUFDQSxPQUFBO0FBQ0E7WUFDQSxNQUFBLFlBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLENBQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQSxJQUFBLElBQUEsS0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUE7WUFDQSxNQUFBLE1BQUEsSUFBQSxLQUFBLENBQUEsdUJBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQSxJQUFBLE9BQUEsWUFBQSxDQUFBO1lBQ0EsR0FBQTtBQUNBO1lBQ0EsRUFBQSxTQUFBLFFBQUEsQ0FBQSxLQUFBLEVBQUEsSUFBQSxFQUFBO1lBQ0EsSUFBQSxLQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsS0FBQSxDQUFBLENBQUEsRUFBQTtZQUNBLFFBQUEsS0FBQSxDQUFBLEdBQUEsR0FBQSxHQUFBLENBQUE7WUFDQSxRQUFBLE9BQUEsSUFBQSxDQUFBO1lBQ0EsT0FBQTtZQUNBLEtBQUE7WUFDQSxHQUFBO0FBQ0E7WUFDQSxFQUFBLFNBQUEsUUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO1lBQ0EsSUFBQSxLQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsS0FBQSxJQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsSUFBQSxFQUFBO1lBQ0EsUUFBQSxPQUFBLElBQUEsQ0FBQTtZQUNBLE9BQUE7WUFDQSxLQUFBO1lBQ0EsR0FBQTtBQUNBO1lBQ0EsRUFBQSxTQUFBLHNCQUFBLENBQUEsR0FBQSxFQUFBO1lBQ0EsSUFBQSxJQUFBLEtBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxJQUFBLEtBQUEsSUFBQSxHQUFBLElBQUEsR0FBQSxFQUFBO1lBQ0EsTUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsd0JBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxLQUFBO1lBQ0EsSUFBQSxPQUFBLElBQUEsR0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQTtZQUNBLEdBQUE7QUFDQTtZQUNBLEVBQUEsU0FBQSxpQkFBQSxDQUFBLE9BQUEsRUFBQTtZQUNBLElBQUEsSUFBQSxRQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxLQUFBLElBQUEsR0FBQSxJQUFBLE9BQUEsQ0FBQSxRQUFBLEVBQUE7WUFDQSxNQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxXQUFBLEdBQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsS0FBQSxHQUFBLGlCQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtZQUNBLElBQUEsT0FBQSxhQUFBLEdBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxXQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7WUFDQSxHQUFBO0FBQ0E7WUFDQSxFQUFBLEtBQUEsQ0FBQSxTQUFBLEdBQUEsU0FBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtZQUNBLElBQUEsT0FBQSw0QkFBQSxHQUFBLEtBQUEsQ0FBQSxRQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLEtBQUEsR0FBQSxpQkFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQTtZQUNBLElBQUE7QUFDQTtZQUNBLEVBQUEsSUFBQSxRQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsRUFBQSxLQUFBLENBQUEsUUFBQSxHQUFBLFNBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7WUFDQSxJQUFBLFFBQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxJQUFBLElBQUEsT0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQSxFQUFBLFFBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQTtZQUNBLElBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLENBQUE7QUFDQTtZQUNBLElBQUEsSUFBQSxPQUFBLENBQUEsUUFBQSxFQUFBO1lBQ0EsTUFBQSxPQUFBLElBQUEsQ0FBQSxTQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBLElBQUEsT0FBQSxJQUFBLENBQUEsWUFBQSxDQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLENBQUE7WUFDQSxJQUFBO0FBQ0E7WUFDQSxFQUFBLEtBQUEsQ0FBQSxRQUFBLEdBQUEsU0FBQSxJQUFBLEVBQUE7WUFDQSxJQUFBLE9BQUEsMEJBQUEsR0FBQSxJQUFBLEdBQUEsZ0JBQUEsQ0FBQTtZQUNBLElBQUE7QUFDQTtZQUNBLEVBQUEsS0FBQSxDQUFBLFFBQUEsR0FBQSxLQUFBLENBQUEsUUFBQSxDQUFBO0FBQ0E7WUFDQSxFQUFBLEtBQUEsQ0FBQSxZQUFBLEdBQUEsU0FBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtZQUNBLElBQUEsSUFBQSxRQUFBLEdBQUEsSUFBQSxDQUFBLFlBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQTtZQUNBLElBQUEsUUFBQSxDQUFBLElBQUEsR0FBQSxJQUFBLFFBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLENBQUEsUUFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsSUFBQSxPQUFBLElBQUEsSUFBQSxDQUFBLFFBQUEsQ0FBQSxRQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQTtZQUNBLElBQUE7QUFDQTtZQUNBLEVBQUEsS0FBQSxDQUFBLFlBQUEsR0FBQSxTQUFBLE9BQUEsRUFBQTtZQUNBLElBQUEsSUFBQSxHQUFBLEVBQUEsUUFBQSxHQUFBLENBQUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO1lBQ0EsSUFBQSxLQUFBLEdBQUEsSUFBQSxRQUFBLENBQUEsUUFBQSxFQUFBO1lBQ0EsTUFBQSxRQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxZQUFBLENBQUEsUUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtZQUNBLElBQUEsS0FBQSxHQUFBLElBQUEsT0FBQSxDQUFBLElBQUEsRUFBQTtZQUNBLE1BQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxJQUFBLFFBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtZQUNBLElBQUEsT0FBQSxRQUFBLENBQUE7WUFDQSxJQUFBO0FBQ0E7WUFDQSxFQUFBLFNBQUEsR0FBQSxDQUFBLENBQUEsRUFBQTtZQUNBLElBQUEsT0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLE1BQUEsRUFBQSxNQUFBLENBQUE7WUFDQSxhQUFBLE9BQUEsQ0FBQSxLQUFBLEVBQUEsTUFBQSxDQUFBO1lBQ0EsYUFBQSxPQUFBLENBQUEsUUFBQSxFQUFBLEtBQUEsQ0FBQTtZQUNBLGFBQUEsT0FBQSxDQUFBLEdBQUEsRUFBQSxLQUFBLENBQUE7WUFDQSxhQUFBLE9BQUEsQ0FBQSxRQUFBLEVBQUEsU0FBQSxDQUFBO1lBQ0EsYUFBQSxPQUFBLENBQUEsYUFBQSxFQUFBLFNBQUEsQ0FBQSxDQUFBO1lBQ0EsR0FBQTtBQUNBO1lBQ0EsRUFBQSxTQUFBLFlBQUEsQ0FBQSxDQUFBLEVBQUE7WUFDQSxJQUFBLE9BQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQTtZQUNBLEdBQUE7QUFDQTtZQUNBLEVBQUEsU0FBQSxhQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtZQUNBLElBQUEsSUFBQSxNQUFBLEdBQUEsR0FBQSxJQUFBLE9BQUEsQ0FBQSxNQUFBLElBQUEsRUFBQSxDQUFBLENBQUE7WUFDQSxJQUFBLElBQUEsR0FBQSxHQUFBLE1BQUEsR0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLFFBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxPQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUEsUUFBQSxFQUFBLEVBQUEsQ0FBQSxDQUFBO1lBQ0EsSUFBQSxPQUFBLENBQUEsSUFBQSxJQUFBLFlBQUEsSUFBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsU0FBQSxJQUFBLElBQUEsQ0FBQSxNQUFBLElBQUEsRUFBQSxDQUFBLEdBQUEsTUFBQSxDQUFBO1lBQ0EsSUFBQSxPQUFBLEdBQUEsQ0FBQTtZQUNBLEdBQUE7QUFDQTtZQUNBLEVBQUEsS0FBQSxDQUFBLE9BQUEsR0FBQTtZQUNBLElBQUEsR0FBQSxFQUFBLFNBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtZQUNBLE1BQUEsT0FBQSxDQUFBLElBQUEsSUFBQSxXQUFBLEdBQUEsWUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLEdBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxXQUFBO1lBQ0Esc0JBQUEsUUFBQSxHQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLEdBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUEsTUFBQTtZQUNBLHNCQUFBLFdBQUEsR0FBQSxrQkFBQSxDQUFBO1lBQ0EsTUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLEVBQUEsT0FBQSxDQUFBLENBQUE7WUFDQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLElBQUEsY0FBQSxDQUFBO1lBQ0EsS0FBQTtBQUNBO1lBQ0EsSUFBQSxHQUFBLEVBQUEsU0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO1lBQ0EsTUFBQSxPQUFBLENBQUEsSUFBQSxJQUFBLFlBQUEsR0FBQSxZQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLDBCQUFBLENBQUE7WUFDQSxNQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsT0FBQSxDQUFBLElBQUEsSUFBQSxJQUFBLENBQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQSxJQUFBLEdBQUEsRUFBQSxhQUFBO1lBQ0EsSUFBQSxHQUFBLEVBQUEsU0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLEdBQUEsR0FBQSxDQUFBLFFBQUEsRUFBQSxFQUFBLEVBQUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQSxFQUFBLFNBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsTUFBQSxJQUFBLFFBQUEsR0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLGFBQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsUUFBQSxDQUFBLElBQUEsR0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBO1lBQ0EsTUFBQSxRQUFBLENBQUEsUUFBQSxHQUFBLEdBQUEsQ0FBQSxRQUFBLENBQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQSxJQUFBLEdBQUEsRUFBQSxTQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7WUFDQSxNQUFBLElBQUEsR0FBQSxHQUFBLENBQUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLENBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxNQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsRUFBQSxHQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQTtZQUNBLE1BQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxTQUFBLEVBQUE7WUFDQSxRQUFBLE9BQUEsQ0FBQSxJQUFBLElBQUEsU0FBQSxHQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsV0FBQSxDQUFBO1lBQ0EsT0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBLElBQUEsSUFBQSxFQUFBLFNBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtZQUNBLE1BQUEsT0FBQSxDQUFBLElBQUEsSUFBQSxLQUFBLENBQUEsT0FBQSxJQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUEsRUFBQSxHQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQSxJQUFBLElBQUEsRUFBQSxTQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7WUFDQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLElBQUEsWUFBQSxHQUFBLFlBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxHQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsYUFBQSxDQUFBO1lBQ0EsS0FBQTtBQUNBO1lBQ0EsSUFBQSxJQUFBLEVBQUEsU0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO1lBQ0EsTUFBQSxPQUFBLENBQUEsSUFBQSxJQUFBLEtBQUEsQ0FBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBLElBQUEsR0FBQSxFQUFBLFlBQUE7QUFDQTtZQUNBLElBQUEsR0FBQSxFQUFBLFlBQUE7WUFDQSxJQUFBO0FBQ0E7WUFDQSxFQUFBLFNBQUEsWUFBQSxDQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7WUFDQSxJQUFBLE9BQUEsQ0FBQSxJQUFBLElBQUEsWUFBQSxHQUFBLFlBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxHQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsYUFBQSxDQUFBO1lBQ0EsR0FBQTtBQUNBO1lBQ0EsRUFBQSxTQUFBLEtBQUEsQ0FBQSxDQUFBLEVBQUE7WUFDQSxJQUFBLE9BQUEsTUFBQSxHQUFBLENBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxHQUFBO0FBQ0E7WUFDQSxFQUFBLEtBQUEsQ0FBQSxJQUFBLEdBQUEsU0FBQSxRQUFBLEVBQUEsT0FBQSxFQUFBO1lBQ0EsSUFBQSxJQUFBLElBQUEsQ0FBQTtZQUNBLElBQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLFFBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTtZQUNBLE1BQUEsSUFBQSxHQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsTUFBQSxJQUFBLElBQUEsSUFBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7WUFDQSxJQUFBLE9BQUEsT0FBQSxDQUFBO1lBQ0EsSUFBQTtBQUNBO1lBQ0EsRUFBQSxLQUFBLENBQUEsS0FBQSxHQUFBLFNBQUEsTUFBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7WUFDQSxJQUFBLE9BQUEsR0FBQSxPQUFBLElBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxPQUFBLFNBQUEsQ0FBQSxNQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxPQUFBLENBQUEsV0FBQSxJQUFBLEVBQUEsQ0FBQSxDQUFBO1lBQ0EsSUFBQTtBQUNBO1lBQ0EsRUFBQSxLQUFBLENBQUEsS0FBQSxHQUFBLEVBQUEsQ0FBQTtBQUNBO1lBQ0EsRUFBQSxLQUFBLENBQUEsUUFBQSxHQUFBLFNBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtZQUNBLElBQUEsT0FBQSxDQUFBLElBQUEsRUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsRUFBQSxDQUFBLENBQUEsT0FBQSxDQUFBLGFBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxFQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO1lBQ0EsSUFBQTtBQUNBO1lBQ0EsRUFBQSxLQUFBLENBQUEsT0FBQSxHQUFBLFNBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtZQUNBLElBQUEsT0FBQSxHQUFBLE9BQUEsSUFBQSxFQUFBLENBQUE7WUFDQSxJQUFBLElBQUEsR0FBQSxHQUFBLEtBQUEsQ0FBQSxRQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxDQUFBO1lBQ0EsSUFBQSxJQUFBLFFBQUEsR0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO0FBQ0E7WUFDQSxJQUFBLElBQUEsUUFBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLFFBQUEsR0FBQSxRQUFBLENBQUEsUUFBQSxDQUFBO1lBQ0EsTUFBQSxLQUFBLElBQUEsSUFBQSxJQUFBLFFBQUEsRUFBQTtZQUNBLFFBQUEsT0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsUUFBQSxDQUFBO1lBQ0EsT0FBQTtZQUNBLE1BQUEsT0FBQSxRQUFBLENBQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQSxJQUFBLFFBQUEsR0FBQSxJQUFBLENBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLENBQUE7WUFDQSxJQUFBLE9BQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxRQUFBLENBQUE7WUFDQSxJQUFBO1lBQ0EsQ0FBQSxFQUFBLE9BQUEsQ0FBQSxDQUFBLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RaQTtZQUNBLENBQUEsVUFBQSxLQUFBLEVBQUE7WUFDQSxFQUFBLEtBQUEsQ0FBQSxRQUFBLEdBQUEsVUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLEVBQUE7WUFDQSxJQUFBLE9BQUEsR0FBQSxPQUFBLElBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLElBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLElBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxRQUFBLENBQUE7WUFDQSxJQUFBLElBQUEsQ0FBQSxPQUFBLEdBQUEsT0FBQSxJQUFBLEVBQUEsQ0FBQTtZQUNBLElBQUEsSUFBQSxDQUFBLElBQUEsR0FBQSxJQUFBLElBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxJQUFBLENBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxRQUFBLElBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxJQUFBLENBQUEsSUFBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLElBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxJQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQTtZQUNBLElBQUE7QUFDQTtZQUNBLEVBQUEsS0FBQSxDQUFBLFFBQUEsQ0FBQSxTQUFBLEdBQUE7WUFDQTtZQUNBLElBQUEsQ0FBQSxFQUFBLFVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQ0E7WUFDQTtZQUNBLElBQUEsQ0FBQSxFQUFBLFdBQUE7QUFDQTtZQUNBO1lBQ0EsSUFBQSxDQUFBLEVBQUEsY0FBQTtBQUNBO1lBQ0EsSUFBQSxNQUFBLEVBQUEsU0FBQSxNQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUE7WUFDQSxNQUFBLE9BQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxFQUFBLFFBQUEsSUFBQSxFQUFBLEVBQUEsTUFBQSxDQUFBLENBQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQTtZQUNBLElBQUEsRUFBQSxFQUFBLFVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUE7WUFDQSxNQUFBLE9BQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLE1BQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtBQUNBO1lBQ0E7WUFDQSxJQUFBLEVBQUEsRUFBQSxTQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUE7WUFDQSxNQUFBLElBQUEsT0FBQSxHQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsTUFBQSxDQUFBLENBQUE7QUFDQTtZQUNBO1lBQ0EsTUFBQSxJQUFBLFFBQUEsR0FBQSxRQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO1lBQ0EsTUFBQSxJQUFBLE9BQUEsQ0FBQSxRQUFBLElBQUEsT0FBQSxDQUFBLElBQUEsSUFBQSxRQUFBLEVBQUE7WUFDQSxRQUFBLE9BQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQTtZQUNBLE9BQUE7QUFDQTtZQUNBLE1BQUEsSUFBQSxPQUFBLFFBQUEsSUFBQSxRQUFBLEVBQUE7WUFDQSxRQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBO1lBQ0EsVUFBQSxNQUFBLElBQUEsS0FBQSxDQUFBLHdCQUFBLENBQUEsQ0FBQTtZQUNBLFNBQUE7WUFDQSxRQUFBLFFBQUEsR0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLEVBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBO1lBQ0EsT0FBQTtBQUNBO1lBQ0EsTUFBQSxJQUFBLENBQUEsUUFBQSxFQUFBO1lBQ0EsUUFBQSxPQUFBLElBQUEsQ0FBQTtZQUNBLE9BQUE7QUFDQTtZQUNBO1lBQ0EsTUFBQSxJQUFBLENBQUEsUUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLElBQUEsR0FBQSxRQUFBLENBQUE7QUFDQTtZQUNBLE1BQUEsSUFBQSxPQUFBLENBQUEsSUFBQSxFQUFBO1lBQ0E7WUFDQSxRQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsU0FBQSxFQUFBLFFBQUEsQ0FBQSxTQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsUUFBQSxLQUFBLEdBQUEsSUFBQSxPQUFBLENBQUEsSUFBQSxFQUFBO1lBQ0EsVUFBQSxJQUFBLENBQUEsUUFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQTtZQUNBLFlBQUEsUUFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLEtBQUEsU0FBQSxJQUFBLFFBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsQ0FBQSxJQUFBLFFBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxJQUFBLENBQUE7WUFDQSxXQUFBO1lBQ0EsU0FBQTtZQUNBLFFBQUEsUUFBQSxHQUFBLHdCQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFFBQUE7WUFDQSxVQUFBLElBQUEsQ0FBQSxTQUFBLEVBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxRQUFBLENBQUEsU0FBQSxDQUFBLENBQUE7WUFDQSxPQUFBO1lBQ0EsTUFBQSxJQUFBLENBQUEsUUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBLFFBQUEsR0FBQSxRQUFBLENBQUE7QUFDQTtZQUNBLE1BQUEsT0FBQSxRQUFBLENBQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQTtZQUNBLElBQUEsRUFBQSxFQUFBLFNBQUEsTUFBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsTUFBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLE9BQUEsR0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsSUFBQSxDQUFBLE9BQUEsRUFBQTtZQUNBLFFBQUEsT0FBQSxFQUFBLENBQUE7WUFDQSxPQUFBO0FBQ0E7WUFDQSxNQUFBLE9BQUEsT0FBQSxDQUFBLEVBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLE1BQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtBQUNBO1lBQ0E7WUFDQSxJQUFBLEVBQUEsRUFBQSxTQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsT0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBO1lBQ0EsTUFBQSxJQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBO1lBQ0EsUUFBQSxPQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQTtZQUNBLFFBQUEsT0FBQTtZQUNBLE9BQUE7QUFDQTtZQUNBLE1BQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7WUFDQSxRQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxRQUFBLE9BQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBO1lBQ0EsUUFBQSxPQUFBLENBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxPQUFBO1lBQ0EsS0FBQTtBQUNBO1lBQ0E7WUFDQSxJQUFBLENBQUEsRUFBQSxTQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsUUFBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQTtZQUNBLE1BQUEsSUFBQSxJQUFBLENBQUE7QUFDQTtZQUNBLE1BQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLE1BQUEsS0FBQSxDQUFBLEVBQUE7WUFDQSxRQUFBLE9BQUEsS0FBQSxDQUFBO1lBQ0EsT0FBQTtBQUNBO1lBQ0EsTUFBQSxJQUFBLE9BQUEsR0FBQSxJQUFBLFVBQUEsRUFBQTtZQUNBLFFBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7WUFDQSxPQUFBO0FBQ0E7WUFDQSxNQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBO0FBQ0E7WUFDQSxNQUFBLElBQUEsQ0FBQSxRQUFBLElBQUEsSUFBQSxJQUFBLEdBQUEsRUFBQTtZQUNBLFFBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLE9BQUEsR0FBQSxJQUFBLFFBQUEsSUFBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLE9BQUE7QUFDQTtZQUNBLE1BQUEsT0FBQSxJQUFBLENBQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQTtZQUNBLElBQUEsQ0FBQSxFQUFBLFNBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsV0FBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLEtBQUE7WUFDQSxVQUFBLEtBQUEsR0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQTtZQUNBLFVBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsV0FBQSxDQUFBO1lBQ0EsVUFBQSxVQUFBLEdBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBO1lBQ0EsVUFBQSxFQUFBLEdBQUEsSUFBQSxDQUFBO0FBQ0E7WUFDQSxNQUFBLElBQUEsR0FBQSxLQUFBLEdBQUEsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQTtZQUNBLFFBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsT0FBQSxNQUFBO1lBQ0EsUUFBQSxLQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTtZQUNBLFVBQUEsS0FBQSxHQUFBLFdBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLFVBQUEsQ0FBQSxDQUFBO1lBQ0EsVUFBQSxJQUFBLEtBQUEsS0FBQSxTQUFBLEVBQUE7WUFDQSxZQUFBLEVBQUEsR0FBQSxHQUFBLENBQUE7WUFDQSxZQUFBLEdBQUEsR0FBQSxLQUFBLENBQUE7WUFDQSxXQUFBLE1BQUE7WUFDQSxZQUFBLEdBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxXQUFBO1lBQ0EsU0FBQTtZQUNBLE9BQUE7QUFDQTtZQUNBLE1BQUEsSUFBQSxXQUFBLElBQUEsQ0FBQSxHQUFBLEVBQUE7WUFDQSxRQUFBLE9BQUEsS0FBQSxDQUFBO1lBQ0EsT0FBQTtBQUNBO1lBQ0EsTUFBQSxJQUFBLENBQUEsV0FBQSxJQUFBLE9BQUEsR0FBQSxJQUFBLFVBQUEsRUFBQTtZQUNBLFFBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQTtZQUNBLFFBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLENBQUEsQ0FBQTtZQUNBLFFBQUEsR0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsT0FBQTtBQUNBO1lBQ0EsTUFBQSxPQUFBLEdBQUEsQ0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBO1lBQ0EsSUFBQSxDQUFBLEVBQUEsU0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLFFBQUEsRUFBQSxXQUFBLEVBQUE7WUFDQSxNQUFBLElBQUEsR0FBQSxHQUFBLEtBQUE7WUFDQSxVQUFBLENBQUEsR0FBQSxJQUFBO1lBQ0EsVUFBQSxLQUFBLEdBQUEsS0FBQTtZQUNBLFVBQUEsVUFBQSxHQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBO0FBQ0E7WUFDQSxNQUFBLEtBQUEsSUFBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTtZQUNBLFFBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLFFBQUEsR0FBQSxHQUFBLFdBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLFVBQUEsQ0FBQSxDQUFBO1lBQ0EsUUFBQSxJQUFBLEdBQUEsS0FBQSxTQUFBLEVBQUE7WUFDQSxVQUFBLEtBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxVQUFBLE1BQUE7WUFDQSxTQUFBO1lBQ0EsT0FBQTtBQUNBO1lBQ0EsTUFBQSxJQUFBLENBQUEsS0FBQSxFQUFBO1lBQ0EsUUFBQSxPQUFBLENBQUEsV0FBQSxJQUFBLEtBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxPQUFBO0FBQ0E7WUFDQSxNQUFBLElBQUEsQ0FBQSxXQUFBLElBQUEsT0FBQSxHQUFBLElBQUEsVUFBQSxFQUFBO1lBQ0EsUUFBQSxHQUFBLEdBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLFFBQUEsQ0FBQSxDQUFBO1lBQ0EsT0FBQTtBQUNBO1lBQ0EsTUFBQSxPQUFBLEdBQUEsQ0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBO1lBQ0EsSUFBQSxFQUFBLEVBQUEsU0FBQSxJQUFBLEVBQUEsRUFBQSxFQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLE9BQUEsR0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQTtBQUNBO1lBQ0EsTUFBQSxJQUFBLENBQUEsT0FBQSxDQUFBLFVBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxNQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLEVBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsUUFBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsT0FBQSxDQUFBO0FBQ0E7WUFDQSxNQUFBLE9BQUEsS0FBQSxDQUFBO1lBQ0EsS0FBQTtBQUNBO1lBQ0E7WUFDQSxJQUFBLEVBQUEsRUFBQSxTQUFBLElBQUEsRUFBQSxFQUFBLEVBQUEsUUFBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsYUFBQSxFQUFBO1lBQ0EsUUFBQSxNQUFBLElBQUEsS0FBQSxDQUFBLDJCQUFBLENBQUEsQ0FBQTtZQUNBLE9BQUE7WUFDQSxNQUFBLE9BQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxNQUFBLENBQUEsRUFBQSxFQUFBLFFBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtBQUNBO1lBQ0E7WUFDQSxJQUFBLENBQUEsRUFBQSxTQUFBLENBQUEsRUFBQSxFQUFBLElBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUE7QUFDQTtZQUNBLElBQUEsRUFBQSxFQUFBLFdBQUEsRUFBQSxJQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQSxFQUFBO0FBQ0E7WUFDQTtZQUNBLElBQUEsRUFBQSxFQUFBLFNBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLFVBQUE7WUFDQSxVQUFBLEVBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxVQUFBLE1BQUEsR0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBO0FBQ0E7WUFDQSxNQUFBLElBQUEsT0FBQSxNQUFBLElBQUEsVUFBQSxFQUFBO1lBQ0EsUUFBQSxJQUFBLFFBQUEsRUFBQTtZQUNBLFVBQUEsT0FBQSxJQUFBLENBQUE7WUFDQSxTQUFBLE1BQUE7WUFDQSxVQUFBLFVBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLElBQUEsSUFBQSxDQUFBLFFBQUEsSUFBQSxJQUFBLENBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxJQUFBLENBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBO1lBQ0EsVUFBQSxPQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsTUFBQSxFQUFBLEVBQUEsRUFBQSxRQUFBLEVBQUEsVUFBQSxDQUFBLFNBQUEsQ0FBQSxLQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7WUFDQSxTQUFBO1lBQ0EsT0FBQTtBQUNBO1lBQ0EsTUFBQSxPQUFBLE1BQUEsQ0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBO1lBQ0EsSUFBQSxFQUFBLEVBQUEsU0FBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLFFBQUEsRUFBQTtZQUNBLE1BQUEsSUFBQSxFQUFBLEdBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxNQUFBLElBQUEsTUFBQSxHQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBLENBQUE7QUFDQTtZQUNBLE1BQUEsSUFBQSxPQUFBLE1BQUEsSUFBQSxVQUFBLEVBQUE7WUFDQSxRQUFBLE9BQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxjQUFBLENBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxFQUFBLEVBQUEsRUFBQSxRQUFBLENBQUEsQ0FBQTtZQUNBLE9BQUE7QUFDQTtZQUNBLE1BQUEsT0FBQSxNQUFBLENBQUE7WUFDQSxLQUFBO0FBQ0E7WUFDQSxJQUFBLEdBQUEsRUFBQSxTQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQTtZQUNBLE1BQUEsSUFBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsSUFBQSxDQUFBLEVBQUE7WUFDQSxRQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsUUFBQSxDQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxDQUFBLENBQUE7WUFDQSxRQUFBLElBQUEsQ0FBQSxTQUFBLEdBQUEsS0FBQSxDQUFBO1lBQ0EsT0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBLEdBQUEsQ0FBQTtBQUNBO1lBQ0E7WUFDQSxFQUFBLFNBQUEsV0FBQSxDQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsVUFBQSxFQUFBO1lBQ0EsSUFBQSxJQUFBLEdBQUEsQ0FBQTtBQUNBO1lBQ0EsSUFBQSxJQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUEsSUFBQSxRQUFBLEVBQUE7QUFDQTtZQUNBLE1BQUEsSUFBQSxLQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsU0FBQSxFQUFBO1lBQ0EsUUFBQSxHQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO0FBQ0E7WUFDQTtZQUNBLE9BQUEsTUFBQSxJQUFBLFVBQUEsSUFBQSxLQUFBLENBQUEsR0FBQSxJQUFBLE9BQUEsS0FBQSxDQUFBLEdBQUEsSUFBQSxVQUFBLEVBQUE7WUFDQSxRQUFBLEdBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsT0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBLElBQUEsT0FBQSxHQUFBLENBQUE7WUFDQSxHQUFBO0FBQ0E7WUFDQSxFQUFBLFNBQUEsd0JBQUEsQ0FBQSxRQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxTQUFBLEVBQUEsYUFBQSxFQUFBLFNBQUEsRUFBQTtZQUNBLElBQUEsU0FBQSxlQUFBLEdBQUEsRUFDQSxJQUFBLGVBQUEsQ0FBQSxTQUFBLEdBQUEsUUFBQSxDQUFBO1lBQ0EsSUFBQSxTQUFBLGFBQUEsR0FBQSxFQUNBLElBQUEsYUFBQSxDQUFBLFNBQUEsR0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBO1lBQ0EsSUFBQSxJQUFBLEdBQUEsQ0FBQTtZQUNBLElBQUEsSUFBQSxPQUFBLEdBQUEsSUFBQSxlQUFBLEVBQUEsQ0FBQTtZQUNBLElBQUEsT0FBQSxDQUFBLElBQUEsR0FBQSxJQUFBLGFBQUEsRUFBQSxDQUFBO1lBQ0EsSUFBQSxPQUFBLENBQUEsUUFBQSxHQUFBLEVBQUEsQ0FBQTtZQUNBLElBQUEsT0FBQSxDQUFBLEdBQUEsR0FBQSxFQUFBLENBQUE7QUFDQTtZQUNBLElBQUEsU0FBQSxHQUFBLFNBQUEsSUFBQSxFQUFBLENBQUE7WUFDQSxJQUFBLE9BQUEsQ0FBQSxTQUFBLEdBQUEsU0FBQSxDQUFBO1lBQ0EsSUFBQSxPQUFBLENBQUEsUUFBQSxHQUFBLFNBQUEsQ0FBQTtZQUNBLElBQUEsS0FBQSxHQUFBLElBQUEsSUFBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxLQUFBO1lBQ0EsSUFBQSxLQUFBLEdBQUEsSUFBQSxTQUFBLEVBQUE7WUFDQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtBQUNBO1lBQ0EsSUFBQSxhQUFBLEdBQUEsYUFBQSxJQUFBLEVBQUEsQ0FBQTtZQUNBLElBQUEsT0FBQSxDQUFBLGFBQUEsR0FBQSxhQUFBLENBQUE7WUFDQSxJQUFBLEtBQUEsR0FBQSxJQUFBLFFBQUEsRUFBQTtZQUNBLE1BQUEsSUFBQSxDQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxhQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtZQUNBLElBQUEsS0FBQSxHQUFBLElBQUEsYUFBQSxFQUFBO1lBQ0EsTUFBQSxPQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7QUFDQTtZQUNBLElBQUEsT0FBQSxPQUFBLENBQUE7WUFDQSxHQUFBO0FBQ0E7WUFDQSxFQUFBLElBQUEsSUFBQSxHQUFBLElBQUE7WUFDQSxNQUFBLEdBQUEsR0FBQSxJQUFBO1lBQ0EsTUFBQSxHQUFBLEdBQUEsSUFBQTtZQUNBLE1BQUEsS0FBQSxHQUFBLEtBQUE7WUFDQSxNQUFBLEtBQUEsR0FBQSxLQUFBO1lBQ0EsTUFBQSxNQUFBLEdBQUEsV0FBQSxDQUFBO0FBQ0E7WUFDQSxFQUFBLFNBQUEsY0FBQSxDQUFBLEdBQUEsRUFBQTtZQUNBLElBQUEsT0FBQSxNQUFBLENBQUEsQ0FBQSxHQUFBLEtBQUEsSUFBQSxJQUFBLEdBQUEsS0FBQSxTQUFBLElBQUEsRUFBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsR0FBQTtBQUNBO1lBQ0EsRUFBQSxTQUFBLFdBQUEsQ0FBQSxHQUFBLEVBQUE7WUFDQSxJQUFBLEdBQUEsR0FBQSxjQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxJQUFBLE9BQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7WUFDQSxNQUFBLEdBQUE7WUFDQSxTQUFBLE9BQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxDQUFBO1lBQ0EsU0FBQSxPQUFBLENBQUEsR0FBQSxFQUFBLE1BQUEsQ0FBQTtZQUNBLFNBQUEsT0FBQSxDQUFBLEdBQUEsRUFBQSxNQUFBLENBQUE7WUFDQSxTQUFBLE9BQUEsQ0FBQSxLQUFBLEVBQUEsT0FBQSxDQUFBO1lBQ0EsU0FBQSxPQUFBLENBQUEsS0FBQSxFQUFBLFFBQUEsQ0FBQTtZQUNBLE1BQUEsR0FBQSxDQUFBO1lBQ0EsR0FBQTtBQUNBO1lBQ0EsRUFBQSxJQUFBLE9BQUEsR0FBQSxLQUFBLENBQUEsT0FBQSxJQUFBLFNBQUEsQ0FBQSxFQUFBO1lBQ0EsSUFBQSxPQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsUUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxnQkFBQSxDQUFBO1lBQ0EsR0FBQSxDQUFBO0FBQ0E7WUFDQSxDQUFBLEVBQUEsT0FBQSxDQUFBLENBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDclVBO0FBQ0E7WUFDQSxJQUFBLEtBQUEsR0FBQUYsUUFBQSxDQUFBO1lBQ0EsS0FBQSxDQUFBLFFBQUEsR0FBQUMsUUFBQSxDQUFBLFFBQUEsQ0FBQTtZQUNBLEtBQUEsQ0FBQSxRQUFBLEdBQUEsS0FBQSxDQUFBLFFBQUEsQ0FBQTtZQUNBLElBQUEsS0FBQSxHQUFBLEtBQUE7Ozs7QUNwQkEsNkJBQUEsd0JBQUE7Ozs7WUNFQSxJQUFBLG9CQUFBLEdBQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxjQUFBLENBQUE7QUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7QUFDQTtZQUNBLFVBQUEsQ0FBQSxLQUFBLEdBQUEsVUFBQTtZQUNBLFNBQUEsU0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7WUFDQSxFQUFBLElBQUEsU0FBQSxDQUFBLE1BQUEsS0FBQSxDQUFBLEVBQUE7WUFDQSxJQUFBLElBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLElBQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7WUFDQSxNQUFBLEtBQUEsR0FBQSxTQUFBLENBQUEsS0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtZQUNBLElBQUEsT0FBQSxLQUFBLENBQUE7WUFDQSxHQUFBO0FBQ0E7WUFDQSxFQUFBLEtBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQSxFQUFBO1lBQ0EsSUFBQSxJQUFBLEdBQUEsS0FBQSxPQUFBLEVBQUE7WUFDQSxNQUFBLElBQUEsSUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxFQUFBLENBQUE7WUFDQSxNQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsSUFBQSxHQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxFQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUEsTUFBQSxJQUFBLEdBQUEsS0FBQSxPQUFBLEVBQUE7WUFDQSxNQUFBLElBQUEsSUFBQSxHQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsSUFBQSxHQUFBLElBQUEsSUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLEdBQUEsSUFBQSxHQUFBLEdBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxNQUFBLElBQUEsSUFBQSxHQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsSUFBQSxHQUFBLElBQUEsSUFBQSxJQUFBLENBQUEsSUFBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxHQUFBLEdBQUEsSUFBQSxHQUFBLEdBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxNQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxJQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsS0FBQSxNQUFBO1lBQ0EsTUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtZQUNBLEdBQUE7QUFDQTtZQUNBLEVBQUEsT0FBQSxDQUFBLENBQUE7WUFDQSxDQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBLFVBQUEsQ0FBQSxPQUFBLEdBQUEsWUFBQTtZQUNBLFNBQUEsaUJBQUEsQ0FBQSxHQUFBLEVBQUEsUUFBQSxFQUFBO1lBQ0EsRUFBQSxJQUFBLFdBQUEsR0FBQSxFQUFBLEVBQUEsU0FBQSxFQUFBLE9BQUEsR0FBQSxFQUFBLEVBQUEsYUFBQSxHQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBLENBQUE7WUFDQSxFQUFBLEtBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxFQUFBO1lBQ0EsSUFBQSxTQUFBLEdBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsSUFBQSxJQUFBLENBQUEsU0FBQSxFQUFBLFNBQUE7WUFDQSxJQUFBLGFBQUEsSUFBQSxRQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsU0FBQSxHQUFBLFVBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsSUFBQSxXQUFBLEdBQUEsV0FBQSxHQUFBLE9BQUEsR0FBQSxTQUFBLENBQUE7WUFDQSxJQUFBLE9BQUEsR0FBQSxHQUFBLENBQUE7WUFDQSxHQUFBO1lBQ0EsRUFBQSxPQUFBLFdBQUEsQ0FBQTtZQUNBLENBQUE7WUFDQSxTQUFBLGtCQUFBLENBQUEsR0FBQSxFQUFBO1lBQ0EsRUFBQSxJQUFBLFdBQUEsR0FBQSxFQUFBLEVBQUEsT0FBQSxHQUFBLEVBQUEsQ0FBQTtZQUNBLEVBQUEsS0FBQSxJQUFBLEdBQUEsSUFBQSxHQUFBLEVBQUE7WUFDQSxJQUFBLElBQUEsR0FBQSxJQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxvQkFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUE7WUFDQSxNQUFBLFdBQUEsR0FBQSxXQUFBLEdBQUEsT0FBQSxHQUFBLEdBQUEsQ0FBQTtZQUNBLE1BQUEsT0FBQSxHQUFBLEdBQUEsQ0FBQTtZQUNBLEtBQUE7WUFDQSxHQUFBO1lBQ0EsRUFBQSxPQUFBLFdBQUEsQ0FBQTtZQUNBLENBQUE7WUFDQSxTQUFBLFdBQUEsQ0FBQSxHQUFBLEVBQUEsUUFBQSxFQUFBO1lBQ0EsRUFBQSxJQUFBLEtBQUEsQ0FBQSxPQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7WUFDQSxJQUFBLE9BQUEsaUJBQUEsQ0FBQSxHQUFBLEVBQUEsUUFBQSxDQUFBLENBQUE7WUFDQSxHQUFBLE1BQUEsSUFBQSxHQUFBLElBQUEsT0FBQSxHQUFBLEtBQUEsUUFBQSxFQUFBO1lBQ0EsSUFBQSxPQUFBLGtCQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxHQUFBLE1BQUE7WUFDQSxJQUFBLE9BQUEsR0FBQSxJQUFBLEVBQUEsQ0FBQTtZQUNBLEdBQUE7WUFDQSxDQUFBO0FBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7QUFDQTtZQUNBLFVBQUEsQ0FBQSxLQUFBLEdBQUEsVUFBQTtZQUNBLFNBQUEsU0FBQSxDQUFBLEdBQUEsRUFBQTtZQUNBLEVBQUEsSUFBQSxDQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUEsQ0FBQTtZQUNBLEVBQUEsSUFBQSxPQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUE7WUFDQSxJQUFBLElBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQTtZQUNBLElBQUEsS0FBQSxJQUFBLEtBQUEsSUFBQSxHQUFBLEVBQUE7WUFDQTtZQUNBLE1BQUEsSUFBQSxvQkFBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLEVBQUEsS0FBQSxDQUFBLEVBQUE7WUFDQSxRQUFBLEdBQUEsR0FBQSxHQUFBLEdBQUEsS0FBQSxHQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBO1lBQ0EsT0FBQTtZQUNBLEtBQUE7WUFDQSxJQUFBLE9BQUEsR0FBQSxDQUFBO1lBQ0EsR0FBQSxNQUFBO1lBQ0EsSUFBQSxPQUFBLEdBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxHQUFBO1lBQ0EsQ0FDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBLFVBQUEsQ0FBQSxJQUFBLEdBQUEsU0FBQTtZQUNBLFNBQUEsUUFBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtZQUNBLEVBQUEsSUFBQSxHQUFBLEtBQUEsS0FBQSxJQUFBLEdBQUEsSUFBQSxJQUFBLElBQUEsQ0FBQSxHQUFBLEtBQUEsR0FBQSxLQUFBLE9BQUEsSUFBQSxHQUFBLEtBQUEsT0FBQSxDQUFBLEVBQUE7WUFDQSxJQUFBLE9BQUEsRUFBQSxDQUFBO1lBQ0EsR0FBQTtZQUNBLEVBQUEsSUFBQSxHQUFBLEtBQUEsSUFBQSxFQUFBO1lBQ0EsSUFBQSxPQUFBLEdBQUEsSUFBQSxLQUFBLEdBQUEsR0FBQSxHQUFBLEdBQUEsR0FBQSxJQUFBLEdBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsR0FBQTtZQUNBLEVBQUEsSUFBQSxJQUFBLEdBQUEsT0FBQSxHQUFBLENBQUE7WUFDQSxFQUFBLElBQUEsQ0FBQSxJQUFBLEtBQUEsUUFBQSxJQUFBLElBQUEsS0FBQSxVQUFBLEtBQUEsT0FBQSxHQUFBLENBQUEsTUFBQSxLQUFBLFVBQUEsRUFBQTtZQUNBLElBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQTtZQUNBLEdBQUE7WUFDQSxFQUFBLElBQUEsT0FBQSxHQUFBLEtBQUEsUUFBQSxFQUFBO1lBQ0EsSUFBQSxHQUFBLEdBQUEsSUFBQSxDQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQTtZQUNBLElBQUEsSUFBQSxDQUFBLE9BQUEsSUFBQSxHQUFBLENBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQSxFQUFBO1lBQ0EsTUFBQSxPQUFBLEdBQUEsR0FBQSxHQUFBLEdBQUEsS0FBQSxHQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQTtZQUNBLEtBQUE7WUFDQSxHQUFBO1lBQ0EsRUFBQSxJQUFBLE9BQUEsRUFBQSxHQUFBLEdBQUEsVUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsRUFBQSxPQUFBLEdBQUEsR0FBQSxHQUFBLEdBQUEsSUFBQSxHQUFBLEdBQUEsR0FBQSxHQUFBLENBQUE7WUFDQSxDQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQSxVQUFBLENBQUEsS0FBQSxHQUFBLFVBQUE7WUFDQSxTQUFBLFNBQUEsQ0FBQSxHQUFBLEVBQUEsS0FBQSxDQUFBO1lBQ0EsRUFBQSxJQUFBLEtBQUEsR0FBQSxFQUFBLENBQUE7QUFDQTtZQUNBLEVBQUEsS0FBQSxJQUFBLEdBQUEsSUFBQSxHQUFBLEVBQUE7WUFDQSxJQUFBLElBQUEsb0JBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsQ0FBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7QUFDQTtZQUNBLE1BQUEsSUFBQSxPQUFBLEtBQUEsR0FBQSxFQUFBO1lBQ0EsUUFBQSxHQUFBLEdBQUEsV0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsUUFBQSxLQUFBLEdBQUEsUUFBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQTtZQUNBLFFBQUEsU0FBQTtZQUNBLE9BQUE7WUFDQSxNQUFBLElBQUEsT0FBQSxLQUFBLEdBQUEsRUFBQTtZQUNBLFFBQUEsR0FBQSxHQUFBLFNBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQTtZQUNBLE9BQUE7WUFDQSxNQUFBLEtBQUEsSUFBQSxRQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxDQUFBLENBQUE7WUFDQSxLQUFBO1lBQ0EsR0FBQTtBQUNBO1lBQ0EsRUFBQSxPQUFBLEtBQUEsQ0FBQTtZQUNBLENBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtBQUNBO1lBQ0EsSUFBQSxjQUFBLEdBQUEsUUFBQSxDQUFBO1lBQ0EsVUFBQSxDQUFBLE1BQUEsR0FBQSxXQUFBO1lBQ0EsU0FBQSxVQUFBLENBQUEsS0FBQSxDQUFBO1lBQ0EsRUFBQSxJQUFBLElBQUEsR0FBQSxFQUFBLEdBQUEsS0FBQSxDQUFBO1lBQ0EsRUFBQSxJQUFBLFdBQUEsR0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO1lBQ0EsRUFBQSxJQUFBLENBQUEsV0FBQSxFQUFBLE9BQUEsS0FBQSxDQUFBO0FBQ0E7WUFDQSxFQUFBLElBQUEsTUFBQSxHQUFBLEVBQUEsQ0FBQTtZQUNBLEVBQUEsSUFBQSxDQUFBLEVBQUEsU0FBQSxFQUFBLE1BQUEsQ0FBQTtZQUNBLEVBQUEsS0FBQSxDQUFBLEdBQUEsV0FBQSxDQUFBLEtBQUEsRUFBQSxTQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxFQUFBO1lBQ0EsSUFBQSxRQUFBLElBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsTUFBQSxLQUFBLEVBQUEsRUFBQSxNQUFBLEdBQUEsUUFBQSxDQUFBLENBQUEsTUFBQTtZQUNBLE1BQUEsS0FBQSxFQUFBLEVBQUEsTUFBQSxHQUFBLE9BQUEsQ0FBQSxDQUFBLE1BQUE7WUFDQSxNQUFBLEtBQUEsRUFBQSxFQUFBLE1BQUEsR0FBQSxNQUFBLENBQUEsQ0FBQSxNQUFBO1lBQ0EsTUFBQSxLQUFBLEVBQUEsRUFBQSxNQUFBLEdBQUEsTUFBQSxDQUFBLENBQUEsTUFBQTtZQUNBLE1BQUEsU0FBQSxTQUFBO1lBQ0EsS0FBQTtZQUNBLElBQUEsSUFBQSxTQUFBLEtBQUEsQ0FBQSxFQUFBLE1BQUEsSUFBQSxJQUFBLENBQUEsU0FBQSxDQUFBLFNBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLElBQUEsU0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxJQUFBLE1BQUEsSUFBQSxNQUFBLENBQUE7WUFDQSxHQUFBO1lBQ0EsRUFBQSxJQUFBLFNBQUEsS0FBQSxDQUFBLEVBQUEsT0FBQSxNQUFBLEdBQUEsSUFBQSxDQUFBLFNBQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxPQUFBLE9BQUEsTUFBQSxDQUFBO1lBQ0EsQ0FDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO0FBQ0E7WUFDQSxVQUFBLENBQUEsT0FBQSxHQUFBLFlBQUE7WUFDQSxTQUFBLFdBQUEsQ0FBQSxHQUFBLEVBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxHQUFBLENBQUE7WUFDQSxFQUFBLElBQUEsRUFBQSxHQUFBLFlBQUEsS0FBQSxDQUFBLEVBQUEsTUFBQSxHQUFBLENBQUE7WUFDQSxFQUFBLElBQUEsQ0FBQSxPQUFBLE1BQUEsSUFBQSxXQUFBLElBQUEsQ0FBQSxRQUFBLEtBQUEsQ0FBQSxHQUFBLEVBQUE7WUFDQSxJQUFBLEdBQUEsQ0FBQSxPQUFBLElBQUEsV0FBQSxHQUFBLE1BQUEsQ0FBQTtZQUNBLElBQUEsTUFBQSxHQUFBLENBQUE7WUFDQSxHQUFBO1lBQ0EsRUFBQSxJQUFBO1lBQ0EsSUFBQSxHQUFBLEdBQUEsR0FBQSxJQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxZQUFBLENBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQTtZQUNBLEdBQUEsQ0FBQSxPQUFBLEVBQUEsRUFBQTtZQUNBLElBQUEsV0FBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsTUFBQSxFQUFBO1lBQ0EsR0FBQTtZQUNBLEVBQUEsSUFBQSxPQUFBLEdBQUEsQ0FBQTtZQUNBLE1BQUEsS0FBQSxHQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxDQUFBO1lBQ0EsTUFBQSxLQUFBLEdBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsT0FBQSxFQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBLE1BQUEsRUFBQSxNQUFBLEdBQUEsT0FBQSxDQUFBLENBQUE7QUFDQTtZQUNBO1lBQ0EsRUFBQSxJQUFBLE9BQUEsR0FBQSxLQUFBLENBQUEsS0FBQSxDQUFBLEtBQUEsRUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsU0FBQSxJQUFBLEVBQUEsQ0FBQSxDQUFBO1lBQ0EsSUFBQSxJQUFBLElBQUEsR0FBQSxDQUFBLEdBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQTtZQUNBLElBQUEsT0FBQSxDQUFBLElBQUEsSUFBQSxNQUFBLEdBQUEsTUFBQSxHQUFBLE1BQUE7WUFDQSxRQUFBLElBQUE7WUFDQSxRQUFBLElBQUE7WUFDQSxRQUFBLElBQUEsQ0FBQTtZQUNBLEdBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtBQUNBO1lBQ0E7WUFDQSxFQUFBLEdBQUEsQ0FBQSxJQUFBLEdBQUEsUUFBQSxDQUFBO1lBQ0EsRUFBQSxHQUFBLENBQUEsT0FBQSxHQUFBLENBQUEsUUFBQSxJQUFBLEtBQUEsSUFBQSxHQUFBLEdBQUEsTUFBQTtZQUNBLE1BQUEsSUFBQSxHQUFBLE9BQUEsR0FBQSxNQUFBLEdBQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQTtZQUNBLEVBQUEsTUFBQSxHQUFBLENBQUE7WUFDQTs7OztZQzdQQSxRQUFBLEdBQUEsUUFBQSxHQUFBLDJCQUFBLENBQUE7WUFDQSxRQUFBLEdBQUEsUUFBQSxHQUFBLGtCQUFBLENBQUE7WUFDQSxRQUFBLEdBQUEsUUFBQSxHQUFBLG9DQUFBLENBQUE7WUFDQSxRQUFBLEdBQUEsUUFBQSxHQUFBLG1CQUFBLENBQUE7O1lBRUEsUUFBQSxHQUFBLFFBQUEsR0FBQSxvRUFBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSwrRkFBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSxrQkFBQSxDQUFBOzs7OztZQUdBLFFBQUEsR0FBQSxRQUFBLEdBQUEsK0JBQUEsQ0FBQTs7WUFDQSxJQUFBLEdBQUEsRUFBQTtZQUNBLFFBQUEsR0FBQSxRQUFBLEdBQUEsK0JBQUEsQ0FBQTs7O1lBRUEsUUFBQSxHQUFBLFFBQUEsR0FBQSx3REFBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSx5REFBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSx3REFBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSxxRUFBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSx3REFBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSxzRUFBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSx3REFBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSw4RUFBQSxDQUFBO1lBRUEsUUFBQSxHQUFBLFFBQUEsR0FBQSxxSEFBQSxDQUFBOzs7WUNwQkEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxRQUFBLEVBQUFFLEtBQUEsRUFBQTtZQUdBLE9BQUEsQ0FBQSxHQUFBLENBQUEsTUFBQSxFQUFBQyxLQUFBLEVBQUE7WUFHQSxPQUFBLENBQUEsR0FBQSxDQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUE7WUFHQSxPQUFBLENBQUEsR0FBQSxDQUFBQyxPQUFBLEVBQUE7WUFHQSxPQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsRUFBQTtZQUdBLE9BQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxFQUFBO1lBSUEsU0FBQSxLQUFBLEVBQUEsR0FBQSxJQUFBO1lBQ0E7WUFDQSxDQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxJQUFBLEVBQUE7WUFDQSxDQUFBO1lBQ0EsT0FBQSxDQUFBLEdBQUEsQ0FBQUMsS0FBQSxFQUFBO1lBQ0EsS0FBQSxDQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBOztZQUVBLE9BQUEsQ0FBQSxHQUFBLENBQUEsYUFBQSxFQUFBOztZQUVBLE9BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBSixRQUFBLENBQUEsTUFBQSxFQUFBO1lBR0EsT0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUE7Ozs7WUFJQSxJQUFBLEdBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxLQUFBLEdBQUE7WUFDQSxPQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsRUFBQTtZQUlBLE9BQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBO1lBR0EsT0FBQSxDQUFBLEdBQUEsQ0FBQSxVQUFBLEVBQUE7WUFHQSxPQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUE7O1lBRUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLEVBRUE7O1lBRUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLEVBQUE7O1lBRUE7Ozs7OzsifQ==
