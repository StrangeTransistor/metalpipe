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

            const final$1 = false;
            const dev$1 = true;
            const test$1 = true;
            const hash$1 = null;
            const instance$1 = null;

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
            } (compiler));

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
            	    function PartialTemplate() {}	    PartialTemplate.prototype = instance;
            	    function Substitutions() {}	    Substitutions.prototype = instance.subs;
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
            } (template));

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

            var pug_static = "<div>Some Static</div><div class=\"dev\">true</div><div class=\"test\">true</div><div class=\"final\">false</div><div class=\"hash\"></div><div class=\"instance\"></div>";

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
                str = str || require$$0.readFileSync(filename, 'utf8');
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
            ;var locals_for_with = (locals || {});(function (dev, final, hash, instance, other, some, test) {
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
            pug_html = pug_html + "\u003Cdiv class=\"test\"\u003E";
            pug_html = pug_html + (pugRuntime.escape(null == (pug_interp = test) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
            pug_html = pug_html + "\u003Cdiv class=\"final\"\u003E";
            pug_html = pug_html + (pugRuntime.escape(null == (pug_interp = final) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
            pug_html = pug_html + "\u003Cdiv class=\"hash\"\u003E";
            pug_html = pug_html + (pugRuntime.escape(null == (pug_interp = hash) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
            pug_html = pug_html + "\u003Cdiv class=\"instance\"\u003E";
            pug_html = pug_html + (pugRuntime.escape(null == (pug_interp = instance) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
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
            }.call(this,"dev" in locals_for_with?locals_for_with.dev:typeof dev!=="undefined"?dev:undefined,"final" in locals_for_with?locals_for_with.final:typeof final!=="undefined"?final:undefined,"hash" in locals_for_with?locals_for_with.hash:typeof hash!=="undefined"?hash:undefined,"instance" in locals_for_with?locals_for_with.instance:typeof instance!=="undefined"?instance:undefined,"other" in locals_for_with?locals_for_with.other:typeof other!=="undefined"?other:undefined,"some" in locals_for_with?locals_for_with.some:typeof some!=="undefined"?some:undefined,"test" in locals_for_with?locals_for_with.test:typeof test!=="undefined"?test:undefined));} catch (err) {pugRuntime.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);}return pug_html;}

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
            console.log({ final: final$1, test: test$1, hash: hash$1, instance: instance$1 });

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2hvbWUvc3RyaWRlci9Qcm9qZWN0cy9tZXRhbHBpcGUvbm9kZV9tb2R1bGVzL3JvbGx1cC1wbHVnaW4tbm9kZS1nbG9iYWxzL3NyYy9nbG9iYWwuanMiLCIuLi9ob21lL3N0cmlkZXIvUHJvamVjdHMvbWV0YWxwaXBlL2ZpeHQvZnJvbnRlbmQvbm9kZV9tb2R1bGVzL3RoZS1hbnN3ZXIvZGlzdC90aGUtYW5zd2VyLmVzLmpzIiwiLi4vaG9tZS9zdHJpZGVyL1Byb2plY3RzL21ldGFscGlwZS9maXh0L2Zyb250ZW5kL25vZGVfbW9kdWxlcy9ub29wMy9mYWN0b3J5LmpzIiwiLi4vaG9tZS9zdHJpZGVyL1Byb2plY3RzL21ldGFscGlwZS9maXh0L2Zyb250ZW5kL25vZGVfbW9kdWxlcy9ub29wMy9pbmRleC5qcyIsIi4uL2hvbWUvc3RyaWRlci9Qcm9qZWN0cy9tZXRhbHBpcGUvZml4dC9mcm9udGVuZC9ub2RlX21vZHVsZXMvcmFtYmRhL3NyYy9jdXJyeS5qcyIsIi4uL2xpYi9vdGhlci9vdGhlci5qcyIsIi4uL2xpYi9vdGhlci9taXhlZC5qcyIsIi4uL2xpYi9vdGhlci9janMuanMiLCIuLi9ob21lL3N0cmlkZXIvUHJvamVjdHMvbWV0YWxwaXBlL25vZGVfbW9kdWxlcy9wcm9jZXNzLWVzNi9icm93c2VyLmpzIiwiLi4vaG9tZS9zdHJpZGVyL1Byb2plY3RzL21ldGFscGlwZS9ub2RlX21vZHVsZXMvaG9nYW4uanMvbGliL2NvbXBpbGVyLmpzIiwiLi4vaG9tZS9zdHJpZGVyL1Byb2plY3RzL21ldGFscGlwZS9ub2RlX21vZHVsZXMvaG9nYW4uanMvbGliL3RlbXBsYXRlLmpzIiwiLi4vaG9tZS9zdHJpZGVyL1Byb2plY3RzL21ldGFscGlwZS9ub2RlX21vZHVsZXMvaG9nYW4uanMvbGliL2hvZ2FuLmpzIiwiLi4vbGliL290aGVyL3NvbWUuc3RhdGljLnB1ZyIsIi4uL2hvbWUvc3RyaWRlci9Qcm9qZWN0cy9tZXRhbHBpcGUvbm9kZV9tb2R1bGVzL3JvbGx1cC1wbHVnaW4tbm9kZS1idWlsdGlucy9zcmMvZXM2L2VtcHR5LmpzIiwiLi4vaG9tZS9zdHJpZGVyL1Byb2plY3RzL21ldGFscGlwZS9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanMiLCIuLi9saWIvaW5kZXgvaW5kZXgucHVnIiwiLi4vbGliL2luZGV4L2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDpcbiAgICAgICAgICAgIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6XG4gICAgICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pO1xuIiwidmFyIGluZGV4ID0gNDI7XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiAoKSA9PiB7fTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IG5vb3BGYWN0b3J5ID0gcmVxdWlyZSgnLi9mYWN0b3J5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbm9vcEZhY3RvcnkoKTtcbiIsIi8qKlxuICogdGFrZW4gZnJvbSB0aGUgbGFzdCBjb21tZW50IG9mIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL21rdWtsaXMvNTI5NDI0OFxuICogUmV0dXJucyBhIGN1cnJpZWQgZXF1aXZhbGVudCBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uIFRoZSBjdXJyaWVkIGZ1bmN0aW9uXG4gKiBoYXMgdHdvIHVudXN1YWwgY2FwYWJpbGl0aWVzLiBGaXJzdCwgaXRzIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZVxuICogYXQgYSB0aW1lLiBJZiBgZmAgaXMgYSB0ZXJuYXJ5IGZ1bmN0aW9uIGFuZCBgZ2AgaXMgYFIuY3VycnkoZilgLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSkoMikoMylgXG4gKiAgIC0gYGcoMSkoMiwgMylgXG4gKiAgIC0gYGcoMSwgMikoMylgXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKlxuICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIFtgUi5fX2BdKCNfXykgbWF5IGJlIHVzZWQgdG8gc3BlY2lmeVxuICogXCJnYXBzXCIsIGFsbG93aW5nIHBhcnRpYWwgYXBwbGljYXRpb24gb2YgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyxcbiAqIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgcG9zaXRpb25zLiBJZiBgZ2AgaXMgYXMgYWJvdmUgYW5kIGBfYCBpcyBbYFIuX19gXSgjX18pLFxuICogdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKiAtPiBhKSAtPiAoKiAtPiBhKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3LCBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGNvbnN0IGFkZEZvdXJOdW1iZXJzID0gKGEsIGIsIGMsIGQpID0+IGEgKyBiICsgYyArIGQ7XG4gKlxuICogICAgICBjb25zdCBjdXJyaWVkQWRkRm91ck51bWJlcnMgPSBSLmN1cnJ5KGFkZEZvdXJOdW1iZXJzKTtcbiAqICAgICAgY29uc3QgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAqICAgICAgY29uc3QgZyA9IGYoMyk7XG4gKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGN1cnJ5IChmbiwgYXJncyA9IFtdKSB7XG4gIHJldHVybiAoLi4uX2FyZ3MpID0+XG4gICAgKHJlc3QgPT4gcmVzdC5sZW5ndGggPj0gZm4ubGVuZ3RoID8gZm4oLi4ucmVzdCkgOiBjdXJyeShmbiwgcmVzdCkpKFtcbiAgICAgIC4uLmFyZ3MsXG4gICAgICAuLi5fYXJncyxcbiAgICBdKVxufVxuIiwiXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKVxue1xuXHRyZXR1cm4gJ090aGVyJ1xufVxuIiwiXG52YXIgZm9vMSA9ICdmb28xJ1xuXG5leHBvcnQgZGVmYXVsdCBmb28xXG5cbmV4cG9ydCB2YXIgZm9vMiA9ICdmb28yJ1xuIiwiXG52YXIgYW5zd2VyID0gcmVxdWlyZSgndGhlLWFuc3dlcicpXG52YXIgbWl4ZWQgID0gcmVxdWlyZSgnLi9taXhlZCcpXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7IGNqczogJ3llcycsIGFuc3dlciwgbWl4ZWQgfVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG4vLyBiYXNlZCBvZmYgaHR0cHM6Ly9naXRodWIuY29tL2RlZnVuY3R6b21iaWUvbm9kZS1wcm9jZXNzL2Jsb2IvbWFzdGVyL2Jyb3dzZXIuanNcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG52YXIgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbmlmICh0eXBlb2YgZ2xvYmFsLnNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbn1cbmlmICh0eXBlb2YgZ2xvYmFsLmNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbn1cblxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG5leHRUaWNrKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59XG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xuZXhwb3J0IHZhciB0aXRsZSA9ICdicm93c2VyJztcbmV4cG9ydCB2YXIgcGxhdGZvcm0gPSAnYnJvd3Nlcic7XG5leHBvcnQgdmFyIGJyb3dzZXIgPSB0cnVlO1xuZXhwb3J0IHZhciBlbnYgPSB7fTtcbmV4cG9ydCB2YXIgYXJndiA9IFtdO1xuZXhwb3J0IHZhciB2ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5leHBvcnQgdmFyIHZlcnNpb25zID0ge307XG5leHBvcnQgdmFyIHJlbGVhc2UgPSB7fTtcbmV4cG9ydCB2YXIgY29uZmlnID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5leHBvcnQgdmFyIG9uID0gbm9vcDtcbmV4cG9ydCB2YXIgYWRkTGlzdGVuZXIgPSBub29wO1xuZXhwb3J0IHZhciBvbmNlID0gbm9vcDtcbmV4cG9ydCB2YXIgb2ZmID0gbm9vcDtcbmV4cG9ydCB2YXIgcmVtb3ZlTGlzdGVuZXIgPSBub29wO1xuZXhwb3J0IHZhciByZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xuZXhwb3J0IHZhciBlbWl0ID0gbm9vcDtcblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRpbmcobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN3ZCAoKSB7IHJldHVybiAnLycgfVxuZXhwb3J0IGZ1bmN0aW9uIGNoZGlyIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiB1bWFzaygpIHsgcmV0dXJuIDA7IH1cblxuLy8gZnJvbSBodHRwczovL2dpdGh1Yi5jb20va3VtYXZpcy9icm93c2VyLXByb2Nlc3MtaHJ0aW1lL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG52YXIgcGVyZm9ybWFuY2UgPSBnbG9iYWwucGVyZm9ybWFuY2UgfHwge31cbnZhciBwZXJmb3JtYW5jZU5vdyA9XG4gIHBlcmZvcm1hbmNlLm5vdyAgICAgICAgfHxcbiAgcGVyZm9ybWFuY2UubW96Tm93ICAgICB8fFxuICBwZXJmb3JtYW5jZS5tc05vdyAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLm9Ob3cgICAgICAgfHxcbiAgcGVyZm9ybWFuY2Uud2Via2l0Tm93ICB8fFxuICBmdW5jdGlvbigpeyByZXR1cm4gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSB9XG5cbi8vIGdlbmVyYXRlIHRpbWVzdGFtcCBvciBkZWx0YVxuLy8gc2VlIGh0dHA6Ly9ub2RlanMub3JnL2FwaS9wcm9jZXNzLmh0bWwjcHJvY2Vzc19wcm9jZXNzX2hydGltZVxuZXhwb3J0IGZ1bmN0aW9uIGhydGltZShwcmV2aW91c1RpbWVzdGFtcCl7XG4gIHZhciBjbG9ja3RpbWUgPSBwZXJmb3JtYW5jZU5vdy5jYWxsKHBlcmZvcm1hbmNlKSoxZS0zXG4gIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcihjbG9ja3RpbWUpXG4gIHZhciBuYW5vc2Vjb25kcyA9IE1hdGguZmxvb3IoKGNsb2NrdGltZSUxKSoxZTkpXG4gIGlmIChwcmV2aW91c1RpbWVzdGFtcCkge1xuICAgIHNlY29uZHMgPSBzZWNvbmRzIC0gcHJldmlvdXNUaW1lc3RhbXBbMF1cbiAgICBuYW5vc2Vjb25kcyA9IG5hbm9zZWNvbmRzIC0gcHJldmlvdXNUaW1lc3RhbXBbMV1cbiAgICBpZiAobmFub3NlY29uZHM8MCkge1xuICAgICAgc2Vjb25kcy0tXG4gICAgICBuYW5vc2Vjb25kcyArPSAxZTlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtzZWNvbmRzLG5hbm9zZWNvbmRzXVxufVxuXG52YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcbmV4cG9ydCBmdW5jdGlvbiB1cHRpbWUoKSB7XG4gIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCk7XG4gIHZhciBkaWYgPSBjdXJyZW50VGltZSAtIHN0YXJ0VGltZTtcbiAgcmV0dXJuIGRpZiAvIDEwMDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmV4dFRpY2s6IG5leHRUaWNrLFxuICB0aXRsZTogdGl0bGUsXG4gIGJyb3dzZXI6IGJyb3dzZXIsXG4gIGVudjogZW52LFxuICBhcmd2OiBhcmd2LFxuICB2ZXJzaW9uOiB2ZXJzaW9uLFxuICB2ZXJzaW9uczogdmVyc2lvbnMsXG4gIG9uOiBvbixcbiAgYWRkTGlzdGVuZXI6IGFkZExpc3RlbmVyLFxuICBvbmNlOiBvbmNlLFxuICBvZmY6IG9mZixcbiAgcmVtb3ZlTGlzdGVuZXI6IHJlbW92ZUxpc3RlbmVyLFxuICByZW1vdmVBbGxMaXN0ZW5lcnM6IHJlbW92ZUFsbExpc3RlbmVycyxcbiAgZW1pdDogZW1pdCxcbiAgYmluZGluZzogYmluZGluZyxcbiAgY3dkOiBjd2QsXG4gIGNoZGlyOiBjaGRpcixcbiAgdW1hc2s6IHVtYXNrLFxuICBocnRpbWU6IGhydGltZSxcbiAgcGxhdGZvcm06IHBsYXRmb3JtLFxuICByZWxlYXNlOiByZWxlYXNlLFxuICBjb25maWc6IGNvbmZpZyxcbiAgdXB0aW1lOiB1cHRpbWVcbn07XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDExIFR3aXR0ZXIsIEluYy5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbihmdW5jdGlvbiAoSG9nYW4pIHtcbiAgLy8gU2V0dXAgcmVnZXggIGFzc2lnbm1lbnRzXG4gIC8vIHJlbW92ZSB3aGl0ZXNwYWNlIGFjY29yZGluZyB0byBNdXN0YWNoZSBzcGVjXG4gIHZhciBySXNXaGl0ZXNwYWNlID0gL1xcUy8sXG4gICAgICByUXVvdCA9IC9cXFwiL2csXG4gICAgICByTmV3bGluZSA9ICAvXFxuL2csXG4gICAgICByQ3IgPSAvXFxyL2csXG4gICAgICByU2xhc2ggPSAvXFxcXC9nLFxuICAgICAgckxpbmVTZXAgPSAvXFx1MjAyOC8sXG4gICAgICByUGFyYWdyYXBoU2VwID0gL1xcdTIwMjkvO1xuXG4gIEhvZ2FuLnRhZ3MgPSB7XG4gICAgJyMnOiAxLCAnXic6IDIsICc8JzogMywgJyQnOiA0LFxuICAgICcvJzogNSwgJyEnOiA2LCAnPic6IDcsICc9JzogOCwgJ192JzogOSxcbiAgICAneyc6IDEwLCAnJic6IDExLCAnX3QnOiAxMlxuICB9O1xuXG4gIEhvZ2FuLnNjYW4gPSBmdW5jdGlvbiBzY2FuKHRleHQsIGRlbGltaXRlcnMpIHtcbiAgICB2YXIgbGVuID0gdGV4dC5sZW5ndGgsXG4gICAgICAgIElOX1RFWFQgPSAwLFxuICAgICAgICBJTl9UQUdfVFlQRSA9IDEsXG4gICAgICAgIElOX1RBRyA9IDIsXG4gICAgICAgIHN0YXRlID0gSU5fVEVYVCxcbiAgICAgICAgdGFnVHlwZSA9IG51bGwsXG4gICAgICAgIHRhZyA9IG51bGwsXG4gICAgICAgIGJ1ZiA9ICcnLFxuICAgICAgICB0b2tlbnMgPSBbXSxcbiAgICAgICAgc2VlblRhZyA9IGZhbHNlLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgbGluZVN0YXJ0ID0gMCxcbiAgICAgICAgb3RhZyA9ICd7eycsXG4gICAgICAgIGN0YWcgPSAnfX0nO1xuXG4gICAgZnVuY3Rpb24gYWRkQnVmKCkge1xuICAgICAgaWYgKGJ1Zi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKHt0YWc6ICdfdCcsIHRleHQ6IG5ldyBTdHJpbmcoYnVmKX0pO1xuICAgICAgICBidWYgPSAnJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaW5lSXNXaGl0ZXNwYWNlKCkge1xuICAgICAgdmFyIGlzQWxsV2hpdGVzcGFjZSA9IHRydWU7XG4gICAgICBmb3IgKHZhciBqID0gbGluZVN0YXJ0OyBqIDwgdG9rZW5zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlzQWxsV2hpdGVzcGFjZSA9XG4gICAgICAgICAgKEhvZ2FuLnRhZ3NbdG9rZW5zW2pdLnRhZ10gPCBIb2dhbi50YWdzWydfdiddKSB8fFxuICAgICAgICAgICh0b2tlbnNbal0udGFnID09ICdfdCcgJiYgdG9rZW5zW2pdLnRleHQubWF0Y2gocklzV2hpdGVzcGFjZSkgPT09IG51bGwpO1xuICAgICAgICBpZiAoIWlzQWxsV2hpdGVzcGFjZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXNBbGxXaGl0ZXNwYWNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlckxpbmUoaGF2ZVNlZW5UYWcsIG5vTmV3TGluZSkge1xuICAgICAgYWRkQnVmKCk7XG5cbiAgICAgIGlmIChoYXZlU2VlblRhZyAmJiBsaW5lSXNXaGl0ZXNwYWNlKCkpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IGxpbmVTdGFydCwgbmV4dDsgaiA8IHRva2Vucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmICh0b2tlbnNbal0udGV4dCkge1xuICAgICAgICAgICAgaWYgKChuZXh0ID0gdG9rZW5zW2orMV0pICYmIG5leHQudGFnID09ICc+Jykge1xuICAgICAgICAgICAgICAvLyBzZXQgaW5kZW50IHRvIHRva2VuIHZhbHVlXG4gICAgICAgICAgICAgIG5leHQuaW5kZW50ID0gdG9rZW5zW2pdLnRleHQudG9TdHJpbmcoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW5zLnNwbGljZShqLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIW5vTmV3TGluZSkge1xuICAgICAgICB0b2tlbnMucHVzaCh7dGFnOidcXG4nfSk7XG4gICAgICB9XG5cbiAgICAgIHNlZW5UYWcgPSBmYWxzZTtcbiAgICAgIGxpbmVTdGFydCA9IHRva2Vucy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hhbmdlRGVsaW1pdGVycyh0ZXh0LCBpbmRleCkge1xuICAgICAgdmFyIGNsb3NlID0gJz0nICsgY3RhZyxcbiAgICAgICAgICBjbG9zZUluZGV4ID0gdGV4dC5pbmRleE9mKGNsb3NlLCBpbmRleCksXG4gICAgICAgICAgZGVsaW1pdGVycyA9IHRyaW0oXG4gICAgICAgICAgICB0ZXh0LnN1YnN0cmluZyh0ZXh0LmluZGV4T2YoJz0nLCBpbmRleCkgKyAxLCBjbG9zZUluZGV4KVxuICAgICAgICAgICkuc3BsaXQoJyAnKTtcblxuICAgICAgb3RhZyA9IGRlbGltaXRlcnNbMF07XG4gICAgICBjdGFnID0gZGVsaW1pdGVyc1tkZWxpbWl0ZXJzLmxlbmd0aCAtIDFdO1xuXG4gICAgICByZXR1cm4gY2xvc2VJbmRleCArIGNsb3NlLmxlbmd0aCAtIDE7XG4gICAgfVxuXG4gICAgaWYgKGRlbGltaXRlcnMpIHtcbiAgICAgIGRlbGltaXRlcnMgPSBkZWxpbWl0ZXJzLnNwbGl0KCcgJyk7XG4gICAgICBvdGFnID0gZGVsaW1pdGVyc1swXTtcbiAgICAgIGN0YWcgPSBkZWxpbWl0ZXJzWzFdO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHN0YXRlID09IElOX1RFWFQpIHtcbiAgICAgICAgaWYgKHRhZ0NoYW5nZShvdGFnLCB0ZXh0LCBpKSkge1xuICAgICAgICAgIC0taTtcbiAgICAgICAgICBhZGRCdWYoKTtcbiAgICAgICAgICBzdGF0ZSA9IElOX1RBR19UWVBFO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0ZXh0LmNoYXJBdChpKSA9PSAnXFxuJykge1xuICAgICAgICAgICAgZmlsdGVyTGluZShzZWVuVGFnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnVmICs9IHRleHQuY2hhckF0KGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PSBJTl9UQUdfVFlQRSkge1xuICAgICAgICBpICs9IG90YWcubGVuZ3RoIC0gMTtcbiAgICAgICAgdGFnID0gSG9nYW4udGFnc1t0ZXh0LmNoYXJBdChpICsgMSldO1xuICAgICAgICB0YWdUeXBlID0gdGFnID8gdGV4dC5jaGFyQXQoaSArIDEpIDogJ192JztcbiAgICAgICAgaWYgKHRhZ1R5cGUgPT0gJz0nKSB7XG4gICAgICAgICAgaSA9IGNoYW5nZURlbGltaXRlcnModGV4dCwgaSk7XG4gICAgICAgICAgc3RhdGUgPSBJTl9URVhUO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0YWcpIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGUgPSBJTl9UQUc7XG4gICAgICAgIH1cbiAgICAgICAgc2VlblRhZyA9IGk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGFnQ2hhbmdlKGN0YWcsIHRleHQsIGkpKSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2goe3RhZzogdGFnVHlwZSwgbjogdHJpbShidWYpLCBvdGFnOiBvdGFnLCBjdGFnOiBjdGFnLFxuICAgICAgICAgICAgICAgICAgICAgICBpOiAodGFnVHlwZSA9PSAnLycpID8gc2VlblRhZyAtIG90YWcubGVuZ3RoIDogaSArIGN0YWcubGVuZ3RofSk7XG4gICAgICAgICAgYnVmID0gJyc7XG4gICAgICAgICAgaSArPSBjdGFnLmxlbmd0aCAtIDE7XG4gICAgICAgICAgc3RhdGUgPSBJTl9URVhUO1xuICAgICAgICAgIGlmICh0YWdUeXBlID09ICd7Jykge1xuICAgICAgICAgICAgaWYgKGN0YWcgPT0gJ319Jykge1xuICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjbGVhblRyaXBsZVN0YWNoZSh0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnVmICs9IHRleHQuY2hhckF0KGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZmlsdGVyTGluZShzZWVuVGFnLCB0cnVlKTtcblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhblRyaXBsZVN0YWNoZSh0b2tlbikge1xuICAgIGlmICh0b2tlbi5uLnN1YnN0cih0b2tlbi5uLmxlbmd0aCAtIDEpID09PSAnfScpIHtcbiAgICAgIHRva2VuLm4gPSB0b2tlbi5uLnN1YnN0cmluZygwLCB0b2tlbi5uLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRyaW0ocykge1xuICAgIGlmIChzLnRyaW0pIHtcbiAgICAgIHJldHVybiBzLnRyaW0oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcy5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7XG4gIH1cblxuICBmdW5jdGlvbiB0YWdDaGFuZ2UodGFnLCB0ZXh0LCBpbmRleCkge1xuICAgIGlmICh0ZXh0LmNoYXJBdChpbmRleCkgIT0gdGFnLmNoYXJBdCgwKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAxLCBsID0gdGFnLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKHRleHQuY2hhckF0KGluZGV4ICsgaSkgIT0gdGFnLmNoYXJBdChpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyB0aGUgdGFncyBhbGxvd2VkIGluc2lkZSBzdXBlciB0ZW1wbGF0ZXNcbiAgdmFyIGFsbG93ZWRJblN1cGVyID0geydfdCc6IHRydWUsICdcXG4nOiB0cnVlLCAnJCc6IHRydWUsICcvJzogdHJ1ZX07XG5cbiAgZnVuY3Rpb24gYnVpbGRUcmVlKHRva2Vucywga2luZCwgc3RhY2ssIGN1c3RvbVRhZ3MpIHtcbiAgICB2YXIgaW5zdHJ1Y3Rpb25zID0gW10sXG4gICAgICAgIG9wZW5lciA9IG51bGwsXG4gICAgICAgIHRhaWwgPSBudWxsLFxuICAgICAgICB0b2tlbiA9IG51bGw7XG5cbiAgICB0YWlsID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG5cbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIHRva2VuID0gdG9rZW5zLnNoaWZ0KCk7XG5cbiAgICAgIGlmICh0YWlsICYmIHRhaWwudGFnID09ICc8JyAmJiAhKHRva2VuLnRhZyBpbiBhbGxvd2VkSW5TdXBlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsIGNvbnRlbnQgaW4gPCBzdXBlciB0YWcuJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChIb2dhbi50YWdzW3Rva2VuLnRhZ10gPD0gSG9nYW4udGFnc1snJCddIHx8IGlzT3BlbmVyKHRva2VuLCBjdXN0b21UYWdzKSkge1xuICAgICAgICBzdGFjay5wdXNoKHRva2VuKTtcbiAgICAgICAgdG9rZW4ubm9kZXMgPSBidWlsZFRyZWUodG9rZW5zLCB0b2tlbi50YWcsIHN0YWNrLCBjdXN0b21UYWdzKTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udGFnID09ICcvJykge1xuICAgICAgICBpZiAoc3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDbG9zaW5nIHRhZyB3aXRob3V0IG9wZW5lcjogLycgKyB0b2tlbi5uKTtcbiAgICAgICAgfVxuICAgICAgICBvcGVuZXIgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgaWYgKHRva2VuLm4gIT0gb3BlbmVyLm4gJiYgIWlzQ2xvc2VyKHRva2VuLm4sIG9wZW5lci5uLCBjdXN0b21UYWdzKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmVzdGluZyBlcnJvcjogJyArIG9wZW5lci5uICsgJyB2cy4gJyArIHRva2VuLm4pO1xuICAgICAgICB9XG4gICAgICAgIG9wZW5lci5lbmQgPSB0b2tlbi5pO1xuICAgICAgICByZXR1cm4gaW5zdHJ1Y3Rpb25zO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50YWcgPT0gJ1xcbicpIHtcbiAgICAgICAgdG9rZW4ubGFzdCA9ICh0b2tlbnMubGVuZ3RoID09IDApIHx8ICh0b2tlbnNbMF0udGFnID09ICdcXG4nKTtcbiAgICAgIH1cblxuICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2godG9rZW4pO1xuICAgIH1cblxuICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgY2xvc2luZyB0YWc6ICcgKyBzdGFjay5wb3AoKS5uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdHJ1Y3Rpb25zO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNPcGVuZXIodG9rZW4sIHRhZ3MpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRhZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAodGFnc1tpXS5vID09IHRva2VuLm4pIHtcbiAgICAgICAgdG9rZW4udGFnID0gJyMnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc0Nsb3NlcihjbG9zZSwgb3BlbiwgdGFncykge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGFncy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmICh0YWdzW2ldLmMgPT0gY2xvc2UgJiYgdGFnc1tpXS5vID09IG9wZW4pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RyaW5naWZ5U3Vic3RpdHV0aW9ucyhvYmopIHtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpdGVtcy5wdXNoKCdcIicgKyBlc2Moa2V5KSArICdcIjogZnVuY3Rpb24oYyxwLHQsaSkgeycgKyBvYmpba2V5XSArICd9Jyk7XG4gICAgfVxuICAgIHJldHVybiBcInsgXCIgKyBpdGVtcy5qb2luKFwiLFwiKSArIFwiIH1cIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0cmluZ2lmeVBhcnRpYWxzKGNvZGVPYmopIHtcbiAgICB2YXIgcGFydGlhbHMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gY29kZU9iai5wYXJ0aWFscykge1xuICAgICAgcGFydGlhbHMucHVzaCgnXCInICsgZXNjKGtleSkgKyAnXCI6e25hbWU6XCInICsgZXNjKGNvZGVPYmoucGFydGlhbHNba2V5XS5uYW1lKSArICdcIiwgJyArIHN0cmluZ2lmeVBhcnRpYWxzKGNvZGVPYmoucGFydGlhbHNba2V5XSkgKyBcIn1cIik7XG4gICAgfVxuICAgIHJldHVybiBcInBhcnRpYWxzOiB7XCIgKyBwYXJ0aWFscy5qb2luKFwiLFwiKSArIFwifSwgc3ViczogXCIgKyBzdHJpbmdpZnlTdWJzdGl0dXRpb25zKGNvZGVPYmouc3Vicyk7XG4gIH1cblxuICBIb2dhbi5zdHJpbmdpZnkgPSBmdW5jdGlvbihjb2RlT2JqLCB0ZXh0LCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIFwie2NvZGU6IGZ1bmN0aW9uIChjLHAsaSkgeyBcIiArIEhvZ2FuLndyYXBNYWluKGNvZGVPYmouY29kZSkgKyBcIiB9LFwiICsgc3RyaW5naWZ5UGFydGlhbHMoY29kZU9iaikgKyAgXCJ9XCI7XG4gIH1cblxuICB2YXIgc2VyaWFsTm8gPSAwO1xuICBIb2dhbi5nZW5lcmF0ZSA9IGZ1bmN0aW9uKHRyZWUsIHRleHQsIG9wdGlvbnMpIHtcbiAgICBzZXJpYWxObyA9IDA7XG4gICAgdmFyIGNvbnRleHQgPSB7IGNvZGU6ICcnLCBzdWJzOiB7fSwgcGFydGlhbHM6IHt9IH07XG4gICAgSG9nYW4ud2Fsayh0cmVlLCBjb250ZXh0KTtcblxuICAgIGlmIChvcHRpb25zLmFzU3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJpbmdpZnkoY29udGV4dCwgdGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubWFrZVRlbXBsYXRlKGNvbnRleHQsIHRleHQsIG9wdGlvbnMpO1xuICB9XG5cbiAgSG9nYW4ud3JhcE1haW4gPSBmdW5jdGlvbihjb2RlKSB7XG4gICAgcmV0dXJuICd2YXIgdD10aGlzO3QuYihpPWl8fFwiXCIpOycgKyBjb2RlICsgJ3JldHVybiB0LmZsKCk7JztcbiAgfVxuXG4gIEhvZ2FuLnRlbXBsYXRlID0gSG9nYW4uVGVtcGxhdGU7XG5cbiAgSG9nYW4ubWFrZVRlbXBsYXRlID0gZnVuY3Rpb24oY29kZU9iaiwgdGV4dCwgb3B0aW9ucykge1xuICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMubWFrZVBhcnRpYWxzKGNvZGVPYmopO1xuICAgIHRlbXBsYXRlLmNvZGUgPSBuZXcgRnVuY3Rpb24oJ2MnLCAncCcsICdpJywgdGhpcy53cmFwTWFpbihjb2RlT2JqLmNvZGUpKTtcbiAgICByZXR1cm4gbmV3IHRoaXMudGVtcGxhdGUodGVtcGxhdGUsIHRleHQsIHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgSG9nYW4ubWFrZVBhcnRpYWxzID0gZnVuY3Rpb24oY29kZU9iaikge1xuICAgIHZhciBrZXksIHRlbXBsYXRlID0ge3N1YnM6IHt9LCBwYXJ0aWFsczogY29kZU9iai5wYXJ0aWFscywgbmFtZTogY29kZU9iai5uYW1lfTtcbiAgICBmb3IgKGtleSBpbiB0ZW1wbGF0ZS5wYXJ0aWFscykge1xuICAgICAgdGVtcGxhdGUucGFydGlhbHNba2V5XSA9IHRoaXMubWFrZVBhcnRpYWxzKHRlbXBsYXRlLnBhcnRpYWxzW2tleV0pO1xuICAgIH1cbiAgICBmb3IgKGtleSBpbiBjb2RlT2JqLnN1YnMpIHtcbiAgICAgIHRlbXBsYXRlLnN1YnNba2V5XSA9IG5ldyBGdW5jdGlvbignYycsICdwJywgJ3QnLCAnaScsIGNvZGVPYmouc3Vic1trZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKHJTbGFzaCwgJ1xcXFxcXFxcJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHJRdW90LCAnXFxcXFxcXCInKVxuICAgICAgICAgICAgLnJlcGxhY2Uock5ld2xpbmUsICdcXFxcbicpXG4gICAgICAgICAgICAucmVwbGFjZShyQ3IsICdcXFxccicpXG4gICAgICAgICAgICAucmVwbGFjZShyTGluZVNlcCwgJ1xcXFx1MjAyOCcpXG4gICAgICAgICAgICAucmVwbGFjZShyUGFyYWdyYXBoU2VwLCAnXFxcXHUyMDI5Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBjaG9vc2VNZXRob2Qocykge1xuICAgIHJldHVybiAofnMuaW5kZXhPZignLicpKSA/ICdkJyA6ICdmJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVBhcnRpYWwobm9kZSwgY29udGV4dCkge1xuICAgIHZhciBwcmVmaXggPSBcIjxcIiArIChjb250ZXh0LnByZWZpeCB8fCBcIlwiKTtcbiAgICB2YXIgc3ltID0gcHJlZml4ICsgbm9kZS5uICsgc2VyaWFsTm8rKztcbiAgICBjb250ZXh0LnBhcnRpYWxzW3N5bV0gPSB7bmFtZTogbm9kZS5uLCBwYXJ0aWFsczoge319O1xuICAgIGNvbnRleHQuY29kZSArPSAndC5iKHQucnAoXCInICsgIGVzYyhzeW0pICsgJ1wiLGMscCxcIicgKyAobm9kZS5pbmRlbnQgfHwgJycpICsgJ1wiKSk7JztcbiAgICByZXR1cm4gc3ltO1xuICB9XG5cbiAgSG9nYW4uY29kZWdlbiA9IHtcbiAgICAnIyc6IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQuY29kZSArPSAnaWYodC5zKHQuJyArIGNob29zZU1ldGhvZChub2RlLm4pICsgJyhcIicgKyBlc2Mobm9kZS5uKSArICdcIixjLHAsMSksJyArXG4gICAgICAgICAgICAgICAgICAgICAgJ2MscCwwLCcgKyBub2RlLmkgKyAnLCcgKyBub2RlLmVuZCArICcsXCInICsgbm9kZS5vdGFnICsgXCIgXCIgKyBub2RlLmN0YWcgKyAnXCIpKXsnICtcbiAgICAgICAgICAgICAgICAgICAgICAndC5ycyhjLHAsJyArICdmdW5jdGlvbihjLHAsdCl7JztcbiAgICAgIEhvZ2FuLndhbGsobm9kZS5ub2RlcywgY29udGV4dCk7XG4gICAgICBjb250ZXh0LmNvZGUgKz0gJ30pO2MucG9wKCk7fSc7XG4gICAgfSxcblxuICAgICdeJzogZnVuY3Rpb24obm9kZSwgY29udGV4dCkge1xuICAgICAgY29udGV4dC5jb2RlICs9ICdpZighdC5zKHQuJyArIGNob29zZU1ldGhvZChub2RlLm4pICsgJyhcIicgKyBlc2Mobm9kZS5uKSArICdcIixjLHAsMSksYyxwLDEsMCwwLFwiXCIpKXsnO1xuICAgICAgSG9nYW4ud2Fsayhub2RlLm5vZGVzLCBjb250ZXh0KTtcbiAgICAgIGNvbnRleHQuY29kZSArPSAnfTsnO1xuICAgIH0sXG5cbiAgICAnPic6IGNyZWF0ZVBhcnRpYWwsXG4gICAgJzwnOiBmdW5jdGlvbihub2RlLCBjb250ZXh0KSB7XG4gICAgICB2YXIgY3R4ID0ge3BhcnRpYWxzOiB7fSwgY29kZTogJycsIHN1YnM6IHt9LCBpblBhcnRpYWw6IHRydWV9O1xuICAgICAgSG9nYW4ud2Fsayhub2RlLm5vZGVzLCBjdHgpO1xuICAgICAgdmFyIHRlbXBsYXRlID0gY29udGV4dC5wYXJ0aWFsc1tjcmVhdGVQYXJ0aWFsKG5vZGUsIGNvbnRleHQpXTtcbiAgICAgIHRlbXBsYXRlLnN1YnMgPSBjdHguc3VicztcbiAgICAgIHRlbXBsYXRlLnBhcnRpYWxzID0gY3R4LnBhcnRpYWxzO1xuICAgIH0sXG5cbiAgICAnJCc6IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQpIHtcbiAgICAgIHZhciBjdHggPSB7c3Viczoge30sIGNvZGU6ICcnLCBwYXJ0aWFsczogY29udGV4dC5wYXJ0aWFscywgcHJlZml4OiBub2RlLm59O1xuICAgICAgSG9nYW4ud2Fsayhub2RlLm5vZGVzLCBjdHgpO1xuICAgICAgY29udGV4dC5zdWJzW25vZGUubl0gPSBjdHguY29kZTtcbiAgICAgIGlmICghY29udGV4dC5pblBhcnRpYWwpIHtcbiAgICAgICAgY29udGV4dC5jb2RlICs9ICd0LnN1YihcIicgKyBlc2Mobm9kZS5uKSArICdcIixjLHAsaSk7JztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgJ1xcbic6IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQuY29kZSArPSB3cml0ZSgnXCJcXFxcblwiJyArIChub2RlLmxhc3QgPyAnJyA6ICcgKyBpJykpO1xuICAgIH0sXG5cbiAgICAnX3YnOiBmdW5jdGlvbihub2RlLCBjb250ZXh0KSB7XG4gICAgICBjb250ZXh0LmNvZGUgKz0gJ3QuYih0LnYodC4nICsgY2hvb3NlTWV0aG9kKG5vZGUubikgKyAnKFwiJyArIGVzYyhub2RlLm4pICsgJ1wiLGMscCwwKSkpOyc7XG4gICAgfSxcblxuICAgICdfdCc6IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQuY29kZSArPSB3cml0ZSgnXCInICsgZXNjKG5vZGUudGV4dCkgKyAnXCInKTtcbiAgICB9LFxuXG4gICAgJ3snOiB0cmlwbGVTdGFjaGUsXG5cbiAgICAnJic6IHRyaXBsZVN0YWNoZVxuICB9XG5cbiAgZnVuY3Rpb24gdHJpcGxlU3RhY2hlKG5vZGUsIGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmNvZGUgKz0gJ3QuYih0LnQodC4nICsgY2hvb3NlTWV0aG9kKG5vZGUubikgKyAnKFwiJyArIGVzYyhub2RlLm4pICsgJ1wiLGMscCwwKSkpOyc7XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZShzKSB7XG4gICAgcmV0dXJuICd0LmIoJyArIHMgKyAnKTsnO1xuICB9XG5cbiAgSG9nYW4ud2FsayA9IGZ1bmN0aW9uKG5vZGVsaXN0LCBjb250ZXh0KSB7XG4gICAgdmFyIGZ1bmM7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBub2RlbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZ1bmMgPSBIb2dhbi5jb2RlZ2VuW25vZGVsaXN0W2ldLnRhZ107XG4gICAgICBmdW5jICYmIGZ1bmMobm9kZWxpc3RbaV0sIGNvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIEhvZ2FuLnBhcnNlID0gZnVuY3Rpb24odG9rZW5zLCB0ZXh0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgcmV0dXJuIGJ1aWxkVHJlZSh0b2tlbnMsICcnLCBbXSwgb3B0aW9ucy5zZWN0aW9uVGFncyB8fCBbXSk7XG4gIH1cblxuICBIb2dhbi5jYWNoZSA9IHt9O1xuXG4gIEhvZ2FuLmNhY2hlS2V5ID0gZnVuY3Rpb24odGV4dCwgb3B0aW9ucykge1xuICAgIHJldHVybiBbdGV4dCwgISFvcHRpb25zLmFzU3RyaW5nLCAhIW9wdGlvbnMuZGlzYWJsZUxhbWJkYSwgb3B0aW9ucy5kZWxpbWl0ZXJzLCAhIW9wdGlvbnMubW9kZWxHZXRdLmpvaW4oJ3x8Jyk7XG4gIH1cblxuICBIb2dhbi5jb21waWxlID0gZnVuY3Rpb24odGV4dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBrZXkgPSBIb2dhbi5jYWNoZUtleSh0ZXh0LCBvcHRpb25zKTtcbiAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLmNhY2hlW2tleV07XG5cbiAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgIHZhciBwYXJ0aWFscyA9IHRlbXBsYXRlLnBhcnRpYWxzO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiBwYXJ0aWFscykge1xuICAgICAgICBkZWxldGUgcGFydGlhbHNbbmFtZV0uaW5zdGFuY2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuXG4gICAgdGVtcGxhdGUgPSB0aGlzLmdlbmVyYXRlKHRoaXMucGFyc2UodGhpcy5zY2FuKHRleHQsIG9wdGlvbnMuZGVsaW1pdGVycyksIHRleHQsIG9wdGlvbnMpLCB0ZXh0LCBvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5jYWNoZVtrZXldID0gdGVtcGxhdGU7XG4gIH1cbn0pKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyA/IGV4cG9ydHMgOiBIb2dhbik7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDExIFR3aXR0ZXIsIEluYy5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbnZhciBIb2dhbiA9IHt9O1xuXG4oZnVuY3Rpb24gKEhvZ2FuKSB7XG4gIEhvZ2FuLlRlbXBsYXRlID0gZnVuY3Rpb24gKGNvZGVPYmosIHRleHQsIGNvbXBpbGVyLCBvcHRpb25zKSB7XG4gICAgY29kZU9iaiA9IGNvZGVPYmogfHwge307XG4gICAgdGhpcy5yID0gY29kZU9iai5jb2RlIHx8IHRoaXMucjtcbiAgICB0aGlzLmMgPSBjb21waWxlcjtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMudGV4dCA9IHRleHQgfHwgJyc7XG4gICAgdGhpcy5wYXJ0aWFscyA9IGNvZGVPYmoucGFydGlhbHMgfHwge307XG4gICAgdGhpcy5zdWJzID0gY29kZU9iai5zdWJzIHx8IHt9O1xuICAgIHRoaXMuYnVmID0gJyc7XG4gIH1cblxuICBIb2dhbi5UZW1wbGF0ZS5wcm90b3R5cGUgPSB7XG4gICAgLy8gcmVuZGVyOiByZXBsYWNlZCBieSBnZW5lcmF0ZWQgY29kZS5cbiAgICByOiBmdW5jdGlvbiAoY29udGV4dCwgcGFydGlhbHMsIGluZGVudCkgeyByZXR1cm4gJyc7IH0sXG5cbiAgICAvLyB2YXJpYWJsZSBlc2NhcGluZ1xuICAgIHY6IGhvZ2FuRXNjYXBlLFxuXG4gICAgLy8gdHJpcGxlIHN0YWNoZVxuICAgIHQ6IGNvZXJjZVRvU3RyaW5nLFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoY29udGV4dCwgcGFydGlhbHMsIGluZGVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucmkoW2NvbnRleHRdLCBwYXJ0aWFscyB8fCB7fSwgaW5kZW50KTtcbiAgICB9LFxuXG4gICAgLy8gcmVuZGVyIGludGVybmFsIC0tIGEgaG9vayBmb3Igb3ZlcnJpZGVzIHRoYXQgY2F0Y2hlcyBwYXJ0aWFscyB0b29cbiAgICByaTogZnVuY3Rpb24gKGNvbnRleHQsIHBhcnRpYWxzLCBpbmRlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnIoY29udGV4dCwgcGFydGlhbHMsIGluZGVudCk7XG4gICAgfSxcblxuICAgIC8vIGVuc3VyZVBhcnRpYWxcbiAgICBlcDogZnVuY3Rpb24oc3ltYm9sLCBwYXJ0aWFscykge1xuICAgICAgdmFyIHBhcnRpYWwgPSB0aGlzLnBhcnRpYWxzW3N5bWJvbF07XG5cbiAgICAgIC8vIGNoZWNrIHRvIHNlZSB0aGF0IGlmIHdlJ3ZlIGluc3RhbnRpYXRlZCB0aGlzIHBhcnRpYWwgYmVmb3JlXG4gICAgICB2YXIgdGVtcGxhdGUgPSBwYXJ0aWFsc1twYXJ0aWFsLm5hbWVdO1xuICAgICAgaWYgKHBhcnRpYWwuaW5zdGFuY2UgJiYgcGFydGlhbC5iYXNlID09IHRlbXBsYXRlKSB7XG4gICAgICAgIHJldHVybiBwYXJ0aWFsLmluc3RhbmNlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHRlbXBsYXRlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICghdGhpcy5jKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29tcGlsZXIgYXZhaWxhYmxlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wbGF0ZSA9IHRoaXMuYy5jb21waWxlKHRlbXBsYXRlLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRlbXBsYXRlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSB1c2UgdGhpcyB0byBjaGVjayB3aGV0aGVyIHRoZSBwYXJ0aWFscyBkaWN0aW9uYXJ5IGhhcyBjaGFuZ2VkXG4gICAgICB0aGlzLnBhcnRpYWxzW3N5bWJvbF0uYmFzZSA9IHRlbXBsYXRlO1xuXG4gICAgICBpZiAocGFydGlhbC5zdWJzKSB7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBjb25zaWRlciBwYXJlbnQgdGVtcGxhdGUgbm93XG4gICAgICAgIGlmICghcGFydGlhbHMuc3RhY2tUZXh0KSBwYXJ0aWFscy5zdGFja1RleHQgPSB7fTtcbiAgICAgICAgZm9yIChrZXkgaW4gcGFydGlhbC5zdWJzKSB7XG4gICAgICAgICAgaWYgKCFwYXJ0aWFscy5zdGFja1RleHRba2V5XSkge1xuICAgICAgICAgICAgcGFydGlhbHMuc3RhY2tUZXh0W2tleV0gPSAodGhpcy5hY3RpdmVTdWIgIT09IHVuZGVmaW5lZCAmJiBwYXJ0aWFscy5zdGFja1RleHRbdGhpcy5hY3RpdmVTdWJdKSA/IHBhcnRpYWxzLnN0YWNrVGV4dFt0aGlzLmFjdGl2ZVN1Yl0gOiB0aGlzLnRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRlbXBsYXRlID0gY3JlYXRlU3BlY2lhbGl6ZWRQYXJ0aWFsKHRlbXBsYXRlLCBwYXJ0aWFsLnN1YnMsIHBhcnRpYWwucGFydGlhbHMsXG4gICAgICAgICAgdGhpcy5zdGFja1N1YnMsIHRoaXMuc3RhY2tQYXJ0aWFscywgcGFydGlhbHMuc3RhY2tUZXh0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFydGlhbHNbc3ltYm9sXS5pbnN0YW5jZSA9IHRlbXBsYXRlO1xuXG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfSxcblxuICAgIC8vIHRyaWVzIHRvIGZpbmQgYSBwYXJ0aWFsIGluIHRoZSBjdXJyZW50IHNjb3BlIGFuZCByZW5kZXIgaXRcbiAgICBycDogZnVuY3Rpb24oc3ltYm9sLCBjb250ZXh0LCBwYXJ0aWFscywgaW5kZW50KSB7XG4gICAgICB2YXIgcGFydGlhbCA9IHRoaXMuZXAoc3ltYm9sLCBwYXJ0aWFscyk7XG4gICAgICBpZiAoIXBhcnRpYWwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFydGlhbC5yaShjb250ZXh0LCBwYXJ0aWFscywgaW5kZW50KTtcbiAgICB9LFxuXG4gICAgLy8gcmVuZGVyIGEgc2VjdGlvblxuICAgIHJzOiBmdW5jdGlvbihjb250ZXh0LCBwYXJ0aWFscywgc2VjdGlvbikge1xuICAgICAgdmFyIHRhaWwgPSBjb250ZXh0W2NvbnRleHQubGVuZ3RoIC0gMV07XG5cbiAgICAgIGlmICghaXNBcnJheSh0YWlsKSkge1xuICAgICAgICBzZWN0aW9uKGNvbnRleHQsIHBhcnRpYWxzLCB0aGlzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhaWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29udGV4dC5wdXNoKHRhaWxbaV0pO1xuICAgICAgICBzZWN0aW9uKGNvbnRleHQsIHBhcnRpYWxzLCB0aGlzKTtcbiAgICAgICAgY29udGV4dC5wb3AoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gbWF5YmUgc3RhcnQgYSBzZWN0aW9uXG4gICAgczogZnVuY3Rpb24odmFsLCBjdHgsIHBhcnRpYWxzLCBpbnZlcnRlZCwgc3RhcnQsIGVuZCwgdGFncykge1xuICAgICAgdmFyIHBhc3M7XG5cbiAgICAgIGlmIChpc0FycmF5KHZhbCkgJiYgdmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdmFsID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFsID0gdGhpcy5tcyh2YWwsIGN0eCwgcGFydGlhbHMsIGludmVydGVkLCBzdGFydCwgZW5kLCB0YWdzKTtcbiAgICAgIH1cblxuICAgICAgcGFzcyA9ICEhdmFsO1xuXG4gICAgICBpZiAoIWludmVydGVkICYmIHBhc3MgJiYgY3R4KSB7XG4gICAgICAgIGN0eC5wdXNoKCh0eXBlb2YgdmFsID09ICdvYmplY3QnKSA/IHZhbCA6IGN0eFtjdHgubGVuZ3RoIC0gMV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFzcztcbiAgICB9LFxuXG4gICAgLy8gZmluZCB2YWx1ZXMgd2l0aCBkb3R0ZWQgbmFtZXNcbiAgICBkOiBmdW5jdGlvbihrZXksIGN0eCwgcGFydGlhbHMsIHJldHVybkZvdW5kKSB7XG4gICAgICB2YXIgZm91bmQsXG4gICAgICAgICAgbmFtZXMgPSBrZXkuc3BsaXQoJy4nKSxcbiAgICAgICAgICB2YWwgPSB0aGlzLmYobmFtZXNbMF0sIGN0eCwgcGFydGlhbHMsIHJldHVybkZvdW5kKSxcbiAgICAgICAgICBkb01vZGVsR2V0ID0gdGhpcy5vcHRpb25zLm1vZGVsR2V0LFxuICAgICAgICAgIGN4ID0gbnVsbDtcblxuICAgICAgaWYgKGtleSA9PT0gJy4nICYmIGlzQXJyYXkoY3R4W2N0eC5sZW5ndGggLSAyXSkpIHtcbiAgICAgICAgdmFsID0gY3R4W2N0eC5sZW5ndGggLSAxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBmb3VuZCA9IGZpbmRJblNjb3BlKG5hbWVzW2ldLCB2YWwsIGRvTW9kZWxHZXQpO1xuICAgICAgICAgIGlmIChmb3VuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjeCA9IHZhbDtcbiAgICAgICAgICAgIHZhbCA9IGZvdW5kO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWwgPSAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHJldHVybkZvdW5kICYmICF2YWwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJldHVybkZvdW5kICYmIHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjdHgucHVzaChjeCk7XG4gICAgICAgIHZhbCA9IHRoaXMubXYodmFsLCBjdHgsIHBhcnRpYWxzKTtcbiAgICAgICAgY3R4LnBvcCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsO1xuICAgIH0sXG5cbiAgICAvLyBmaW5kIHZhbHVlcyB3aXRoIG5vcm1hbCBuYW1lc1xuICAgIGY6IGZ1bmN0aW9uKGtleSwgY3R4LCBwYXJ0aWFscywgcmV0dXJuRm91bmQpIHtcbiAgICAgIHZhciB2YWwgPSBmYWxzZSxcbiAgICAgICAgICB2ID0gbnVsbCxcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlLFxuICAgICAgICAgIGRvTW9kZWxHZXQgPSB0aGlzLm9wdGlvbnMubW9kZWxHZXQ7XG5cbiAgICAgIGZvciAodmFyIGkgPSBjdHgubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdiA9IGN0eFtpXTtcbiAgICAgICAgdmFsID0gZmluZEluU2NvcGUoa2V5LCB2LCBkb01vZGVsR2V0KTtcbiAgICAgICAgaWYgKHZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgcmV0dXJuIChyZXR1cm5Gb3VuZCkgPyBmYWxzZSA6IFwiXCI7XG4gICAgICB9XG5cbiAgICAgIGlmICghcmV0dXJuRm91bmQgJiYgdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhbCA9IHRoaXMubXYodmFsLCBjdHgsIHBhcnRpYWxzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9LFxuXG4gICAgLy8gaGlnaGVyIG9yZGVyIHRlbXBsYXRlc1xuICAgIGxzOiBmdW5jdGlvbihmdW5jLCBjeCwgcGFydGlhbHMsIHRleHQsIHRhZ3MpIHtcbiAgICAgIHZhciBvbGRUYWdzID0gdGhpcy5vcHRpb25zLmRlbGltaXRlcnM7XG5cbiAgICAgIHRoaXMub3B0aW9ucy5kZWxpbWl0ZXJzID0gdGFncztcbiAgICAgIHRoaXMuYih0aGlzLmN0KGNvZXJjZVRvU3RyaW5nKGZ1bmMuY2FsbChjeCwgdGV4dCkpLCBjeCwgcGFydGlhbHMpKTtcbiAgICAgIHRoaXMub3B0aW9ucy5kZWxpbWl0ZXJzID0gb2xkVGFncztcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyBjb21waWxlIHRleHRcbiAgICBjdDogZnVuY3Rpb24odGV4dCwgY3gsIHBhcnRpYWxzKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVMYW1iZGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMYW1iZGEgZmVhdHVyZXMgZGlzYWJsZWQuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5jLmNvbXBpbGUodGV4dCwgdGhpcy5vcHRpb25zKS5yZW5kZXIoY3gsIHBhcnRpYWxzKTtcbiAgICB9LFxuXG4gICAgLy8gdGVtcGxhdGUgcmVzdWx0IGJ1ZmZlcmluZ1xuICAgIGI6IGZ1bmN0aW9uKHMpIHsgdGhpcy5idWYgKz0gczsgfSxcblxuICAgIGZsOiBmdW5jdGlvbigpIHsgdmFyIHIgPSB0aGlzLmJ1ZjsgdGhpcy5idWYgPSAnJzsgcmV0dXJuIHI7IH0sXG5cbiAgICAvLyBtZXRob2QgcmVwbGFjZSBzZWN0aW9uXG4gICAgbXM6IGZ1bmN0aW9uKGZ1bmMsIGN0eCwgcGFydGlhbHMsIGludmVydGVkLCBzdGFydCwgZW5kLCB0YWdzKSB7XG4gICAgICB2YXIgdGV4dFNvdXJjZSxcbiAgICAgICAgICBjeCA9IGN0eFtjdHgubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgcmVzdWx0ID0gZnVuYy5jYWxsKGN4KTtcblxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAoaW52ZXJ0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXh0U291cmNlID0gKHRoaXMuYWN0aXZlU3ViICYmIHRoaXMuc3Vic1RleHQgJiYgdGhpcy5zdWJzVGV4dFt0aGlzLmFjdGl2ZVN1Yl0pID8gdGhpcy5zdWJzVGV4dFt0aGlzLmFjdGl2ZVN1Yl0gOiB0aGlzLnRleHQ7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubHMocmVzdWx0LCBjeCwgcGFydGlhbHMsIHRleHRTb3VyY2Uuc3Vic3RyaW5nKHN0YXJ0LCBlbmQpLCB0YWdzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICAvLyBtZXRob2QgcmVwbGFjZSB2YXJpYWJsZVxuICAgIG12OiBmdW5jdGlvbihmdW5jLCBjdHgsIHBhcnRpYWxzKSB7XG4gICAgICB2YXIgY3ggPSBjdHhbY3R4Lmxlbmd0aCAtIDFdO1xuICAgICAgdmFyIHJlc3VsdCA9IGZ1bmMuY2FsbChjeCk7XG5cbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3QoY29lcmNlVG9TdHJpbmcocmVzdWx0LmNhbGwoY3gpKSwgY3gsIHBhcnRpYWxzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgc3ViOiBmdW5jdGlvbihuYW1lLCBjb250ZXh0LCBwYXJ0aWFscywgaW5kZW50KSB7XG4gICAgICB2YXIgZiA9IHRoaXMuc3Vic1tuYW1lXTtcbiAgICAgIGlmIChmKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlU3ViID0gbmFtZTtcbiAgICAgICAgZihjb250ZXh0LCBwYXJ0aWFscywgdGhpcywgaW5kZW50KTtcbiAgICAgICAgdGhpcy5hY3RpdmVTdWIgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICAvL0ZpbmQgYSBrZXkgaW4gYW4gb2JqZWN0XG4gIGZ1bmN0aW9uIGZpbmRJblNjb3BlKGtleSwgc2NvcGUsIGRvTW9kZWxHZXQpIHtcbiAgICB2YXIgdmFsO1xuXG4gICAgaWYgKHNjb3BlICYmIHR5cGVvZiBzY29wZSA9PSAnb2JqZWN0Jykge1xuXG4gICAgICBpZiAoc2NvcGVba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbCA9IHNjb3BlW2tleV07XG5cbiAgICAgIC8vIHRyeSBsb29rdXAgd2l0aCBnZXQgZm9yIGJhY2tib25lIG9yIHNpbWlsYXIgbW9kZWwgZGF0YVxuICAgICAgfSBlbHNlIGlmIChkb01vZGVsR2V0ICYmIHNjb3BlLmdldCAmJiB0eXBlb2Ygc2NvcGUuZ2V0ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFsID0gc2NvcGUuZ2V0KGtleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNwZWNpYWxpemVkUGFydGlhbChpbnN0YW5jZSwgc3VicywgcGFydGlhbHMsIHN0YWNrU3Vicywgc3RhY2tQYXJ0aWFscywgc3RhY2tUZXh0KSB7XG4gICAgZnVuY3Rpb24gUGFydGlhbFRlbXBsYXRlKCkge307XG4gICAgUGFydGlhbFRlbXBsYXRlLnByb3RvdHlwZSA9IGluc3RhbmNlO1xuICAgIGZ1bmN0aW9uIFN1YnN0aXR1dGlvbnMoKSB7fTtcbiAgICBTdWJzdGl0dXRpb25zLnByb3RvdHlwZSA9IGluc3RhbmNlLnN1YnM7XG4gICAgdmFyIGtleTtcbiAgICB2YXIgcGFydGlhbCA9IG5ldyBQYXJ0aWFsVGVtcGxhdGUoKTtcbiAgICBwYXJ0aWFsLnN1YnMgPSBuZXcgU3Vic3RpdHV0aW9ucygpO1xuICAgIHBhcnRpYWwuc3Vic1RleHQgPSB7fTsgIC8vaGVoZS4gc3Vic3RleHQuXG4gICAgcGFydGlhbC5idWYgPSAnJztcblxuICAgIHN0YWNrU3VicyA9IHN0YWNrU3VicyB8fCB7fTtcbiAgICBwYXJ0aWFsLnN0YWNrU3VicyA9IHN0YWNrU3VicztcbiAgICBwYXJ0aWFsLnN1YnNUZXh0ID0gc3RhY2tUZXh0O1xuICAgIGZvciAoa2V5IGluIHN1YnMpIHtcbiAgICAgIGlmICghc3RhY2tTdWJzW2tleV0pIHN0YWNrU3Vic1trZXldID0gc3Vic1trZXldO1xuICAgIH1cbiAgICBmb3IgKGtleSBpbiBzdGFja1N1YnMpIHtcbiAgICAgIHBhcnRpYWwuc3Vic1trZXldID0gc3RhY2tTdWJzW2tleV07XG4gICAgfVxuXG4gICAgc3RhY2tQYXJ0aWFscyA9IHN0YWNrUGFydGlhbHMgfHwge307XG4gICAgcGFydGlhbC5zdGFja1BhcnRpYWxzID0gc3RhY2tQYXJ0aWFscztcbiAgICBmb3IgKGtleSBpbiBwYXJ0aWFscykge1xuICAgICAgaWYgKCFzdGFja1BhcnRpYWxzW2tleV0pIHN0YWNrUGFydGlhbHNba2V5XSA9IHBhcnRpYWxzW2tleV07XG4gICAgfVxuICAgIGZvciAoa2V5IGluIHN0YWNrUGFydGlhbHMpIHtcbiAgICAgIHBhcnRpYWwucGFydGlhbHNba2V5XSA9IHN0YWNrUGFydGlhbHNba2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFydGlhbDtcbiAgfVxuXG4gIHZhciByQW1wID0gLyYvZyxcbiAgICAgIHJMdCA9IC88L2csXG4gICAgICByR3QgPSAvPi9nLFxuICAgICAgckFwb3MgPSAvXFwnL2csXG4gICAgICByUXVvdCA9IC9cXFwiL2csXG4gICAgICBoQ2hhcnMgPSAvWyY8PlxcXCJcXCddLztcblxuICBmdW5jdGlvbiBjb2VyY2VUb1N0cmluZyh2YWwpIHtcbiAgICByZXR1cm4gU3RyaW5nKCh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpID8gJycgOiB2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gaG9nYW5Fc2NhcGUoc3RyKSB7XG4gICAgc3RyID0gY29lcmNlVG9TdHJpbmcoc3RyKTtcbiAgICByZXR1cm4gaENoYXJzLnRlc3Qoc3RyKSA/XG4gICAgICBzdHJcbiAgICAgICAgLnJlcGxhY2UockFtcCwgJyZhbXA7JylcbiAgICAgICAgLnJlcGxhY2Uockx0LCAnJmx0OycpXG4gICAgICAgIC5yZXBsYWNlKHJHdCwgJyZndDsnKVxuICAgICAgICAucmVwbGFjZShyQXBvcywgJyYjMzk7JylcbiAgICAgICAgLnJlcGxhY2UoclF1b3QsICcmcXVvdDsnKSA6XG4gICAgICBzdHI7XG4gIH1cblxuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24oYSkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbn0pKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyA/IGV4cG9ydHMgOiBIb2dhbik7XG4iLCIvKlxuICogIENvcHlyaWdodCAyMDExIFR3aXR0ZXIsIEluYy5cbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8vIFRoaXMgZmlsZSBpcyBmb3IgdXNlIHdpdGggTm9kZS5qcy4gU2VlIGRpc3QvIGZvciBicm93c2VyIGZpbGVzLlxuXG52YXIgSG9nYW4gPSByZXF1aXJlKCcuL2NvbXBpbGVyJyk7XG5Ib2dhbi5UZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUnKS5UZW1wbGF0ZTtcbkhvZ2FuLnRlbXBsYXRlID0gSG9nYW4uVGVtcGxhdGU7XG5tb2R1bGUuZXhwb3J0cyA9IEhvZ2FuO1xuIiwiZGl2IFNvbWUgU3RhdGljXG4uZGV2PSBkZXZcbi50ZXN0PSB0ZXN0XG4uZmluYWw9IGZpbmFsXG4uaGFzaD0gaGFzaFxuLmluc3RhbmNlPSBpbnN0YW5jZVxuIiwiZXhwb3J0IGRlZmF1bHQge307XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBwdWdfaGFzX293bl9wcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IHB1Z19tZXJnZTtcbmZ1bmN0aW9uIHB1Z19tZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gcHVnX21lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ID09PSAnY2xhc3MnKSB7XG4gICAgICB2YXIgdmFsQSA9IGFba2V5XSB8fCBbXTtcbiAgICAgIGFba2V5XSA9IChBcnJheS5pc0FycmF5KHZhbEEpID8gdmFsQSA6IFt2YWxBXSkuY29uY2F0KGJba2V5XSB8fCBbXSk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgIHZhciB2YWxBID0gcHVnX3N0eWxlKGFba2V5XSk7XG4gICAgICB2YWxBID0gdmFsQSAmJiB2YWxBW3ZhbEEubGVuZ3RoIC0gMV0gIT09ICc7JyA/IHZhbEEgKyAnOycgOiB2YWxBO1xuICAgICAgdmFyIHZhbEIgPSBwdWdfc3R5bGUoYltrZXldKTtcbiAgICAgIHZhbEIgPSB2YWxCICYmIHZhbEJbdmFsQi5sZW5ndGggLSAxXSAhPT0gJzsnID8gdmFsQiArICc7JyA6IHZhbEI7XG4gICAgICBhW2tleV0gPSB2YWxBICsgdmFsQjtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFycmF5LCBvYmplY3QsIG9yIHN0cmluZyBhcyBhIHN0cmluZyBvZiBjbGFzc2VzIGRlbGltaXRlZCBieSBhIHNwYWNlLlxuICpcbiAqIElmIGB2YWxgIGlzIGFuIGFycmF5LCBhbGwgbWVtYmVycyBvZiBpdCBhbmQgaXRzIHN1YmFycmF5cyBhcmUgY291bnRlZCBhc1xuICogY2xhc3Nlcy4gSWYgYGVzY2FwaW5nYCBpcyBhbiBhcnJheSwgdGhlbiB3aGV0aGVyIG9yIG5vdCB0aGUgaXRlbSBpbiBgdmFsYCBpc1xuICogZXNjYXBlZCBkZXBlbmRzIG9uIHRoZSBjb3JyZXNwb25kaW5nIGl0ZW0gaW4gYGVzY2FwaW5nYC4gSWYgYGVzY2FwaW5nYCBpc1xuICogbm90IGFuIGFycmF5LCBubyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIElmIGB2YWxgIGlzIGFuIG9iamVjdCwgYWxsIHRoZSBrZXlzIHdob3NlIHZhbHVlIGlzIHRydXRoeSBhcmUgY291bnRlZCBhc1xuICogY2xhc3Nlcy4gTm8gZXNjYXBpbmcgaXMgZG9uZS5cbiAqXG4gKiBJZiBgdmFsYCBpcyBhIHN0cmluZywgaXQgaXMgY291bnRlZCBhcyBhIGNsYXNzLiBObyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIEBwYXJhbSB7KEFycmF5LjxzdHJpbmc+fE9iamVjdC48c3RyaW5nLCBib29sZWFuPnxzdHJpbmcpfSB2YWxcbiAqIEBwYXJhbSB7P0FycmF5LjxzdHJpbmc+fSBlc2NhcGluZ1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNsYXNzZXMgPSBwdWdfY2xhc3NlcztcbmZ1bmN0aW9uIHB1Z19jbGFzc2VzX2FycmF5KHZhbCwgZXNjYXBpbmcpIHtcbiAgdmFyIGNsYXNzU3RyaW5nID0gJycsIGNsYXNzTmFtZSwgcGFkZGluZyA9ICcnLCBlc2NhcGVFbmFibGVkID0gQXJyYXkuaXNBcnJheShlc2NhcGluZyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgY2xhc3NOYW1lID0gcHVnX2NsYXNzZXModmFsW2ldKTtcbiAgICBpZiAoIWNsYXNzTmFtZSkgY29udGludWU7XG4gICAgZXNjYXBlRW5hYmxlZCAmJiBlc2NhcGluZ1tpXSAmJiAoY2xhc3NOYW1lID0gcHVnX2VzY2FwZShjbGFzc05hbWUpKTtcbiAgICBjbGFzc1N0cmluZyA9IGNsYXNzU3RyaW5nICsgcGFkZGluZyArIGNsYXNzTmFtZTtcbiAgICBwYWRkaW5nID0gJyAnO1xuICB9XG4gIHJldHVybiBjbGFzc1N0cmluZztcbn1cbmZ1bmN0aW9uIHB1Z19jbGFzc2VzX29iamVjdCh2YWwpIHtcbiAgdmFyIGNsYXNzU3RyaW5nID0gJycsIHBhZGRpbmcgPSAnJztcbiAgZm9yICh2YXIga2V5IGluIHZhbCkge1xuICAgIGlmIChrZXkgJiYgdmFsW2tleV0gJiYgcHVnX2hhc19vd25fcHJvcGVydHkuY2FsbCh2YWwsIGtleSkpIHtcbiAgICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyBwYWRkaW5nICsga2V5O1xuICAgICAgcGFkZGluZyA9ICcgJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsYXNzU3RyaW5nO1xufVxuZnVuY3Rpb24gcHVnX2NsYXNzZXModmFsLCBlc2NhcGluZykge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgcmV0dXJuIHB1Z19jbGFzc2VzX2FycmF5KHZhbCwgZXNjYXBpbmcpO1xuICB9IGVsc2UgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBwdWdfY2xhc3Nlc19vYmplY3QodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsIHx8ICcnO1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBvYmplY3Qgb3Igc3RyaW5nIHRvIGEgc3RyaW5nIG9mIENTUyBzdHlsZXMgZGVsaW1pdGVkIGJ5IGEgc2VtaWNvbG9uLlxuICpcbiAqIEBwYXJhbSB7KE9iamVjdC48c3RyaW5nLCBzdHJpbmc+fHN0cmluZyl9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmV4cG9ydHMuc3R5bGUgPSBwdWdfc3R5bGU7XG5mdW5jdGlvbiBwdWdfc3R5bGUodmFsKSB7XG4gIGlmICghdmFsKSByZXR1cm4gJyc7XG4gIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHZhciBvdXQgPSAnJztcbiAgICBmb3IgKHZhciBzdHlsZSBpbiB2YWwpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAocHVnX2hhc19vd25fcHJvcGVydHkuY2FsbCh2YWwsIHN0eWxlKSkge1xuICAgICAgICBvdXQgPSBvdXQgKyBzdHlsZSArICc6JyArIHZhbFtzdHlsZV0gKyAnOyc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbCArICcnO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBwdWdfYXR0cjtcbmZ1bmN0aW9uIHB1Z19hdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAodmFsID09PSBmYWxzZSB8fCB2YWwgPT0gbnVsbCB8fCAhdmFsICYmIChrZXkgPT09ICdjbGFzcycgfHwga2V5ID09PSAnc3R5bGUnKSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAoKHR5cGUgPT09ICdvYmplY3QnIHx8IHR5cGUgPT09ICdmdW5jdGlvbicpICYmIHR5cGVvZiB2YWwudG9KU09OID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFsID0gdmFsLnRvSlNPTigpO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsICE9PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEpTT04uc3RyaW5naWZ5KHZhbCk7XG4gICAgaWYgKCFlc2NhcGVkICYmIHZhbC5pbmRleE9mKCdcIicpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICcgJyArIGtleSArICc9XFwnJyArIHZhbC5yZXBsYWNlKC8nL2csICcmIzM5OycpICsgJ1xcJyc7XG4gICAgfVxuICB9XG4gIGlmIChlc2NhcGVkKSB2YWwgPSBwdWdfZXNjYXBlKHZhbCk7XG4gIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IHRlcnNlIHdoZXRoZXIgdG8gdXNlIEhUTUw1IHRlcnNlIGJvb2xlYW4gYXR0cmlidXRlc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gcHVnX2F0dHJzO1xuZnVuY3Rpb24gcHVnX2F0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYXR0cnMgPSAnJztcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKHB1Z19oYXNfb3duX3Byb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICB2YXIgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09PSBrZXkpIHtcbiAgICAgICAgdmFsID0gcHVnX2NsYXNzZXModmFsKTtcbiAgICAgICAgYXR0cnMgPSBwdWdfYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSArIGF0dHJzO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICgnc3R5bGUnID09PSBrZXkpIHtcbiAgICAgICAgdmFsID0gcHVnX3N0eWxlKHZhbCk7XG4gICAgICB9XG4gICAgICBhdHRycyArPSBwdWdfYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXR0cnM7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIHB1Z19tYXRjaF9odG1sID0gL1tcIiY8Pl0vO1xuZXhwb3J0cy5lc2NhcGUgPSBwdWdfZXNjYXBlO1xuZnVuY3Rpb24gcHVnX2VzY2FwZShfaHRtbCl7XG4gIHZhciBodG1sID0gJycgKyBfaHRtbDtcbiAgdmFyIHJlZ2V4UmVzdWx0ID0gcHVnX21hdGNoX2h0bWwuZXhlYyhodG1sKTtcbiAgaWYgKCFyZWdleFJlc3VsdCkgcmV0dXJuIF9odG1sO1xuXG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIGksIGxhc3RJbmRleCwgZXNjYXBlO1xuICBmb3IgKGkgPSByZWdleFJlc3VsdC5pbmRleCwgbGFzdEluZGV4ID0gMDsgaSA8IGh0bWwubGVuZ3RoOyBpKyspIHtcbiAgICBzd2l0Y2ggKGh0bWwuY2hhckNvZGVBdChpKSkge1xuICAgICAgY2FzZSAzNDogZXNjYXBlID0gJyZxdW90Oyc7IGJyZWFrO1xuICAgICAgY2FzZSAzODogZXNjYXBlID0gJyZhbXA7JzsgYnJlYWs7XG4gICAgICBjYXNlIDYwOiBlc2NhcGUgPSAnJmx0Oyc7IGJyZWFrO1xuICAgICAgY2FzZSA2MjogZXNjYXBlID0gJyZndDsnOyBicmVhaztcbiAgICAgIGRlZmF1bHQ6IGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAobGFzdEluZGV4ICE9PSBpKSByZXN1bHQgKz0gaHRtbC5zdWJzdHJpbmcobGFzdEluZGV4LCBpKTtcbiAgICBsYXN0SW5kZXggPSBpICsgMTtcbiAgICByZXN1bHQgKz0gZXNjYXBlO1xuICB9XG4gIGlmIChsYXN0SW5kZXggIT09IGkpIHJldHVybiByZXN1bHQgKyBodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsIGkpO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIHB1ZyBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBvcmlnaW5hbCBzb3VyY2VcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IHB1Z19yZXRocm93O1xuZnVuY3Rpb24gcHVnX3JldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHB1Z19yZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnUHVnJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG4iLCJkb2N0eXBlIGh0bWxcbmhlYWRcblx0bWV0YShjaGFyc2V0PSd1dGYtOCcpXG5cdHRpdGxlIGluZGV4XG5cblx0bGluayhyZWw9J3N0eWxlc2hlZXQnIGhyZWY9J3N0YXRpYy9pbmRleC5jc3MnKVxuXHRzY3JpcHQoc3JjPSdzdGF0aWMvaW5kZXguanMnKVxuYm9keVxuXHRpbmNsdWRlIHNvbWVcblx0aW5jbHVkZSAvb3RoZXIvc29tZVxuXG5cdC5kZXY9IGRldlxuXHQudGVzdD0gdGVzdFxuXHQuZmluYWw9IGZpbmFsXG5cdC5oYXNoPSBoYXNoXG5cdC5pbnN0YW5jZT0gaW5zdGFuY2VcblxuXHRpZiBkZXZcblx0XHQuZGV2IFllc1xuXG5cdC5iZy5pbWcxXG5cdGltZyhzcmM9J3N0YXRpYy9hc3NldHMvcmVkLnBuZycpXG5cdC5iZy5pbWcyXG5cdGltZyhzcmM9J3N0YXRpYy9hc3NldHMvZGlyL3Zpb2xldC5wbmcnKVxuXHQuYmcuaW1nM1xuXHRpbWcoc3JjPSdzdGF0aWMvYXNzZXRzL2luZGV4L2dyZWVuLnBuZycpXG5cdC5iZy5pbWc0XG5cdGltZyhzcmM9J3N0YXRpYy9hc3NldHMvaW5kZXgvZGlyL2JsdWUucG5nJylcblxuXHRhKGhyZWY9J2xvY2FsaG9zdDo4MDgwL3N0YXRpYy9hc3NldHMvcmVkLnBuZycpXG4iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgYW5zd2VyIGZyb20gJ3RoZS1hbnN3ZXInXG5jb25zb2xlLmxvZygnYW5zd2VyJywgYW5zd2VyKVxuXG5pbXBvcnQgbm9vcCBmcm9tICdub29wMydcbmNvbnNvbGUubG9nKCdub29wJywgbm9vcClcblxuaW1wb3J0IHsgY3VycnkgfSBmcm9tICdyYW1iZGEvc3JjL2N1cnJ5J1xuY29uc29sZS5sb2coJ2N1cnJ5JywgY3VycnkpXG5cbmltcG9ydCBvdGhlciBmcm9tICd+bGliL290aGVyL290aGVyJ1xuY29uc29sZS5sb2cob3RoZXIpXG5cbmltcG9ydCBjanMgZnJvbSAnfmxpYi9vdGhlci9janMnXG5jb25zb2xlLmxvZyhjanMpXG5cbmltcG9ydCBqc29uIGZyb20gJ35saWIvb3RoZXIvb3RoZXIuanNvbidcbmNvbnNvbGUubG9nKGpzb24pXG5cblxuaW1wb3J0IHsgZGV2IH0gZnJvbSAnfm1ldGFscGlwZSdcbmZ1bmN0aW9uIGRlYnVnICguLi5hcmdzKVxue1xuXHRkZXYgJiYgY29uc29sZS5sb2coLi4uYXJncylcbn1cbmNvbnNvbGUubG9nKGRldilcbmRlYnVnKDEsIDIsIDMpXG5cbmltcG9ydCB7IGZpbmFsLCB0ZXN0LCBoYXNoLCBpbnN0YW5jZSB9IGZyb20gJ35tZXRhbHBpcGUnXG5jb25zb2xlLmxvZyh7IGZpbmFsLCB0ZXN0LCBoYXNoLCBpbnN0YW5jZSB9KVxuXG5jb25zb2xlLmxvZyhwcm9jZXNzLmVudi5OT0RFX0VOVilcblxuY29uc29sZS5sb2coISEgZ2xvYmFsLmdsb2JhbClcblxuaW1wb3J0IHAgZnJvbSAncHJvY2VzcydcbmNvbnNvbGUubG9nKHApXG5cbnR5cGUgRm9vID0geyB5ZXM6IHN0cmluZyB9XG5cbnZhciBmb286IEZvbyA9IHsgeWVzOiAneWVzJyB9XG5jb25zb2xlLmxvZyhmb28pXG5cbi8qIHRlbXBsYXRpbmc6ICovXG5pbXBvcnQgbXN0IGZyb20gJ35saWIvb3RoZXIvb3RoZXIubXN0Lmh0bWwnXG5jb25zb2xlLmxvZyhtc3QucmVuZGVyKHsgZGF0YTogJ3llcycgfSkpXG5cbmltcG9ydCBwdWdfc3RhdGljIGZyb20gJ35saWIvb3RoZXIvc29tZS5zdGF0aWMucHVnJ1xuY29uc29sZS5sb2cocHVnX3N0YXRpYylcblxuaW1wb3J0IHB1ZyBmcm9tICcuL2luZGV4LnB1ZydcbmNvbnNvbGUubG9nKHB1Zyh7IG90aGVyOiAnT3RoZXInLCBzb21lOiAnU29tZScgfSkpXG5cbmRldjogY29uc29sZS5sb2coJ2RldicpXG5cbmZpbmFsOiBjb25zb2xlLmxvZygnZmluYWwnKVxuXG50ZXN0OiBjb25zb2xlLmxvZygndGVzdCcpXG5cbmRlYnVnZ2VyXG4iXSwibmFtZXMiOlsicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJnbG9iYWwiLCJhbnN3ZXIiLCJub29wIiwib3RoZXIiLCJkZXYiLCJmaW5hbCIsInRlc3QiLCJoYXNoIiwiaW5zdGFuY2UiXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUFBLENBQUEsT0FBQSxNQUFBLEtBQUEsV0FBQSxHQUFBLE1BQUE7WUFDQSxZQUFBLE9BQUEsSUFBQSxLQUFBLFdBQUEsR0FBQSxJQUFBO1lBQ0EsWUFBQSxPQUFBLE1BQUEsS0FBQSxXQUFBLEdBQUEsTUFBQSxHQUFBLEVBQUE7O1lDRkEsSUFBQSxLQUFBLEdBQUEsRUFBQTs7Z0JDQ0EsT0FBQSxHQUFBLE1BQUEsTUFBQSxFQUFBOztZQ0FBLE1BQUEsV0FBQSxHQUFBQSxPQUFBLENBQUE7QUFDQTtnQkFDQSxLQUFBLEdBQUEsV0FBQSxFQUFBOztZQ0hBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBLFNBQUEsS0FBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLEdBQUEsRUFBQSxFQUFBO1lBQ0EsRUFBQSxPQUFBLENBQUEsR0FBQSxLQUFBO1lBQ0EsSUFBQSxDQUFBLElBQUEsSUFBQSxJQUFBLENBQUEsTUFBQSxJQUFBLEVBQUEsQ0FBQSxNQUFBLEdBQUEsRUFBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLEdBQUEsS0FBQSxDQUFBLEVBQUEsRUFBQSxJQUFBLENBQUEsRUFBQTtZQUNBLE1BQUEsR0FBQSxJQUFBO1lBQ0EsTUFBQSxHQUFBLEtBQUE7WUFDQSxLQUFBLENBQUE7WUFDQTs7WUM1Q0EsZ0JBQUE7WUFDQTtZQUNBLENBQUEsT0FBQSxPQUFBO1lBQ0E7O1lDSEEsSUFBQSxJQUFBLEdBQUE7O1lDQUEsSUFBQSxNQUFBLEdBQUFBLE1BQUE7WUFDQSxJQUFBLEtBQUEsSUFBQUMsS0FBQTtBQUNBO0FBQ0E7Z0JBQ0EsR0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsS0FBQTs7Ozs7Ozs7Ozs7OztZQ0xBOzs7WUFHQSxTQUFBLGdCQUFBLEdBQUE7WUFDQSxJQUFBLE1BQUEsSUFBQSxLQUFBLENBQUEsaUNBQUEsQ0FBQSxDQUFBO1lBQ0EsQ0FBQTtZQUNBLFNBQUEsbUJBQUEsSUFBQTtZQUNBLElBQUEsTUFBQSxJQUFBLEtBQUEsQ0FBQSxtQ0FBQSxDQUFBLENBQUE7WUFDQSxDQUFBO1lBQ0EsSUFBQSxnQkFBQSxHQUFBLGdCQUFBLENBQUE7WUFDQSxJQUFBLGtCQUFBLEdBQUEsbUJBQUEsQ0FBQTtZQUNBLElBQUEsT0FBQUMsUUFBQSxDQUFBLFVBQUEsS0FBQSxVQUFBLEVBQUE7Z0JBQ0EsZ0JBQUEsR0FBQSxVQUFBLENBQUE7WUFDQSxDQUFBO1lBQ0EsSUFBQSxPQUFBQSxRQUFBLENBQUEsWUFBQSxLQUFBLFVBQUEsRUFBQTtnQkFDQSxrQkFBQSxHQUFBLFlBQUEsQ0FBQTtZQUNBLENBQUE7O1lBRUEsU0FBQSxVQUFBLENBQUEsR0FBQSxFQUFBO2dCQUNBLElBQUEsZ0JBQUEsS0FBQSxVQUFBLEVBQUE7O1lBRUEsUUFBQSxPQUFBLFVBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxLQUFBOztnQkFFQSxJQUFBLENBQUEsZ0JBQUEsS0FBQSxnQkFBQSxJQUFBLENBQUEsZ0JBQUEsS0FBQSxVQUFBLEVBQUE7b0JBQ0EsZ0JBQUEsR0FBQSxVQUFBLENBQUE7WUFDQSxRQUFBLE9BQUEsVUFBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7Z0JBQ0EsSUFBQTs7WUFFQSxRQUFBLE9BQUEsZ0JBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUE7aUJBQ0EsQ0FBQSxNQUFBLENBQUEsQ0FBQTtvQkFDQSxJQUFBOzt3QkFFQSxPQUFBLGdCQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUE7cUJBQ0EsQ0FBQSxNQUFBLENBQUEsQ0FBQTs7d0JBRUEsT0FBQSxnQkFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsU0FBQTtZQUNBLEtBQUE7OztZQUdBLENBQUE7WUFDQSxTQUFBLGVBQUEsQ0FBQSxNQUFBLEVBQUE7Z0JBQ0EsSUFBQSxrQkFBQSxLQUFBLFlBQUEsRUFBQTs7WUFFQSxRQUFBLE9BQUEsWUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTs7Z0JBRUEsSUFBQSxDQUFBLGtCQUFBLEtBQUEsbUJBQUEsSUFBQSxDQUFBLGtCQUFBLEtBQUEsWUFBQSxFQUFBO29CQUNBLGtCQUFBLEdBQUEsWUFBQSxDQUFBO1lBQ0EsUUFBQSxPQUFBLFlBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7Z0JBQ0EsSUFBQTs7WUFFQSxRQUFBLE9BQUEsa0JBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTtpQkFDQSxDQUFBLE9BQUEsQ0FBQSxDQUFBO29CQUNBLElBQUE7O3dCQUVBLE9BQUEsa0JBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxFQUFBLE1BQUEsQ0FBQSxDQUFBO3FCQUNBLENBQUEsT0FBQSxDQUFBLENBQUE7Ozt3QkFHQSxPQUFBLGtCQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBQSxNQUFBLENBQUEsQ0FBQTtZQUNBLFNBQUE7WUFDQSxLQUFBOzs7O1lBSUEsQ0FBQTtZQUNBLElBQUEsS0FBQSxHQUFBLEVBQUEsQ0FBQTtZQUNBLElBQUEsUUFBQSxHQUFBLEtBQUEsQ0FBQTtZQUNBLElBQUEsWUFBQSxDQUFBO1lBQ0EsSUFBQSxVQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUE7O1lBRUEsU0FBQSxlQUFBLEdBQUE7WUFDQSxJQUFBLElBQUEsQ0FBQSxRQUFBLElBQUEsQ0FBQSxZQUFBLEVBQUE7b0JBQ0EsT0FBQTtZQUNBLEtBQUE7Z0JBQ0EsUUFBQSxHQUFBLEtBQUEsQ0FBQTtnQkFDQSxJQUFBLFlBQUEsQ0FBQSxNQUFBLEVBQUE7WUFDQSxRQUFBLEtBQUEsR0FBQSxZQUFBLENBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBO2lCQUNBLE1BQUE7b0JBQ0EsVUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtnQkFDQSxJQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUE7WUFDQSxRQUFBLFVBQUEsRUFBQSxDQUFBO1lBQ0EsS0FBQTtZQUNBLENBQUE7O1lBRUEsU0FBQSxVQUFBLEdBQUE7WUFDQSxJQUFBLElBQUEsUUFBQSxFQUFBO29CQUNBLE9BQUE7WUFDQSxLQUFBO1lBQ0EsSUFBQSxJQUFBLE9BQUEsR0FBQSxVQUFBLENBQUEsZUFBQSxDQUFBLENBQUE7Z0JBQ0EsUUFBQSxHQUFBLElBQUEsQ0FBQTs7WUFFQSxJQUFBLElBQUEsR0FBQSxHQUFBLEtBQUEsQ0FBQSxNQUFBLENBQUE7WUFDQSxJQUFBLE1BQUEsR0FBQSxFQUFBO29CQUNBLFlBQUEsR0FBQSxLQUFBLENBQUE7b0JBQ0EsS0FBQSxHQUFBLEVBQUEsQ0FBQTtZQUNBLFFBQUEsT0FBQSxFQUFBLFVBQUEsR0FBQSxHQUFBLEVBQUE7WUFDQSxZQUFBLElBQUEsWUFBQSxFQUFBO1lBQ0EsZ0JBQUEsWUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsYUFBQTtZQUNBLFNBQUE7b0JBQ0EsVUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLEdBQUEsS0FBQSxDQUFBLE1BQUEsQ0FBQTtZQUNBLEtBQUE7Z0JBQ0EsWUFBQSxHQUFBLElBQUEsQ0FBQTtnQkFDQSxRQUFBLEdBQUEsS0FBQSxDQUFBO2dCQUNBLGVBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQTtZQUNBLENBQUE7WUFDQSxTQUFBLFFBQUEsQ0FBQSxHQUFBLEVBQUE7Z0JBQ0EsSUFBQSxJQUFBLEdBQUEsSUFBQSxLQUFBLENBQUEsU0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLElBQUEsSUFBQSxTQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsRUFBQTtZQUNBLFFBQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLFNBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7d0JBQ0EsSUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxTQUFBO1lBQ0EsS0FBQTtnQkFDQSxLQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsSUFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxDQUFBO2dCQUNBLElBQUEsS0FBQSxDQUFBLE1BQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLEVBQUE7b0JBQ0EsVUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtZQUNBLENBQUE7O1lBRUEsU0FBQSxJQUFBLENBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQTtZQUNBLElBQUEsSUFBQSxDQUFBLEdBQUEsR0FBQSxHQUFBLENBQUE7WUFDQSxJQUFBLElBQUEsQ0FBQSxLQUFBLEdBQUEsS0FBQSxDQUFBO1lBQ0EsQ0FBQTtZQUNBLElBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxHQUFBLFlBQUE7Z0JBQ0EsSUFBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQTthQUNBLENBQUE7WUFDQSxJQUFBLEtBQUEsR0FBQSxTQUFBLENBQUE7WUFDQSxJQUFBLFFBQUEsR0FBQSxTQUFBLENBQUE7WUFDQSxJQUFBLE9BQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxJQUFBLEdBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxJQUFBLElBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxJQUFBLE9BQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxJQUFBLFFBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxJQUFBLE9BQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxJQUFBLE1BQUEsR0FBQSxFQUFBLENBQUE7O1lBRUEsU0FBQSxJQUFBLEdBQUEsRUFBQTs7WUFFQSxJQUFBLEVBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxJQUFBLFdBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxJQUFBLElBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxJQUFBLEdBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxJQUFBLGNBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxJQUFBLGtCQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsSUFBQSxJQUFBLEdBQUEsSUFBQSxDQUFBOztZQUVBLFNBQUEsT0FBQSxDQUFBLElBQUEsRUFBQTtZQUNBLElBQUEsTUFBQSxJQUFBLEtBQUEsQ0FBQSxrQ0FBQSxDQUFBLENBQUE7WUFDQSxDQUFBOztZQUVBLFNBQUEsR0FBQSxJQUFBLEVBQUEsT0FBQSxHQUFBLEVBQUE7WUFDQSxTQUFBLEtBQUEsRUFBQSxHQUFBLEVBQUE7WUFDQSxJQUFBLE1BQUEsSUFBQSxLQUFBLENBQUEsZ0NBQUEsQ0FBQSxDQUFBO2FBRUEsU0FBQSxLQUFBLEdBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQSxFQUFBOzs7WUFHQSxJQUFBLFdBQUEsR0FBQUEsUUFBQSxDQUFBLFdBQUEsSUFBQSxHQUFBO1lBQ0EsSUFBQSxjQUFBO1lBQ0EsRUFBQSxXQUFBLENBQUEsR0FBQTtZQUNBLEVBQUEsV0FBQSxDQUFBLE1BQUE7WUFDQSxFQUFBLFdBQUEsQ0FBQSxLQUFBO1lBQ0EsRUFBQSxXQUFBLENBQUEsSUFBQTtZQUNBLEVBQUEsV0FBQSxDQUFBLFNBQUE7Y0FDQSxVQUFBLEVBQUEsT0FBQSxDQUFBLElBQUEsSUFBQSxFQUFBLEVBQUEsT0FBQSxFQUFBLEdBQUE7Ozs7WUFJQSxTQUFBLE1BQUEsQ0FBQSxpQkFBQSxDQUFBO2NBQ0EsSUFBQSxTQUFBLEdBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBLENBQUEsQ0FBQSxLQUFBO1lBQ0EsRUFBQSxJQUFBLE9BQUEsR0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLFNBQUEsRUFBQTtZQUNBLEVBQUEsSUFBQSxXQUFBLEdBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLEVBQUEsR0FBQSxFQUFBO1lBQ0EsRUFBQSxJQUFBLGlCQUFBLEVBQUE7WUFDQSxJQUFBLE9BQUEsR0FBQSxPQUFBLEdBQUEsaUJBQUEsQ0FBQSxDQUFBLEVBQUE7WUFDQSxJQUFBLFdBQUEsR0FBQSxXQUFBLEdBQUEsaUJBQUEsQ0FBQSxDQUFBLEVBQUE7Z0JBQ0EsSUFBQSxXQUFBLENBQUEsQ0FBQSxFQUFBO1lBQ0EsTUFBQSxPQUFBLEdBQUE7WUFDQSxNQUFBLFdBQUEsSUFBQSxJQUFBO1lBQ0EsS0FBQTtZQUNBLEdBQUE7WUFDQSxFQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsV0FBQSxDQUFBO1lBQ0EsQ0FBQTs7WUFFQSxJQUFBLFNBQUEsR0FBQSxJQUFBLElBQUEsRUFBQSxDQUFBO1lBQ0EsU0FBQSxNQUFBLEdBQUE7WUFDQSxFQUFBLElBQUEsV0FBQSxHQUFBLElBQUEsSUFBQSxFQUFBLENBQUE7WUFDQSxFQUFBLElBQUEsR0FBQSxHQUFBLFdBQUEsR0FBQSxTQUFBLENBQUE7Y0FDQSxPQUFBLEdBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxDQUFBOztBQUVBLG9CQUFBO1lBQ0EsRUFBQSxRQUFBLEVBQUEsUUFBQTtZQUNBLEVBQUEsS0FBQSxFQUFBLEtBQUE7WUFDQSxFQUFBLE9BQUEsRUFBQSxPQUFBO1lBQ0EsRUFBQSxHQUFBLEVBQUEsR0FBQTtZQUNBLEVBQUEsSUFBQSxFQUFBLElBQUE7WUFDQSxFQUFBLE9BQUEsRUFBQSxPQUFBO1lBQ0EsRUFBQSxRQUFBLEVBQUEsUUFBQTtZQUNBLEVBQUEsRUFBQSxFQUFBLEVBQUE7WUFDQSxFQUFBLFdBQUEsRUFBQSxXQUFBO1lBQ0EsRUFBQSxJQUFBLEVBQUEsSUFBQTtZQUNBLEVBQUEsR0FBQSxFQUFBLEdBQUE7WUFDQSxFQUFBLGNBQUEsRUFBQSxjQUFBO1lBQ0EsRUFBQSxrQkFBQSxFQUFBLGtCQUFBO1lBQ0EsRUFBQSxJQUFBLEVBQUEsSUFBQTtZQUNBLEVBQUEsT0FBQSxFQUFBLE9BQUE7WUFDQSxFQUFBLEdBQUEsRUFBQSxHQUFBO1lBQ0EsRUFBQSxLQUFBLEVBQUEsS0FBQTtZQUNBLEVBQUEsS0FBQSxFQUFBLEtBQUE7WUFDQSxFQUFBLE1BQUEsRUFBQSxNQUFBO1lBQ0EsRUFBQSxRQUFBLEVBQUEsUUFBQTtZQUNBLEVBQUEsT0FBQSxFQUFBLE9BQUE7WUFDQSxFQUFBLE1BQUEsRUFBQSxNQUFBO1lBQ0EsRUFBQSxNQUFBLEVBQUEsTUFBQTthQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQzlNQSxDQUFBLFVBQUEsS0FBQSxFQUFBO1lBQ0E7WUFDQTtlQUNBLElBQUEsYUFBQSxHQUFBLElBQUE7bUJBQ0EsS0FBQSxHQUFBLEtBQUE7bUJBQ0EsUUFBQSxJQUFBLEtBQUE7bUJBQ0EsR0FBQSxHQUFBLEtBQUE7bUJBQ0EsTUFBQSxHQUFBLEtBQUE7bUJBQ0EsUUFBQSxHQUFBLFFBQUE7bUJBQ0EsYUFBQSxHQUFBLFFBQUEsQ0FBQTtBQUNBO2VBQ0EsS0FBQSxDQUFBLElBQUEsR0FBQTtZQUNBLEtBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxLQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLENBQUE7aUJBQ0EsR0FBQSxFQUFBLEVBQUEsRUFBQSxHQUFBLEVBQUEsRUFBQSxFQUFBLElBQUEsRUFBQSxFQUFBO1lBQ0EsSUFBQSxDQUFBO0FBQ0E7ZUFDQSxLQUFBLENBQUEsSUFBQSxHQUFBLFNBQUEsSUFBQSxDQUFBLElBQUEsRUFBQSxVQUFBLEVBQUE7WUFDQSxLQUFBLElBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxNQUFBO3FCQUNBLE9BQUEsR0FBQSxDQUFBO3FCQUNBLFdBQUEsR0FBQSxDQUFBO3FCQUNBLE1BQUEsR0FBQSxDQUFBO3FCQUNBLEtBQUEsR0FBQSxPQUFBO3FCQUNBLE9BQUEsR0FBQSxJQUFBO3FCQUNBLEdBQUEsR0FBQSxJQUFBO3FCQUNBLEdBQUEsR0FBQSxFQUFBO3FCQUNBLE1BQUEsR0FBQSxFQUFBO3FCQUNBLE9BQUEsR0FBQSxLQUFBO3FCQUNBLENBQUEsR0FBQSxDQUFBO3FCQUNBLFNBQUEsR0FBQSxDQUFBO3FCQUNBLElBQUEsR0FBQSxJQUFBO3FCQUNBLElBQUEsR0FBQSxJQUFBLENBQUE7QUFDQTtpQkFDQSxTQUFBLE1BQUEsR0FBQTtZQUNBLE9BQUEsSUFBQSxHQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsRUFBQTtZQUNBLFNBQUEsTUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsTUFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtxQkFDQSxHQUFBLEdBQUEsRUFBQSxDQUFBO29CQUNBO2tCQUNBO0FBQ0E7aUJBQ0EsU0FBQSxnQkFBQSxHQUFBO1lBQ0EsT0FBQSxJQUFBLGVBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxPQUFBLEtBQUEsSUFBQSxDQUFBLEdBQUEsU0FBQSxFQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxFQUFBO1lBQ0EsU0FBQSxlQUFBO1lBQ0EsV0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBO3dCQUNBLE1BQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsSUFBQSxJQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLGFBQUEsQ0FBQSxLQUFBLElBQUEsQ0FBQSxDQUFBO3FCQUNBLElBQUEsQ0FBQSxlQUFBLEVBQUE7dUJBQ0EsT0FBQSxLQUFBLENBQUE7c0JBQ0E7b0JBQ0E7QUFDQTttQkFDQSxPQUFBLGVBQUEsQ0FBQTtrQkFDQTtBQUNBO1lBQ0EsS0FBQSxTQUFBLFVBQUEsQ0FBQSxXQUFBLEVBQUEsU0FBQSxFQUFBO21CQUNBLE1BQUEsRUFBQSxDQUFBO0FBQ0E7WUFDQSxPQUFBLElBQUEsV0FBQSxJQUFBLGdCQUFBLEVBQUEsRUFBQTtZQUNBLFNBQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxTQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxFQUFBO1lBQ0EsV0FBQSxJQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLEVBQUE7WUFDQSxhQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxJQUFBLEdBQUEsRUFBQTtZQUNBO1lBQ0EsZUFBQSxJQUFBLENBQUEsTUFBQSxHQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsUUFBQSxHQUFBOzBCQUNBO3lCQUNBLE1BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBO3dCQUNBO3NCQUNBO1lBQ0EsUUFBQSxNQUFBLElBQUEsQ0FBQSxTQUFBLEVBQUE7cUJBQ0EsTUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBO29CQUNBO0FBQ0E7bUJBQ0EsT0FBQSxHQUFBLEtBQUEsQ0FBQTtZQUNBLE9BQUEsU0FBQSxHQUFBLE1BQUEsQ0FBQSxNQUFBLENBQUE7a0JBQ0E7QUFDQTtZQUNBLEtBQUEsU0FBQSxnQkFBQSxDQUFBLElBQUEsRUFBQSxLQUFBLEVBQUE7WUFDQSxPQUFBLElBQUEsS0FBQSxHQUFBLEdBQUEsR0FBQSxJQUFBO3VCQUNBLFVBQUEsR0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLEtBQUEsRUFBQSxLQUFBLENBQUE7dUJBQ0EsVUFBQSxHQUFBLElBQUE7WUFDQSxhQUFBLElBQUEsQ0FBQSxTQUFBLENBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxHQUFBLEVBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLFVBQUEsQ0FBQTtZQUNBLFlBQUEsQ0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7QUFDQTtZQUNBLE9BQUEsSUFBQSxHQUFBLFVBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTttQkFDQSxJQUFBLEdBQUEsVUFBQSxDQUFBLFVBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQTttQkFDQSxPQUFBLFVBQUEsR0FBQSxLQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQTtrQkFDQTtBQUNBO2lCQUNBLElBQUEsVUFBQSxFQUFBO21CQUNBLFVBQUEsR0FBQSxVQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsT0FBQSxJQUFBLEdBQUEsVUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsT0FBQSxJQUFBLEdBQUEsVUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO2tCQUNBO0FBQ0E7aUJBQ0EsS0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7WUFDQSxPQUFBLElBQUEsS0FBQSxJQUFBLE9BQUEsRUFBQTtxQkFDQSxJQUFBLFNBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsQ0FBQSxFQUFBO3VCQUNBLEVBQUEsQ0FBQSxDQUFBO3VCQUNBLE1BQUEsRUFBQSxDQUFBO3VCQUNBLEtBQUEsR0FBQSxXQUFBLENBQUE7WUFDQSxVQUFBLE1BQUE7dUJBQ0EsSUFBQSxJQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLElBQUEsRUFBQTtZQUNBLGFBQUEsVUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBO1lBQ0EsWUFBQSxNQUFBO3lCQUNBLEdBQUEsSUFBQSxJQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO3dCQUNBO3NCQUNBO1lBQ0EsUUFBQSxNQUFBLElBQUEsS0FBQSxJQUFBLFdBQUEsRUFBQTtZQUNBLFNBQUEsQ0FBQSxJQUFBLElBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsU0FBQSxHQUFBLEdBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsU0FBQSxPQUFBLEdBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQTtZQUNBLFNBQUEsSUFBQSxPQUFBLElBQUEsR0FBQSxFQUFBO3VCQUNBLENBQUEsR0FBQSxnQkFBQSxDQUFBLElBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQTt1QkFDQSxLQUFBLEdBQUEsT0FBQSxDQUFBO1lBQ0EsVUFBQSxNQUFBO3VCQUNBLElBQUEsR0FBQSxFQUFBO3lCQUNBLENBQUEsRUFBQSxDQUFBO3dCQUNBO3VCQUNBLEtBQUEsR0FBQSxNQUFBLENBQUE7c0JBQ0E7cUJBQ0EsT0FBQSxHQUFBLENBQUEsQ0FBQTtZQUNBLFFBQUEsTUFBQTtxQkFDQSxJQUFBLFNBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLENBQUEsQ0FBQSxFQUFBO3VCQUNBLE1BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLENBQUEsRUFBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQTtvQ0FDQSxDQUFBLEVBQUEsQ0FBQSxPQUFBLElBQUEsR0FBQSxJQUFBLE9BQUEsR0FBQSxJQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQTt1QkFDQSxHQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsV0FBQSxDQUFBLElBQUEsSUFBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUE7dUJBQ0EsS0FBQSxHQUFBLE9BQUEsQ0FBQTtZQUNBLFdBQUEsSUFBQSxPQUFBLElBQUEsR0FBQSxFQUFBO1lBQ0EsYUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBLEVBQUE7MkJBQ0EsQ0FBQSxFQUFBLENBQUE7WUFDQSxjQUFBLE1BQUE7MkJBQ0EsaUJBQUEsQ0FBQSxNQUFBLENBQUEsTUFBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBOzBCQUNBO3dCQUNBO1lBQ0EsVUFBQSxNQUFBO3VCQUNBLEdBQUEsSUFBQSxJQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO3NCQUNBO29CQUNBO2tCQUNBO0FBQ0E7WUFDQSxLQUFBLFVBQUEsQ0FBQSxPQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7QUFDQTtpQkFDQSxPQUFBLE1BQUEsQ0FBQTtpQkFDQTtBQUNBO1lBQ0EsR0FBQSxTQUFBLGlCQUFBLENBQUEsS0FBQSxFQUFBO1lBQ0EsS0FBQSxJQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxLQUFBLEdBQUEsRUFBQTttQkFDQSxLQUFBLENBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsQ0FBQTtrQkFDQTtnQkFDQTtBQUNBO1lBQ0EsR0FBQSxTQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUE7WUFDQSxLQUFBLElBQUEsQ0FBQSxDQUFBLElBQUEsRUFBQTtZQUNBLE9BQUEsT0FBQSxDQUFBLENBQUEsSUFBQSxFQUFBLENBQUE7a0JBQ0E7QUFDQTtpQkFDQSxPQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsWUFBQSxFQUFBLEVBQUEsQ0FBQSxDQUFBO2dCQUNBO0FBQ0E7ZUFDQSxTQUFBLFNBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQTtZQUNBLEtBQUEsSUFBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEdBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUE7bUJBQ0EsT0FBQSxLQUFBLENBQUE7a0JBQ0E7QUFDQTtZQUNBLEtBQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTtZQUNBLE9BQUEsSUFBQSxJQUFBLENBQUEsTUFBQSxDQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBO3FCQUNBLE9BQUEsS0FBQSxDQUFBO29CQUNBO2tCQUNBO0FBQ0E7aUJBQ0EsT0FBQSxJQUFBLENBQUE7Z0JBQ0E7QUFDQTtZQUNBO2VBQ0EsSUFBQSxjQUFBLEdBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7QUFDQTtlQUNBLFNBQUEsU0FBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLFVBQUEsRUFBQTtpQkFDQSxJQUFBLFlBQUEsR0FBQSxFQUFBO3FCQUNBLE1BQUEsR0FBQSxJQUFBO3FCQUNBLElBQUEsR0FBQSxJQUFBO3FCQUNBLEtBQUEsR0FBQSxJQUFBLENBQUE7QUFDQTtpQkFDQSxJQUFBLEdBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQTtZQUNBLEtBQUEsT0FBQSxNQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsRUFBQTtZQUNBLE9BQUEsS0FBQSxHQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQUEsQ0FBQTtBQUNBO1lBQ0EsT0FBQSxJQUFBLElBQUEsSUFBQSxJQUFBLENBQUEsR0FBQSxJQUFBLEdBQUEsSUFBQSxFQUFBLEtBQUEsQ0FBQSxHQUFBLElBQUEsY0FBQSxDQUFBLEVBQUE7WUFDQSxTQUFBLE1BQUEsSUFBQSxLQUFBLENBQUEsaUNBQUEsQ0FBQSxDQUFBO29CQUNBO0FBQ0E7bUJBQ0EsSUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxLQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLFFBQUEsQ0FBQSxLQUFBLEVBQUEsVUFBQSxDQUFBLEVBQUE7WUFDQSxTQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLENBQUE7WUFDQSxTQUFBLEtBQUEsQ0FBQSxLQUFBLEdBQUEsU0FBQSxDQUFBLE1BQUEsRUFBQSxLQUFBLENBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxVQUFBLENBQUEsQ0FBQTtZQUNBLFFBQUEsTUFBQSxJQUFBLEtBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQSxFQUFBO1lBQ0EsU0FBQSxJQUFBLEtBQUEsQ0FBQSxNQUFBLEtBQUEsQ0FBQSxFQUFBO3VCQUNBLE1BQUEsSUFBQSxLQUFBLENBQUEsK0JBQUEsR0FBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7c0JBQ0E7WUFDQSxTQUFBLE1BQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUE7cUJBQ0EsSUFBQSxLQUFBLENBQUEsQ0FBQSxJQUFBLE1BQUEsQ0FBQSxDQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsRUFBQSxNQUFBLENBQUEsQ0FBQSxFQUFBLFVBQUEsQ0FBQSxFQUFBO1lBQ0EsV0FBQSxNQUFBLElBQUEsS0FBQSxDQUFBLGlCQUFBLEdBQUEsTUFBQSxDQUFBLENBQUEsR0FBQSxPQUFBLEdBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO3NCQUNBO1lBQ0EsU0FBQSxNQUFBLENBQUEsR0FBQSxHQUFBLEtBQUEsQ0FBQSxDQUFBLENBQUE7cUJBQ0EsT0FBQSxZQUFBLENBQUE7WUFDQSxRQUFBLE1BQUEsSUFBQSxLQUFBLENBQUEsR0FBQSxJQUFBLElBQUEsRUFBQTtxQkFDQSxLQUFBLENBQUEsSUFBQSxHQUFBLENBQUEsTUFBQSxDQUFBLE1BQUEsSUFBQSxDQUFBLE1BQUEsTUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxJQUFBLENBQUEsQ0FBQTtvQkFDQTtBQUNBO1lBQ0EsT0FBQSxZQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBO2tCQUNBO0FBQ0E7WUFDQSxLQUFBLElBQUEsS0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUE7WUFDQSxPQUFBLE1BQUEsSUFBQSxLQUFBLENBQUEsdUJBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7a0JBQ0E7QUFDQTtpQkFDQSxPQUFBLFlBQUEsQ0FBQTtnQkFDQTtBQUNBO1lBQ0EsR0FBQSxTQUFBLFFBQUEsQ0FBQSxLQUFBLEVBQUEsSUFBQSxFQUFBO1lBQ0EsS0FBQSxLQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBO21CQUNBLElBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxLQUFBLENBQUEsQ0FBQSxFQUFBO1lBQ0EsU0FBQSxLQUFBLENBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQTtxQkFDQSxPQUFBLElBQUEsQ0FBQTtvQkFDQTtrQkFDQTtnQkFDQTtBQUNBO2VBQ0EsU0FBQSxRQUFBLENBQUEsS0FBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7WUFDQSxLQUFBLEtBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7WUFDQSxPQUFBLElBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxLQUFBLElBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxJQUFBLEVBQUE7cUJBQ0EsT0FBQSxJQUFBLENBQUE7b0JBQ0E7a0JBQ0E7Z0JBQ0E7QUFDQTtZQUNBLEdBQUEsU0FBQSxzQkFBQSxDQUFBLEdBQUEsRUFBQTtZQUNBLEtBQUEsSUFBQSxLQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsS0FBQSxLQUFBLElBQUEsR0FBQSxJQUFBLEdBQUEsRUFBQTttQkFDQSxLQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsd0JBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLENBQUE7a0JBQ0E7aUJBQ0EsT0FBQSxJQUFBLEdBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxJQUFBLENBQUE7Z0JBQ0E7QUFDQTtZQUNBLEdBQUEsU0FBQSxpQkFBQSxDQUFBLE9BQUEsRUFBQTtZQUNBLEtBQUEsSUFBQSxRQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsS0FBQSxLQUFBLElBQUEsR0FBQSxJQUFBLE9BQUEsQ0FBQSxRQUFBLEVBQUE7WUFDQSxPQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxXQUFBLEdBQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsS0FBQSxHQUFBLGlCQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBO2tCQUNBO1lBQ0EsS0FBQSxPQUFBLGFBQUEsR0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLFdBQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtnQkFDQTtBQUNBO2VBQ0EsS0FBQSxDQUFBLFNBQUEsR0FBQSxTQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO2lCQUNBLE9BQUEsNEJBQUEsR0FBQSxLQUFBLENBQUEsUUFBQSxDQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxLQUFBLEdBQUEsaUJBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxHQUFBLENBQUE7aUJBQ0E7QUFDQTtZQUNBLEdBQUEsSUFBQSxRQUFBLEdBQUEsQ0FBQSxDQUFBO2VBQ0EsS0FBQSxDQUFBLFFBQUEsR0FBQSxTQUFBLElBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO2lCQUNBLFFBQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxLQUFBLElBQUEsT0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQSxFQUFBLFFBQUEsRUFBQSxFQUFBLEVBQUEsQ0FBQTtpQkFDQSxLQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQTtBQUNBO1lBQ0EsS0FBQSxJQUFBLE9BQUEsQ0FBQSxRQUFBLEVBQUE7bUJBQ0EsT0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBLE9BQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLENBQUE7a0JBQ0E7QUFDQTtpQkFDQSxPQUFBLElBQUEsQ0FBQSxZQUFBLENBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQTtpQkFDQTtBQUNBO1lBQ0EsR0FBQSxLQUFBLENBQUEsUUFBQSxHQUFBLFNBQUEsSUFBQSxFQUFBO1lBQ0EsS0FBQSxPQUFBLDBCQUFBLEdBQUEsSUFBQSxHQUFBLGdCQUFBLENBQUE7aUJBQ0E7QUFDQTtZQUNBLEdBQUEsS0FBQSxDQUFBLFFBQUEsR0FBQSxLQUFBLENBQUEsUUFBQSxDQUFBO0FBQ0E7ZUFDQSxLQUFBLENBQUEsWUFBQSxHQUFBLFNBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7aUJBQ0EsSUFBQSxRQUFBLEdBQUEsSUFBQSxDQUFBLFlBQUEsQ0FBQSxPQUFBLENBQUEsQ0FBQTtpQkFDQSxRQUFBLENBQUEsSUFBQSxHQUFBLElBQUEsUUFBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxLQUFBLE9BQUEsSUFBQSxJQUFBLENBQUEsUUFBQSxDQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxDQUFBO2lCQUNBO0FBQ0E7WUFDQSxHQUFBLEtBQUEsQ0FBQSxZQUFBLEdBQUEsU0FBQSxPQUFBLEVBQUE7aUJBQ0EsSUFBQSxHQUFBLEVBQUEsUUFBQSxHQUFBLENBQUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxDQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQSxLQUFBLEdBQUEsSUFBQSxRQUFBLENBQUEsUUFBQSxFQUFBO1lBQ0EsT0FBQSxRQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxZQUFBLENBQUEsUUFBQSxDQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBO2tCQUNBO1lBQ0EsS0FBQSxLQUFBLEdBQUEsSUFBQSxPQUFBLENBQUEsSUFBQSxFQUFBO21CQUNBLFFBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsSUFBQSxRQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQTtrQkFDQTtpQkFDQSxPQUFBLFFBQUEsQ0FBQTtpQkFDQTtBQUNBO1lBQ0EsR0FBQSxTQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUE7aUJBQ0EsT0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLE1BQUEsRUFBQSxNQUFBLENBQUE7WUFDQSxjQUFBLE9BQUEsQ0FBQSxLQUFBLEVBQUEsTUFBQSxDQUFBO1lBQ0EsY0FBQSxPQUFBLENBQUEsUUFBQSxFQUFBLEtBQUEsQ0FBQTtZQUNBLGNBQUEsT0FBQSxDQUFBLEdBQUEsRUFBQSxLQUFBLENBQUE7WUFDQSxjQUFBLE9BQUEsQ0FBQSxRQUFBLEVBQUEsU0FBQSxDQUFBO1lBQ0EsY0FBQSxPQUFBLENBQUEsYUFBQSxFQUFBLFNBQUEsQ0FBQSxDQUFBO2dCQUNBO0FBQ0E7WUFDQSxHQUFBLFNBQUEsWUFBQSxDQUFBLENBQUEsRUFBQTtZQUNBLEtBQUEsT0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxHQUFBLEdBQUEsR0FBQSxDQUFBO2dCQUNBO0FBQ0E7WUFDQSxHQUFBLFNBQUEsYUFBQSxDQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7aUJBQ0EsSUFBQSxNQUFBLEdBQUEsR0FBQSxJQUFBLE9BQUEsQ0FBQSxNQUFBLElBQUEsRUFBQSxDQUFBLENBQUE7aUJBQ0EsSUFBQSxHQUFBLEdBQUEsTUFBQSxHQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsUUFBQSxFQUFBLENBQUE7WUFDQSxLQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxRQUFBLEVBQUEsRUFBQSxDQUFBLENBQUE7aUJBQ0EsT0FBQSxDQUFBLElBQUEsSUFBQSxZQUFBLElBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLFNBQUEsSUFBQSxJQUFBLENBQUEsTUFBQSxJQUFBLEVBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQTtpQkFDQSxPQUFBLEdBQUEsQ0FBQTtnQkFDQTtBQUNBO2VBQ0EsS0FBQSxDQUFBLE9BQUEsR0FBQTtZQUNBLEtBQUEsR0FBQSxFQUFBLFNBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTttQkFDQSxPQUFBLENBQUEsSUFBQSxJQUFBLFdBQUEsR0FBQSxZQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLFdBQUE7bUNBQ0EsUUFBQSxHQUFBLElBQUEsQ0FBQSxDQUFBLEdBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLEdBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUEsTUFBQTttQ0FDQSxXQUFBLEdBQUEsa0JBQUEsQ0FBQTttQkFDQSxLQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLEVBQUEsT0FBQSxDQUFBLENBQUE7WUFDQSxPQUFBLE9BQUEsQ0FBQSxJQUFBLElBQUEsY0FBQSxDQUFBO2tCQUNBO0FBQ0E7WUFDQSxLQUFBLEdBQUEsRUFBQSxTQUFBLElBQUEsRUFBQSxPQUFBLEVBQUE7bUJBQ0EsT0FBQSxDQUFBLElBQUEsSUFBQSxZQUFBLEdBQUEsWUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxJQUFBLEdBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSwwQkFBQSxDQUFBO21CQUNBLEtBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQTtZQUNBLE9BQUEsT0FBQSxDQUFBLElBQUEsSUFBQSxJQUFBLENBQUE7a0JBQ0E7QUFDQTtpQkFDQSxHQUFBLEVBQUEsYUFBQTtZQUNBLEtBQUEsR0FBQSxFQUFBLFNBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTttQkFDQSxJQUFBLEdBQUEsR0FBQSxDQUFBLFFBQUEsRUFBQSxFQUFBLEVBQUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQSxFQUFBLFNBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQTttQkFDQSxLQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxLQUFBLEVBQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxPQUFBLElBQUEsUUFBQSxHQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsYUFBQSxDQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsT0FBQSxRQUFBLENBQUEsSUFBQSxHQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUE7WUFDQSxPQUFBLFFBQUEsQ0FBQSxRQUFBLEdBQUEsR0FBQSxDQUFBLFFBQUEsQ0FBQTtrQkFDQTtBQUNBO1lBQ0EsS0FBQSxHQUFBLEVBQUEsU0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO21CQUNBLElBQUEsR0FBQSxHQUFBLENBQUEsSUFBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsRUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLENBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7bUJBQ0EsS0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsS0FBQSxFQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsT0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBO1lBQ0EsT0FBQSxJQUFBLENBQUEsT0FBQSxDQUFBLFNBQUEsRUFBQTtZQUNBLFNBQUEsT0FBQSxDQUFBLElBQUEsSUFBQSxTQUFBLEdBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxXQUFBLENBQUE7b0JBQ0E7a0JBQ0E7QUFDQTtZQUNBLEtBQUEsSUFBQSxFQUFBLFNBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtZQUNBLE9BQUEsT0FBQSxDQUFBLElBQUEsSUFBQSxLQUFBLENBQUEsT0FBQSxJQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUEsRUFBQSxHQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUE7a0JBQ0E7QUFDQTtZQUNBLEtBQUEsSUFBQSxFQUFBLFNBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTttQkFDQSxPQUFBLENBQUEsSUFBQSxJQUFBLFlBQUEsR0FBQSxZQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLGFBQUEsQ0FBQTtrQkFDQTtBQUNBO1lBQ0EsS0FBQSxJQUFBLEVBQUEsU0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO1lBQ0EsT0FBQSxPQUFBLENBQUEsSUFBQSxJQUFBLEtBQUEsQ0FBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxHQUFBLENBQUEsQ0FBQTtrQkFDQTtBQUNBO2lCQUNBLEdBQUEsRUFBQSxZQUFBO0FBQ0E7aUJBQ0EsR0FBQSxFQUFBLFlBQUE7aUJBQ0E7QUFDQTtZQUNBLEdBQUEsU0FBQSxZQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtpQkFDQSxPQUFBLENBQUEsSUFBQSxJQUFBLFlBQUEsR0FBQSxZQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLGFBQUEsQ0FBQTtnQkFDQTtBQUNBO1lBQ0EsR0FBQSxTQUFBLEtBQUEsQ0FBQSxDQUFBLEVBQUE7WUFDQSxLQUFBLE9BQUEsTUFBQSxHQUFBLENBQUEsR0FBQSxJQUFBLENBQUE7Z0JBQ0E7QUFDQTtlQUNBLEtBQUEsQ0FBQSxJQUFBLEdBQUEsU0FBQSxRQUFBLEVBQUEsT0FBQSxFQUFBO2lCQUNBLElBQUEsSUFBQSxDQUFBO1lBQ0EsS0FBQSxLQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsUUFBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxFQUFBO1lBQ0EsT0FBQSxJQUFBLEdBQUEsS0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7bUJBQ0EsSUFBQSxJQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsT0FBQSxDQUFBLENBQUE7a0JBQ0E7aUJBQ0EsT0FBQSxPQUFBLENBQUE7aUJBQ0E7QUFDQTtlQUNBLEtBQUEsQ0FBQSxLQUFBLEdBQUEsU0FBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsRUFBQTtZQUNBLEtBQUEsT0FBQSxHQUFBLE9BQUEsSUFBQSxFQUFBLENBQUE7WUFDQSxLQUFBLE9BQUEsU0FBQSxDQUFBLE1BQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLE9BQUEsQ0FBQSxXQUFBLElBQUEsRUFBQSxDQUFBLENBQUE7aUJBQ0E7QUFDQTtZQUNBLEdBQUEsS0FBQSxDQUFBLEtBQUEsR0FBQSxFQUFBLENBQUE7QUFDQTtlQUNBLEtBQUEsQ0FBQSxRQUFBLEdBQUEsU0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO1lBQ0EsS0FBQSxPQUFBLENBQUEsSUFBQSxFQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxFQUFBLENBQUEsQ0FBQSxPQUFBLENBQUEsYUFBQSxFQUFBLE9BQUEsQ0FBQSxVQUFBLEVBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7aUJBQ0E7QUFDQTtlQUNBLEtBQUEsQ0FBQSxPQUFBLEdBQUEsU0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBO1lBQ0EsS0FBQSxPQUFBLEdBQUEsT0FBQSxJQUFBLEVBQUEsQ0FBQTtpQkFDQSxJQUFBLEdBQUEsR0FBQSxLQUFBLENBQUEsUUFBQSxDQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQTtpQkFDQSxJQUFBLFFBQUEsR0FBQSxJQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO0FBQ0E7aUJBQ0EsSUFBQSxRQUFBLEVBQUE7WUFDQSxPQUFBLElBQUEsUUFBQSxHQUFBLFFBQUEsQ0FBQSxRQUFBLENBQUE7WUFDQSxPQUFBLEtBQUEsSUFBQSxJQUFBLElBQUEsUUFBQSxFQUFBO1lBQ0EsU0FBQSxPQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxRQUFBLENBQUE7b0JBQ0E7bUJBQ0EsT0FBQSxRQUFBLENBQUE7a0JBQ0E7QUFDQTtZQUNBLEtBQUEsUUFBQSxHQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsVUFBQSxDQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsQ0FBQTtpQkFDQSxPQUFBLElBQUEsQ0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsUUFBQSxDQUFBO2lCQUNBO2NBQ0EsRUFBQSxPQUFBLENBQUEsQ0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0WkE7YUFDQSxDQUFBLFVBQUEsS0FBQSxFQUFBO1lBQ0EsR0FBQSxLQUFBLENBQUEsUUFBQSxHQUFBLFVBQUEsT0FBQSxFQUFBLElBQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBO1lBQ0EsS0FBQSxPQUFBLEdBQUEsT0FBQSxJQUFBLEVBQUEsQ0FBQTtpQkFDQSxJQUFBLENBQUEsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxJQUFBLElBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUEsSUFBQSxDQUFBLENBQUEsR0FBQSxRQUFBLENBQUE7WUFDQSxLQUFBLElBQUEsQ0FBQSxPQUFBLEdBQUEsT0FBQSxJQUFBLEVBQUEsQ0FBQTtZQUNBLEtBQUEsSUFBQSxDQUFBLElBQUEsR0FBQSxJQUFBLElBQUEsRUFBQSxDQUFBO2lCQUNBLElBQUEsQ0FBQSxRQUFBLEdBQUEsT0FBQSxDQUFBLFFBQUEsSUFBQSxFQUFBLENBQUE7aUJBQ0EsSUFBQSxDQUFBLElBQUEsR0FBQSxPQUFBLENBQUEsSUFBQSxJQUFBLEVBQUEsQ0FBQTtZQUNBLEtBQUEsSUFBQSxDQUFBLEdBQUEsR0FBQSxFQUFBLENBQUE7aUJBQ0E7QUFDQTtZQUNBLEdBQUEsS0FBQSxDQUFBLFFBQUEsQ0FBQSxTQUFBLEdBQUE7WUFDQTtZQUNBLEtBQUEsQ0FBQSxFQUFBLFVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUEsRUFBQSxPQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQ0E7WUFDQTtpQkFDQSxDQUFBLEVBQUEsV0FBQTtBQUNBO1lBQ0E7aUJBQ0EsQ0FBQSxFQUFBLGNBQUE7QUFDQTtpQkFDQSxNQUFBLEVBQUEsU0FBQSxNQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUE7WUFDQSxPQUFBLE9BQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxFQUFBLFFBQUEsSUFBQSxFQUFBLEVBQUEsTUFBQSxDQUFBLENBQUE7a0JBQ0E7QUFDQTtZQUNBO2lCQUNBLEVBQUEsRUFBQSxVQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsTUFBQSxFQUFBO21CQUNBLE9BQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLE1BQUEsQ0FBQSxDQUFBO2tCQUNBO0FBQ0E7WUFDQTtZQUNBLEtBQUEsRUFBQSxFQUFBLFNBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQTttQkFDQSxJQUFBLE9BQUEsR0FBQSxJQUFBLENBQUEsUUFBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBO0FBQ0E7WUFDQTttQkFDQSxJQUFBLFFBQUEsR0FBQSxRQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO21CQUNBLElBQUEsT0FBQSxDQUFBLFFBQUEsSUFBQSxPQUFBLENBQUEsSUFBQSxJQUFBLFFBQUEsRUFBQTtZQUNBLFNBQUEsT0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBO29CQUNBO0FBQ0E7WUFDQSxPQUFBLElBQUEsT0FBQSxRQUFBLElBQUEsUUFBQSxFQUFBO1lBQ0EsU0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsRUFBQTtZQUNBLFdBQUEsTUFBQSxJQUFBLEtBQUEsQ0FBQSx3QkFBQSxDQUFBLENBQUE7c0JBQ0E7WUFDQSxTQUFBLFFBQUEsR0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBLEVBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBO29CQUNBO0FBQ0E7bUJBQ0EsSUFBQSxDQUFBLFFBQUEsRUFBQTtxQkFDQSxPQUFBLElBQUEsQ0FBQTtvQkFDQTtBQUNBO1lBQ0E7bUJBQ0EsSUFBQSxDQUFBLFFBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxJQUFBLEdBQUEsUUFBQSxDQUFBO0FBQ0E7WUFDQSxPQUFBLElBQUEsT0FBQSxDQUFBLElBQUEsRUFBQTtZQUNBO3FCQUNBLElBQUEsQ0FBQSxRQUFBLENBQUEsU0FBQSxFQUFBLFFBQUEsQ0FBQSxTQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsU0FBQSxLQUFBLEdBQUEsSUFBQSxPQUFBLENBQUEsSUFBQSxFQUFBO3VCQUNBLElBQUEsQ0FBQSxRQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO1lBQ0EsYUFBQSxRQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsSUFBQSxDQUFBLFNBQUEsS0FBQSxTQUFBLElBQUEsUUFBQSxDQUFBLFNBQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsUUFBQSxDQUFBLFNBQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQTt3QkFDQTtzQkFDQTtZQUNBLFNBQUEsUUFBQSxHQUFBLHdCQUFBLENBQUEsUUFBQSxFQUFBLE9BQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLFFBQUE7WUFDQSxXQUFBLElBQUEsQ0FBQSxTQUFBLEVBQUEsSUFBQSxDQUFBLGFBQUEsRUFBQSxRQUFBLENBQUEsU0FBQSxDQUFBLENBQUE7b0JBQ0E7bUJBQ0EsSUFBQSxDQUFBLFFBQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQSxRQUFBLEdBQUEsUUFBQSxDQUFBO0FBQ0E7bUJBQ0EsT0FBQSxRQUFBLENBQUE7a0JBQ0E7QUFDQTtZQUNBO2lCQUNBLEVBQUEsRUFBQSxTQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLE1BQUEsRUFBQTttQkFDQSxJQUFBLE9BQUEsR0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBLE1BQUEsRUFBQSxRQUFBLENBQUEsQ0FBQTttQkFDQSxJQUFBLENBQUEsT0FBQSxFQUFBO3FCQUNBLE9BQUEsRUFBQSxDQUFBO29CQUNBO0FBQ0E7bUJBQ0EsT0FBQSxPQUFBLENBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsTUFBQSxDQUFBLENBQUE7a0JBQ0E7QUFDQTtZQUNBO2lCQUNBLEVBQUEsRUFBQSxTQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsT0FBQSxFQUFBO21CQUNBLElBQUEsSUFBQSxHQUFBLE9BQUEsQ0FBQSxPQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0E7WUFDQSxPQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsSUFBQSxDQUFBLEVBQUE7cUJBQ0EsT0FBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7WUFDQSxTQUFBLE9BQUE7b0JBQ0E7QUFDQTtZQUNBLE9BQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7cUJBQ0EsT0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtxQkFDQSxPQUFBLENBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQTtZQUNBLFNBQUEsT0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBO29CQUNBO2tCQUNBO0FBQ0E7WUFDQTtZQUNBLEtBQUEsQ0FBQSxFQUFBLFNBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBO21CQUNBLElBQUEsSUFBQSxDQUFBO0FBQ0E7bUJBQ0EsSUFBQSxPQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLE1BQUEsS0FBQSxDQUFBLEVBQUE7cUJBQ0EsT0FBQSxLQUFBLENBQUE7b0JBQ0E7QUFDQTtZQUNBLE9BQUEsSUFBQSxPQUFBLEdBQUEsSUFBQSxVQUFBLEVBQUE7cUJBQ0EsR0FBQSxHQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsRUFBQSxHQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7b0JBQ0E7QUFDQTtZQUNBLE9BQUEsSUFBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUE7QUFDQTtZQUNBLE9BQUEsSUFBQSxDQUFBLFFBQUEsSUFBQSxJQUFBLElBQUEsR0FBQSxFQUFBO3FCQUNBLEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxPQUFBLEdBQUEsSUFBQSxRQUFBLElBQUEsR0FBQSxHQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsTUFBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7b0JBQ0E7QUFDQTttQkFDQSxPQUFBLElBQUEsQ0FBQTtrQkFDQTtBQUNBO1lBQ0E7aUJBQ0EsQ0FBQSxFQUFBLFNBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsV0FBQSxFQUFBO1lBQ0EsT0FBQSxJQUFBLEtBQUE7WUFDQSxXQUFBLEtBQUEsR0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQTtZQUNBLFdBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUEsV0FBQSxDQUFBO1lBQ0EsV0FBQSxVQUFBLEdBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxRQUFBO3VCQUNBLEVBQUEsR0FBQSxJQUFBLENBQUE7QUFDQTtZQUNBLE9BQUEsSUFBQSxHQUFBLEtBQUEsR0FBQSxJQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBO3FCQUNBLEdBQUEsR0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLFFBQUEsTUFBQTtZQUNBLFNBQUEsS0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxHQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxFQUFBLEVBQUE7WUFDQSxXQUFBLEtBQUEsR0FBQSxXQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxVQUFBLENBQUEsQ0FBQTtZQUNBLFdBQUEsSUFBQSxLQUFBLEtBQUEsU0FBQSxFQUFBO3lCQUNBLEVBQUEsR0FBQSxHQUFBLENBQUE7eUJBQ0EsR0FBQSxHQUFBLEtBQUEsQ0FBQTtZQUNBLFlBQUEsTUFBQTt5QkFDQSxHQUFBLEdBQUEsRUFBQSxDQUFBO3dCQUNBO3NCQUNBO29CQUNBO0FBQ0E7WUFDQSxPQUFBLElBQUEsV0FBQSxJQUFBLENBQUEsR0FBQSxFQUFBO3FCQUNBLE9BQUEsS0FBQSxDQUFBO29CQUNBO0FBQ0E7bUJBQ0EsSUFBQSxDQUFBLFdBQUEsSUFBQSxPQUFBLEdBQUEsSUFBQSxVQUFBLEVBQUE7WUFDQSxTQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBLENBQUE7WUFDQSxTQUFBLEdBQUEsR0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsUUFBQSxDQUFBLENBQUE7WUFDQSxTQUFBLEdBQUEsQ0FBQSxHQUFBLEVBQUEsQ0FBQTtvQkFDQTtBQUNBO21CQUNBLE9BQUEsR0FBQSxDQUFBO2tCQUNBO0FBQ0E7WUFDQTtpQkFDQSxDQUFBLEVBQUEsU0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLFFBQUEsRUFBQSxXQUFBLEVBQUE7bUJBQ0EsSUFBQSxHQUFBLEdBQUEsS0FBQTt1QkFDQSxDQUFBLEdBQUEsSUFBQTt1QkFDQSxLQUFBLEdBQUEsS0FBQTtZQUNBLFdBQUEsVUFBQSxHQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsUUFBQSxDQUFBO0FBQ0E7WUFDQSxPQUFBLEtBQUEsSUFBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLE1BQUEsR0FBQSxDQUFBLEVBQUEsQ0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTtZQUNBLFNBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtxQkFDQSxHQUFBLEdBQUEsV0FBQSxDQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUEsVUFBQSxDQUFBLENBQUE7WUFDQSxTQUFBLElBQUEsR0FBQSxLQUFBLFNBQUEsRUFBQTt1QkFDQSxLQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsV0FBQSxNQUFBO3NCQUNBO29CQUNBO0FBQ0E7bUJBQ0EsSUFBQSxDQUFBLEtBQUEsRUFBQTtZQUNBLFNBQUEsT0FBQSxDQUFBLFdBQUEsSUFBQSxLQUFBLEdBQUEsRUFBQSxDQUFBO29CQUNBO0FBQ0E7bUJBQ0EsSUFBQSxDQUFBLFdBQUEsSUFBQSxPQUFBLEdBQUEsSUFBQSxVQUFBLEVBQUE7WUFDQSxTQUFBLEdBQUEsR0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsUUFBQSxDQUFBLENBQUE7b0JBQ0E7QUFDQTttQkFDQSxPQUFBLEdBQUEsQ0FBQTtrQkFDQTtBQUNBO1lBQ0E7WUFDQSxLQUFBLEVBQUEsRUFBQSxTQUFBLElBQUEsRUFBQSxFQUFBLEVBQUEsUUFBQSxFQUFBLElBQUEsRUFBQSxJQUFBLEVBQUE7bUJBQ0EsSUFBQSxPQUFBLEdBQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUE7QUFDQTtZQUNBLE9BQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsSUFBQSxDQUFBO21CQUNBLElBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxjQUFBLENBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLEVBQUEsSUFBQSxDQUFBLENBQUEsRUFBQSxFQUFBLEVBQUEsUUFBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLE9BQUEsSUFBQSxDQUFBLE9BQUEsQ0FBQSxVQUFBLEdBQUEsT0FBQSxDQUFBO0FBQ0E7bUJBQ0EsT0FBQSxLQUFBLENBQUE7a0JBQ0E7QUFDQTtZQUNBO2lCQUNBLEVBQUEsRUFBQSxTQUFBLElBQUEsRUFBQSxFQUFBLEVBQUEsUUFBQSxFQUFBO1lBQ0EsT0FBQSxJQUFBLElBQUEsQ0FBQSxPQUFBLENBQUEsYUFBQSxFQUFBO1lBQ0EsU0FBQSxNQUFBLElBQUEsS0FBQSxDQUFBLDJCQUFBLENBQUEsQ0FBQTtvQkFDQTttQkFDQSxPQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsRUFBQSxJQUFBLENBQUEsT0FBQSxDQUFBLENBQUEsTUFBQSxDQUFBLEVBQUEsRUFBQSxRQUFBLENBQUEsQ0FBQTtrQkFDQTtBQUNBO1lBQ0E7WUFDQSxLQUFBLENBQUEsRUFBQSxTQUFBLENBQUEsRUFBQSxFQUFBLElBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxDQUFBLEVBQUE7QUFDQTtpQkFDQSxFQUFBLEVBQUEsV0FBQSxFQUFBLElBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQSxDQUFBLE9BQUEsQ0FBQSxDQUFBLEVBQUE7QUFDQTtZQUNBO1lBQ0EsS0FBQSxFQUFBLEVBQUEsU0FBQSxJQUFBLEVBQUEsR0FBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsS0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUE7WUFDQSxPQUFBLElBQUEsVUFBQTt1QkFDQSxFQUFBLEdBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBO3VCQUNBLE1BQUEsR0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBO0FBQ0E7WUFDQSxPQUFBLElBQUEsT0FBQSxNQUFBLElBQUEsVUFBQSxFQUFBO3FCQUNBLElBQUEsUUFBQSxFQUFBO3VCQUNBLE9BQUEsSUFBQSxDQUFBO1lBQ0EsVUFBQSxNQUFBO1lBQ0EsV0FBQSxVQUFBLEdBQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxJQUFBLElBQUEsQ0FBQSxRQUFBLElBQUEsSUFBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBLElBQUEsSUFBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsU0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQTt1QkFDQSxPQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsTUFBQSxFQUFBLEVBQUEsRUFBQSxRQUFBLEVBQUEsVUFBQSxDQUFBLFNBQUEsQ0FBQSxLQUFBLEVBQUEsR0FBQSxDQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7c0JBQ0E7b0JBQ0E7QUFDQTttQkFDQSxPQUFBLE1BQUEsQ0FBQTtrQkFDQTtBQUNBO1lBQ0E7aUJBQ0EsRUFBQSxFQUFBLFNBQUEsSUFBQSxFQUFBLEdBQUEsRUFBQSxRQUFBLEVBQUE7bUJBQ0EsSUFBQSxFQUFBLEdBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUE7bUJBQ0EsSUFBQSxNQUFBLEdBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLENBQUEsQ0FBQTtBQUNBO1lBQ0EsT0FBQSxJQUFBLE9BQUEsTUFBQSxJQUFBLFVBQUEsRUFBQTtZQUNBLFNBQUEsT0FBQSxJQUFBLENBQUEsRUFBQSxDQUFBLGNBQUEsQ0FBQSxNQUFBLENBQUEsSUFBQSxDQUFBLEVBQUEsQ0FBQSxDQUFBLEVBQUEsRUFBQSxFQUFBLFFBQUEsQ0FBQSxDQUFBO29CQUNBO0FBQ0E7bUJBQ0EsT0FBQSxNQUFBLENBQUE7a0JBQ0E7QUFDQTtpQkFDQSxHQUFBLEVBQUEsU0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUE7bUJBQ0EsSUFBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTttQkFDQSxJQUFBLENBQUEsRUFBQTtZQUNBLFNBQUEsSUFBQSxDQUFBLFNBQUEsR0FBQSxJQUFBLENBQUE7cUJBQ0EsQ0FBQSxDQUFBLE9BQUEsRUFBQSxRQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsQ0FBQSxDQUFBO1lBQ0EsU0FBQSxJQUFBLENBQUEsU0FBQSxHQUFBLEtBQUEsQ0FBQTtvQkFDQTtrQkFDQTtBQUNBO1lBQ0EsSUFBQSxDQUFBO0FBQ0E7WUFDQTtlQUNBLFNBQUEsV0FBQSxDQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsVUFBQSxFQUFBO2lCQUNBLElBQUEsR0FBQSxDQUFBO0FBQ0E7WUFDQSxLQUFBLElBQUEsS0FBQSxJQUFBLE9BQUEsS0FBQSxJQUFBLFFBQUEsRUFBQTtBQUNBO1lBQ0EsT0FBQSxJQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxTQUFBLEVBQUE7WUFDQSxTQUFBLEdBQUEsR0FBQSxLQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7QUFDQTtZQUNBO1lBQ0EsUUFBQSxNQUFBLElBQUEsVUFBQSxJQUFBLEtBQUEsQ0FBQSxHQUFBLElBQUEsT0FBQSxLQUFBLENBQUEsR0FBQSxJQUFBLFVBQUEsRUFBQTtxQkFDQSxHQUFBLEdBQUEsS0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQTtvQkFDQTtrQkFDQTtBQUNBO2lCQUNBLE9BQUEsR0FBQSxDQUFBO2dCQUNBO0FBQ0E7WUFDQSxHQUFBLFNBQUEsd0JBQUEsQ0FBQSxRQUFBLEVBQUEsSUFBQSxFQUFBLFFBQUEsRUFBQSxTQUFBLEVBQUEsYUFBQSxFQUFBLFNBQUEsRUFBQTtZQUNBLEtBQUEsU0FBQSxlQUFBLEdBQUEsRUFDQSxLQUFBLGVBQUEsQ0FBQSxTQUFBLEdBQUEsUUFBQSxDQUFBO1lBQ0EsS0FBQSxTQUFBLGFBQUEsR0FBQSxFQUNBLEtBQUEsYUFBQSxDQUFBLFNBQUEsR0FBQSxRQUFBLENBQUEsSUFBQSxDQUFBO2lCQUNBLElBQUEsR0FBQSxDQUFBO1lBQ0EsS0FBQSxJQUFBLE9BQUEsR0FBQSxJQUFBLGVBQUEsRUFBQSxDQUFBO1lBQ0EsS0FBQSxPQUFBLENBQUEsSUFBQSxHQUFBLElBQUEsYUFBQSxFQUFBLENBQUE7WUFDQSxLQUFBLE9BQUEsQ0FBQSxRQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsS0FBQSxPQUFBLENBQUEsR0FBQSxHQUFBLEVBQUEsQ0FBQTtBQUNBO1lBQ0EsS0FBQSxTQUFBLEdBQUEsU0FBQSxJQUFBLEVBQUEsQ0FBQTtZQUNBLEtBQUEsT0FBQSxDQUFBLFNBQUEsR0FBQSxTQUFBLENBQUE7WUFDQSxLQUFBLE9BQUEsQ0FBQSxRQUFBLEdBQUEsU0FBQSxDQUFBO1lBQ0EsS0FBQSxLQUFBLEdBQUEsSUFBQSxJQUFBLEVBQUE7WUFDQSxPQUFBLElBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLEVBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQTtrQkFDQTtZQUNBLEtBQUEsS0FBQSxHQUFBLElBQUEsU0FBQSxFQUFBO21CQUNBLE9BQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO2tCQUNBO0FBQ0E7WUFDQSxLQUFBLGFBQUEsR0FBQSxhQUFBLElBQUEsRUFBQSxDQUFBO1lBQ0EsS0FBQSxPQUFBLENBQUEsYUFBQSxHQUFBLGFBQUEsQ0FBQTtZQUNBLEtBQUEsS0FBQSxHQUFBLElBQUEsUUFBQSxFQUFBO1lBQ0EsT0FBQSxJQUFBLENBQUEsYUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxRQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7a0JBQ0E7WUFDQSxLQUFBLEtBQUEsR0FBQSxJQUFBLGFBQUEsRUFBQTttQkFDQSxPQUFBLENBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLGFBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQTtrQkFDQTtBQUNBO2lCQUNBLE9BQUEsT0FBQSxDQUFBO2dCQUNBO0FBQ0E7ZUFDQSxJQUFBLElBQUEsR0FBQSxJQUFBO21CQUNBLEdBQUEsR0FBQSxJQUFBO21CQUNBLEdBQUEsR0FBQSxJQUFBO21CQUNBLEtBQUEsR0FBQSxLQUFBO21CQUNBLEtBQUEsR0FBQSxLQUFBO21CQUNBLE1BQUEsR0FBQSxXQUFBLENBQUE7QUFDQTtZQUNBLEdBQUEsU0FBQSxjQUFBLENBQUEsR0FBQSxFQUFBO1lBQ0EsS0FBQSxPQUFBLE1BQUEsQ0FBQSxDQUFBLEdBQUEsS0FBQSxJQUFBLElBQUEsR0FBQSxLQUFBLFNBQUEsSUFBQSxFQUFBLEdBQUEsR0FBQSxDQUFBLENBQUE7Z0JBQ0E7QUFDQTtZQUNBLEdBQUEsU0FBQSxXQUFBLENBQUEsR0FBQSxFQUFBO1lBQ0EsS0FBQSxHQUFBLEdBQUEsY0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQSxPQUFBLE1BQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBO1lBQ0EsT0FBQSxHQUFBO1lBQ0EsVUFBQSxPQUFBLENBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQTtZQUNBLFVBQUEsT0FBQSxDQUFBLEdBQUEsRUFBQSxNQUFBLENBQUE7WUFDQSxVQUFBLE9BQUEsQ0FBQSxHQUFBLEVBQUEsTUFBQSxDQUFBO1lBQ0EsVUFBQSxPQUFBLENBQUEsS0FBQSxFQUFBLE9BQUEsQ0FBQTtZQUNBLFVBQUEsT0FBQSxDQUFBLEtBQUEsRUFBQSxRQUFBLENBQUE7WUFDQSxPQUFBLEdBQUEsQ0FBQTtnQkFDQTtBQUNBO2VBQ0EsSUFBQSxPQUFBLEdBQUEsS0FBQSxDQUFBLE9BQUEsSUFBQSxTQUFBLENBQUEsRUFBQTtZQUNBLEtBQUEsT0FBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFFBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLEtBQUEsZ0JBQUEsQ0FBQTtZQUNBLElBQUEsQ0FBQTtBQUNBO2NBQ0EsRUFBQSxPQUFBLENBQUEsQ0FBQSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNyVUE7QUFDQTtZQUNBLElBQUEsS0FBQSxHQUFBRixRQUFBLENBQUE7WUFDQSxLQUFBLENBQUEsUUFBQSxHQUFBQyxRQUFBLENBQUEsUUFBQSxDQUFBO1lBQ0EsS0FBQSxDQUFBLFFBQUEsR0FBQSxLQUFBLENBQUEsUUFBQSxDQUFBO1lBQ0EsSUFBQSxLQUFBLEdBQUEsS0FBQTs7OztBQ3BCQSw2QkFBQSwyS0FBQTs7OztBQ0FBLDZCQUFBLEVBQUE7O1lDRUEsSUFBQSxvQkFBQSxHQUFBLE1BQUEsQ0FBQSxTQUFBLENBQUEsY0FBQSxDQUFBO0FBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO0FBQ0E7WUFDQSxVQUFBLENBQUEsS0FBQSxHQUFBLFVBQUE7WUFDQSxTQUFBLFNBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO1lBQ0EsRUFBQSxJQUFBLFNBQUEsQ0FBQSxNQUFBLEtBQUEsQ0FBQSxFQUFBO1lBQ0EsSUFBQSxJQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxJQUFBLEtBQUEsSUFBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsTUFBQSxFQUFBLENBQUEsRUFBQSxFQUFBO1lBQ0EsTUFBQSxLQUFBLEdBQUEsU0FBQSxDQUFBLEtBQUEsRUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7WUFDQSxJQUFBLE9BQUEsS0FBQSxDQUFBO1lBQ0EsR0FBQTtBQUNBO1lBQ0EsRUFBQSxLQUFBLElBQUEsR0FBQSxJQUFBLENBQUEsRUFBQTtZQUNBLElBQUEsSUFBQSxHQUFBLEtBQUEsT0FBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsRUFBQSxDQUFBO1lBQ0EsTUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLElBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxFQUFBLE1BQUEsQ0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsRUFBQSxDQUFBLENBQUE7WUFDQSxLQUFBLE1BQUEsSUFBQSxHQUFBLEtBQUEsT0FBQSxFQUFBO1lBQ0EsTUFBQSxJQUFBLElBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxNQUFBLElBQUEsR0FBQSxJQUFBLElBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxHQUFBLElBQUEsR0FBQSxHQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsTUFBQSxJQUFBLElBQUEsR0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxNQUFBLElBQUEsR0FBQSxJQUFBLElBQUEsSUFBQSxDQUFBLElBQUEsQ0FBQSxNQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsR0FBQSxHQUFBLElBQUEsR0FBQSxHQUFBLEdBQUEsSUFBQSxDQUFBO1lBQ0EsTUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsSUFBQSxHQUFBLElBQUEsQ0FBQTtZQUNBLEtBQUEsTUFBQTtZQUNBLE1BQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQTtZQUNBLEtBQUE7WUFDQSxHQUFBO0FBQ0E7WUFDQSxFQUFBLE9BQUEsQ0FBQSxDQUFBO1lBQ0EsQ0FDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQSxVQUFBLENBQUEsT0FBQSxHQUFBLFlBQUE7WUFDQSxTQUFBLGlCQUFBLENBQUEsR0FBQSxFQUFBLFFBQUEsRUFBQTtZQUNBLEVBQUEsSUFBQSxXQUFBLEdBQUEsRUFBQSxFQUFBLFNBQUEsRUFBQSxPQUFBLEdBQUEsRUFBQSxFQUFBLGFBQUEsR0FBQSxLQUFBLENBQUEsT0FBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBO1lBQ0EsRUFBQSxLQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsR0FBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTtZQUNBLElBQUEsU0FBQSxHQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLElBQUEsSUFBQSxDQUFBLFNBQUEsRUFBQSxTQUFBO1lBQ0EsSUFBQSxhQUFBLElBQUEsUUFBQSxDQUFBLENBQUEsQ0FBQSxLQUFBLFNBQUEsR0FBQSxVQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLElBQUEsV0FBQSxHQUFBLFdBQUEsR0FBQSxPQUFBLEdBQUEsU0FBQSxDQUFBO1lBQ0EsSUFBQSxPQUFBLEdBQUEsR0FBQSxDQUFBO1lBQ0EsR0FBQTtZQUNBLEVBQUEsT0FBQSxXQUFBLENBQUE7WUFDQSxDQUFBO1lBQ0EsU0FBQSxrQkFBQSxDQUFBLEdBQUEsRUFBQTtZQUNBLEVBQUEsSUFBQSxXQUFBLEdBQUEsRUFBQSxFQUFBLE9BQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxFQUFBLEtBQUEsSUFBQSxHQUFBLElBQUEsR0FBQSxFQUFBO1lBQ0EsSUFBQSxJQUFBLEdBQUEsSUFBQSxHQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsb0JBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxFQUFBLEdBQUEsQ0FBQSxFQUFBO1lBQ0EsTUFBQSxXQUFBLEdBQUEsV0FBQSxHQUFBLE9BQUEsR0FBQSxHQUFBLENBQUE7WUFDQSxNQUFBLE9BQUEsR0FBQSxHQUFBLENBQUE7WUFDQSxLQUFBO1lBQ0EsR0FBQTtZQUNBLEVBQUEsT0FBQSxXQUFBLENBQUE7WUFDQSxDQUFBO1lBQ0EsU0FBQSxXQUFBLENBQUEsR0FBQSxFQUFBLFFBQUEsRUFBQTtZQUNBLEVBQUEsSUFBQSxLQUFBLENBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBO1lBQ0EsSUFBQSxPQUFBLGlCQUFBLENBQUEsR0FBQSxFQUFBLFFBQUEsQ0FBQSxDQUFBO1lBQ0EsR0FBQSxNQUFBLElBQUEsR0FBQSxJQUFBLE9BQUEsR0FBQSxLQUFBLFFBQUEsRUFBQTtZQUNBLElBQUEsT0FBQSxrQkFBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsR0FBQSxNQUFBO1lBQ0EsSUFBQSxPQUFBLEdBQUEsSUFBQSxFQUFBLENBQUE7WUFDQSxHQUFBO1lBQ0EsQ0FBQTtBQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO0FBQ0E7WUFDQSxVQUFBLENBQUEsS0FBQSxHQUFBLFVBQUE7WUFDQSxTQUFBLFNBQUEsQ0FBQSxHQUFBLEVBQUE7WUFDQSxFQUFBLElBQUEsQ0FBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLENBQUE7WUFDQSxFQUFBLElBQUEsT0FBQSxHQUFBLEtBQUEsUUFBQSxFQUFBO1lBQ0EsSUFBQSxJQUFBLEdBQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxJQUFBLEtBQUEsSUFBQSxLQUFBLElBQUEsR0FBQSxFQUFBO1lBQ0E7WUFDQSxNQUFBLElBQUEsb0JBQUEsQ0FBQSxJQUFBLENBQUEsR0FBQSxFQUFBLEtBQUEsQ0FBQSxFQUFBO1lBQ0EsUUFBQSxHQUFBLEdBQUEsR0FBQSxHQUFBLEtBQUEsR0FBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxHQUFBLEdBQUEsQ0FBQTtZQUNBLE9BQUE7WUFDQSxLQUFBO1lBQ0EsSUFBQSxPQUFBLEdBQUEsQ0FBQTtZQUNBLEdBQUEsTUFBQTtZQUNBLElBQUEsT0FBQSxHQUFBLEdBQUEsRUFBQSxDQUFBO1lBQ0EsR0FBQTtZQUNBLENBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQSxVQUFBLENBQUEsSUFBQSxHQUFBLFNBQUE7WUFDQSxTQUFBLFFBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUE7WUFDQSxFQUFBLElBQUEsR0FBQSxLQUFBLEtBQUEsSUFBQSxHQUFBLElBQUEsSUFBQSxJQUFBLENBQUEsR0FBQSxLQUFBLEdBQUEsS0FBQSxPQUFBLElBQUEsR0FBQSxLQUFBLE9BQUEsQ0FBQSxFQUFBO1lBQ0EsSUFBQSxPQUFBLEVBQUEsQ0FBQTtZQUNBLEdBQUE7WUFDQSxFQUFBLElBQUEsR0FBQSxLQUFBLElBQUEsRUFBQTtZQUNBLElBQUEsT0FBQSxHQUFBLElBQUEsS0FBQSxHQUFBLEdBQUEsR0FBQSxHQUFBLEdBQUEsSUFBQSxHQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsQ0FBQTtZQUNBLEdBQUE7WUFDQSxFQUFBLElBQUEsSUFBQSxHQUFBLE9BQUEsR0FBQSxDQUFBO1lBQ0EsRUFBQSxJQUFBLENBQUEsSUFBQSxLQUFBLFFBQUEsSUFBQSxJQUFBLEtBQUEsVUFBQSxLQUFBLE9BQUEsR0FBQSxDQUFBLE1BQUEsS0FBQSxVQUFBLEVBQUE7WUFDQSxJQUFBLEdBQUEsR0FBQSxHQUFBLENBQUEsTUFBQSxFQUFBLENBQUE7WUFDQSxHQUFBO1lBQ0EsRUFBQSxJQUFBLE9BQUEsR0FBQSxLQUFBLFFBQUEsRUFBQTtZQUNBLElBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxJQUFBLElBQUEsQ0FBQSxPQUFBLElBQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBLENBQUEsRUFBQTtZQUNBLE1BQUEsT0FBQSxHQUFBLEdBQUEsR0FBQSxHQUFBLEtBQUEsR0FBQSxHQUFBLENBQUEsT0FBQSxDQUFBLElBQUEsRUFBQSxPQUFBLENBQUEsR0FBQSxJQUFBLENBQUE7WUFDQSxLQUFBO1lBQ0EsR0FBQTtZQUNBLEVBQUEsSUFBQSxPQUFBLEVBQUEsR0FBQSxHQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQTtZQUNBLEVBQUEsT0FBQSxHQUFBLEdBQUEsR0FBQSxHQUFBLElBQUEsR0FBQSxHQUFBLEdBQUEsR0FBQSxDQUFBO1lBQ0EsQ0FDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0EsVUFBQSxDQUFBLEtBQUEsR0FBQSxVQUFBO1lBQ0EsU0FBQSxTQUFBLENBQUEsR0FBQSxFQUFBLEtBQUEsQ0FBQTtZQUNBLEVBQUEsSUFBQSxLQUFBLEdBQUEsRUFBQSxDQUFBO0FBQ0E7WUFDQSxFQUFBLEtBQUEsSUFBQSxHQUFBLElBQUEsR0FBQSxFQUFBO1lBQ0EsSUFBQSxJQUFBLG9CQUFBLENBQUEsSUFBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLENBQUEsRUFBQTtZQUNBLE1BQUEsSUFBQSxHQUFBLEdBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO0FBQ0E7WUFDQSxNQUFBLElBQUEsT0FBQSxLQUFBLEdBQUEsRUFBQTtZQUNBLFFBQUEsR0FBQSxHQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQTtZQUNBLFFBQUEsS0FBQSxHQUFBLFFBQUEsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxLQUFBLENBQUEsR0FBQSxLQUFBLENBQUE7WUFDQSxRQUFBLFNBQUE7WUFDQSxPQUFBO1lBQ0EsTUFBQSxJQUFBLE9BQUEsS0FBQSxHQUFBLEVBQUE7WUFDQSxRQUFBLEdBQUEsR0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxPQUFBO1lBQ0EsTUFBQSxLQUFBLElBQUEsUUFBQSxDQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsQ0FBQSxDQUFBO1lBQ0EsS0FBQTtZQUNBLEdBQUE7QUFDQTtZQUNBLEVBQUEsT0FBQSxLQUFBLENBQUE7WUFDQSxDQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7QUFDQTtZQUNBLElBQUEsY0FBQSxHQUFBLFFBQUEsQ0FBQTtZQUNBLFVBQUEsQ0FBQSxNQUFBLEdBQUEsV0FBQTtZQUNBLFNBQUEsVUFBQSxDQUFBLEtBQUEsQ0FBQTtZQUNBLEVBQUEsSUFBQSxJQUFBLEdBQUEsRUFBQSxHQUFBLEtBQUEsQ0FBQTtZQUNBLEVBQUEsSUFBQSxXQUFBLEdBQUEsY0FBQSxDQUFBLElBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtZQUNBLEVBQUEsSUFBQSxDQUFBLFdBQUEsRUFBQSxPQUFBLEtBQUEsQ0FBQTtBQUNBO1lBQ0EsRUFBQSxJQUFBLE1BQUEsR0FBQSxFQUFBLENBQUE7WUFDQSxFQUFBLElBQUEsQ0FBQSxFQUFBLFNBQUEsRUFBQSxNQUFBLENBQUE7WUFDQSxFQUFBLEtBQUEsQ0FBQSxHQUFBLFdBQUEsQ0FBQSxLQUFBLEVBQUEsU0FBQSxHQUFBLENBQUEsRUFBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsRUFBQTtZQUNBLElBQUEsUUFBQSxJQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsQ0FBQTtZQUNBLE1BQUEsS0FBQSxFQUFBLEVBQUEsTUFBQSxHQUFBLFFBQUEsQ0FBQSxDQUFBLE1BQUE7WUFDQSxNQUFBLEtBQUEsRUFBQSxFQUFBLE1BQUEsR0FBQSxPQUFBLENBQUEsQ0FBQSxNQUFBO1lBQ0EsTUFBQSxLQUFBLEVBQUEsRUFBQSxNQUFBLEdBQUEsTUFBQSxDQUFBLENBQUEsTUFBQTtZQUNBLE1BQUEsS0FBQSxFQUFBLEVBQUEsTUFBQSxHQUFBLE1BQUEsQ0FBQSxDQUFBLE1BQUE7WUFDQSxNQUFBLFNBQUEsU0FBQTtZQUNBLEtBQUE7WUFDQSxJQUFBLElBQUEsU0FBQSxLQUFBLENBQUEsRUFBQSxNQUFBLElBQUEsSUFBQSxDQUFBLFNBQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQSxDQUFBLENBQUE7WUFDQSxJQUFBLFNBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBO1lBQ0EsSUFBQSxNQUFBLElBQUEsTUFBQSxDQUFBO1lBQ0EsR0FBQTtZQUNBLEVBQUEsSUFBQSxTQUFBLEtBQUEsQ0FBQSxFQUFBLE9BQUEsTUFBQSxHQUFBLElBQUEsQ0FBQSxTQUFBLENBQUEsU0FBQSxFQUFBLENBQUEsQ0FBQSxDQUFBO1lBQ0EsT0FBQSxPQUFBLE1BQUEsQ0FBQTtZQUNBLENBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtBQUNBO1lBQ0EsVUFBQSxDQUFBLE9BQUEsR0FBQSxZQUFBO1lBQ0EsU0FBQSxXQUFBLENBQUEsR0FBQSxFQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUEsR0FBQSxDQUFBO1lBQ0EsRUFBQSxJQUFBLEVBQUEsR0FBQSxZQUFBLEtBQUEsQ0FBQSxFQUFBLE1BQUEsR0FBQSxDQUFBO1lBQ0EsRUFBQSxJQUFBLENBQUEsT0FBQSxNQUFBLElBQUEsV0FBQSxJQUFBLENBQUEsUUFBQSxLQUFBLENBQUEsR0FBQSxFQUFBO1lBQ0EsSUFBQSxHQUFBLENBQUEsT0FBQSxJQUFBLFdBQUEsR0FBQSxNQUFBLENBQUE7WUFDQSxJQUFBLE1BQUEsR0FBQSxDQUFBO1lBQ0EsR0FBQTtZQUNBLEVBQUEsSUFBQTtZQUNBLElBQUEsR0FBQSxHQUFBLEdBQUEsSUFBQSxVQUFBLENBQUEsWUFBQSxDQUFBLFFBQUEsRUFBQSxNQUFBLEVBQUE7WUFDQSxHQUFBLENBQUEsT0FBQSxFQUFBLEVBQUE7WUFDQSxJQUFBLFdBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQTtZQUNBLEdBQUE7WUFDQSxFQUFBLElBQUEsT0FBQSxHQUFBLENBQUE7WUFDQSxNQUFBLEtBQUEsR0FBQSxHQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQTtZQUNBLE1BQUEsS0FBQSxHQUFBLElBQUEsQ0FBQSxHQUFBLENBQUEsTUFBQSxHQUFBLE9BQUEsRUFBQSxDQUFBLENBQUE7WUFDQSxNQUFBLEdBQUEsR0FBQSxJQUFBLENBQUEsR0FBQSxDQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsTUFBQSxHQUFBLE9BQUEsQ0FBQSxDQUFBO0FBQ0E7WUFDQTtZQUNBLEVBQUEsSUFBQSxPQUFBLEdBQUEsS0FBQSxDQUFBLEtBQUEsQ0FBQSxLQUFBLEVBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBLFNBQUEsSUFBQSxFQUFBLENBQUEsQ0FBQTtZQUNBLElBQUEsSUFBQSxJQUFBLEdBQUEsQ0FBQSxHQUFBLEtBQUEsR0FBQSxDQUFBLENBQUE7WUFDQSxJQUFBLE9BQUEsQ0FBQSxJQUFBLElBQUEsTUFBQSxHQUFBLE1BQUEsR0FBQSxNQUFBO1lBQ0EsUUFBQSxJQUFBO1lBQ0EsUUFBQSxJQUFBO1lBQ0EsUUFBQSxJQUFBLENBQUE7WUFDQSxHQUFBLENBQUEsQ0FBQSxJQUFBLENBQUEsSUFBQSxDQUFBLENBQUE7QUFDQTtZQUNBO1lBQ0EsRUFBQSxHQUFBLENBQUEsSUFBQSxHQUFBLFFBQUEsQ0FBQTtZQUNBLEVBQUEsR0FBQSxDQUFBLE9BQUEsR0FBQSxDQUFBLFFBQUEsSUFBQSxLQUFBLElBQUEsR0FBQSxHQUFBLE1BQUE7WUFDQSxNQUFBLElBQUEsR0FBQSxPQUFBLEdBQUEsTUFBQSxHQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUE7WUFDQSxFQUFBLE1BQUEsR0FBQSxDQUFBO1lBQ0E7Ozs7WUM3UEEsUUFBQSxHQUFBLFFBQUEsR0FBQSwyQkFBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSxrQkFBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSxvQ0FBQSxDQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSxtQkFBQSxDQUFBOztZQUVBLFFBQUEsR0FBQSxRQUFBLEdBQUEsb0VBQUEsQ0FBQTtZQUNBLFFBQUEsR0FBQSxRQUFBLEdBQUEsK0ZBQUEsQ0FBQTtZQUNBLFFBQUEsR0FBQSxRQUFBLEdBQUEsa0JBQUEsQ0FBQTs7Ozs7WUFJQSxRQUFBLEdBQUEsUUFBQSxHQUFBLCtCQUFBLENBQUE7O1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSxnQ0FBQSxDQUFBOztZQUNBLFFBQUEsR0FBQSxRQUFBLEdBQUEsaUNBQUEsQ0FBQTs7WUFDQSxRQUFBLEdBQUEsUUFBQSxHQUFBLGdDQUFBLENBQUE7O1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSxvQ0FBQSxDQUFBOztZQUVBLElBQUEsR0FBQSxFQUFBO1lBQ0EsUUFBQSxHQUFBLFFBQUEsR0FBQSwrQkFBQSxDQUFBOzs7WUFFQSxRQUFBLEdBQUEsUUFBQSxHQUFBLHdEQUFBLENBQUE7WUFDQSxRQUFBLEdBQUEsUUFBQSxHQUFBLHlEQUFBLENBQUE7WUFDQSxRQUFBLEdBQUEsUUFBQSxHQUFBLHdEQUFBLENBQUE7WUFDQSxRQUFBLEdBQUEsUUFBQSxHQUFBLHFFQUFBLENBQUE7WUFDQSxRQUFBLEdBQUEsUUFBQSxHQUFBLHdEQUFBLENBQUE7WUFDQSxRQUFBLEdBQUEsUUFBQSxHQUFBLHNFQUFBLENBQUE7WUFDQSxRQUFBLEdBQUEsUUFBQSxHQUFBLHdEQUFBLENBQUE7WUFDQSxRQUFBLEdBQUEsUUFBQSxHQUFBLDhFQUFBLENBQUE7WUFFQSxRQUFBLEdBQUEsUUFBQSxHQUFBLHFIQUFBLENBQUE7OztZQzFCQSxPQUFBLENBQUEsR0FBQSxDQUFBLFFBQUEsRUFBQUUsS0FBQSxFQUFBO1lBR0EsT0FBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLEVBQUFDLEtBQUEsRUFBQTtZQUdBLE9BQUEsQ0FBQSxHQUFBLENBQUEsT0FBQSxFQUFBLEtBQUEsRUFBQTtZQUdBLE9BQUEsQ0FBQSxHQUFBLENBQUFDLE9BQUEsRUFBQTtZQUdBLE9BQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxFQUFBO1lBR0EsT0FBQSxDQUFBLEdBQUEsQ0FBQSxJQUFBLEVBQUE7WUFJQSxTQUFBLEtBQUEsRUFBQSxHQUFBLElBQUE7WUFDQTtZQUNBLENBQUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxHQUFBLElBQUEsRUFBQTtZQUNBLENBQUE7WUFDQSxPQUFBLENBQUEsR0FBQSxDQUFBQyxLQUFBLEVBQUE7WUFDQSxLQUFBLENBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUE7WUFHQSxPQUFBLENBQUEsR0FBQSxDQUFBLFNBQUFDLE9BQUEsUUFBQUMsTUFBQSxRQUFBQyxNQUFBLFlBQUFDLFVBQUEsRUFBQSxFQUFBOztZQUVBLE9BQUEsQ0FBQSxHQUFBLENBQUEsYUFBQSxFQUFBOztZQUVBLE9BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxFQUFBUixRQUFBLENBQUEsTUFBQSxFQUFBO1lBR0EsT0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUE7Ozs7WUFJQSxJQUFBLEdBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxLQUFBLEdBQUE7WUFDQSxPQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsRUFBQTtZQUlBLE9BQUEsQ0FBQSxHQUFBLENBQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxFQUFBO1lBR0EsT0FBQSxDQUFBLEdBQUEsQ0FBQSxVQUFBLEVBQUE7WUFHQSxPQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUE7O1lBRUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxLQUFBLEVBRUE7O1lBRUEsT0FBQSxDQUFBLEdBQUEsQ0FBQSxNQUFBLEVBQUE7O1lBRUE7Ozs7OzsifQ==
