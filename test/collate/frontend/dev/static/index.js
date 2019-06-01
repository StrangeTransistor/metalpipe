(function () {
            'use strict';

            var global$1 = (typeof global !== "undefined" ? global :
                        typeof self !== "undefined" ? self :
                        typeof window !== "undefined" ? window : {});

            var index = 42;

            var factory = () => () => {};

            var noop3 = factory();

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

            function other$1 ()
            {
            	return 'Other'
            }

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

            var pug_static = "<div>Some Static</div>";

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
            var classes = pug_classes;
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

            var style = pug_style;
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
            /**
             * Render the given attributes object.
             *
             * @param {Object} obj
             * @param {Object} terse whether to use HTML5 terse boolean attributes
             * @return {String}
             */
            var attrs = pug_attrs;
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
            var escape = pug_escape;
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

            var rethrow = pug_rethrow;
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
            var pugRuntime = {
            	merge: merge,
            	classes: classes,
            	style: style,
            	attr: attr,
            	attrs: attrs,
            	escape: escape,
            	rethrow: rethrow
            };

            function pug(locals) {var pug_html = "", pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {};
            var locals_for_with = (locals || {});(function (other, some) {
            pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
            pug_html = pug_html + "\u003Chead\u003E";
            pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
            pug_html = pug_html + "\u003Ctitle\u003E";
            pug_html = pug_html + "index\u003C\u002Ftitle\u003E";
            pug_html = pug_html + "\u003Clink rel=\"stylesheet\" href=\"index.css\"\u003E";
            pug_html = pug_html + "\u003Cscript src=\"static\u002Findex.js\"\u003E\u003C\u002Fscript\u003E\u003C\u002Fhead\u003E";
            pug_html = pug_html + "\u003Cbody\u003E";
            pug_html = pug_html + "\u003Cdiv class=\"some\"\u003E";
            pug_html = pug_html + (pugRuntime.escape(null == (pug_interp = some) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
            pug_html = pug_html + "\u003Cdiv class=\"other some\"\u003E";
            pug_html = pug_html + (pugRuntime.escape(null == (pug_interp = other) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E";
            }.call(this,"other" in locals_for_with?locals_for_with.other:typeof other!=="undefined"?other:undefined,"some" in locals_for_with?locals_for_with.some:typeof some!=="undefined"?some:undefined));} catch (err) {pugRuntime.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);}return pug_html;}

            console.log('answer', index);
            console.log('noop', noop3);
            console.log('curry', curry);
            console.log(other$1);

            console.log(!! global$1.global);
            console.log(p);

            var yes = 'yes';
            console.log(yes);
            console.log(pug_static);
            console.log(pug({ other: 'Other', some: 'Some' }));

}());
