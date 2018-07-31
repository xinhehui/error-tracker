/*!
 * lucky-es-template.js v0.0.1
 * (c) 2018-2018 xxwade
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ErrorTracker = factory());
}(this, (function () { 'use strict';

  /**
   * debounce
   *
   * @param {Function} func 实际要执行的函数
   * @param {Number} delay 延迟时间，单位是 ms
   * @param {Function} callback 在 func 执行后的回调
   *
   * @return {Function}
   */
  function debounce(func, delay, callback) {
    var timer;

    return function () {
      var context = this;
      var args = arguments;

      clearTimeout(timer);

      timer = setTimeout(function () {
        func.apply(context, args);

        !callback || callback();
      }, delay);
    };
  }

  /**
   * merge
   *
   * @param  {Object} src
   * @param  {Object} dest
   * @return {Object}
   */
  function merge(src, dest) {
    for (var item in src) {
      dest[item] = src[item];
    }

    return dest;
  }

  /**
   * 是否是函数
   *
   * @param  {Any} func 判断对象
   * @return {Boolean}
   */
  function isFunction(func) {
    return Object.prototype.toString.call(func) === '[object Function]';
  }

  /**
   * 将类数组转化成数组
   *
   * @param  {Object} arrayLike 类数组对象
   * @return {Array} 转化后的数组
   */
  function arrayFrom(arrayLike) {
    return [].slice.call(arrayLike);
  }

  var tryJS = {};

  tryJS.wrap = wrap;
  tryJS.wrapArgs = tryifyArgs;

  var config = {
    handleTryCatchError: function handleTryCatchError() {}
  };

  function setting(opts) {
    merge(opts, config);
  }

  function wrap(func) {
    return isFunction(func) ? tryify(func) : func;
  }

  /**
   * 将函数使用 try..catch 包装
   *
   * @param  {Function} func 需要进行包装的函数
   * @return {Function} 包装后的函数
   */
  function tryify(func) {
    // 确保只包装一次
    if (!func._wrapped) {
      func._wrapped = function () {
        try {
          return func.apply(this, arguments);
        } catch (error) {
          config.handleTryCatchError(error);
          window.ignoreError = true;

          throw error;
        }
      };
    }

    return func._wrapped;
  }

  /**
   * 只对函数参数进行包装
   *
   * @param  {Function} func 需要进行包装的函数
   * @return {Function}
   */
  function tryifyArgs(func) {
    return function () {
      var args = arrayFrom(arguments).map(function (arg) {
        return wrap(arg);
      });

      return func.apply(this, args);
    };
  }

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var isImplemented = function () {
  	var assign = Object.assign, obj;
  	if (typeof assign !== "function") return false;
  	obj = { foo: "raz" };
  	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
  	return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
  };

  var isImplemented$1 = function () {
  	try {
  		return true;
  	} catch (e) {
  		return false;
  	}
  };

  // eslint-disable-next-line no-empty-function
  var noop = function () {};

  var _undefined = noop(); // Support ES3 engines

  var isValue = function (val) {
   return (val !== _undefined) && (val !== null);
  };

  var keys = Object.keys;

  var shim = function (object) { return keys(isValue(object) ? Object(object) : object); };

  var keys$1 = isImplemented$1() ? Object.keys : shim;

  var validValue = function (value) {
  	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
  	return value;
  };

  var max   = Math.max;

  var shim$1 = function (dest, src /*, …srcn*/) {
  	var error, i, length = max(arguments.length, 2), assign;
  	dest = Object(validValue(dest));
  	assign = function (key) {
  		try {
  			dest[key] = src[key];
  		} catch (e) {
  			if (!error) error = e;
  		}
  	};
  	for (i = 1; i < length; ++i) {
  		src = arguments[i];
  		keys$1(src).forEach(assign);
  	}
  	if (error !== undefined) throw error;
  	return dest;
  };

  var assign = isImplemented()
  	? Object.assign
  	: shim$1;

  var forEach = Array.prototype.forEach, create = Object.create;

  var process = function (src, obj) {
  	var key;
  	for (key in src) obj[key] = src[key];
  };

  // eslint-disable-next-line no-unused-vars
  var normalizeOptions = function (opts1 /*, …options*/) {
  	var result = create(null);
  	forEach.call(arguments, function (options) {
  		if (!isValue(options)) return;
  		process(Object(options), result);
  	});
  	return result;
  };

  // Deprecated

  var isCallable = function (obj) {
   return typeof obj === "function";
  };

  var str = "razdwatrzy";

  var isImplemented$2 = function () {
  	if (typeof str.contains !== "function") return false;
  	return (str.contains("dwa") === true) && (str.contains("foo") === false);
  };

  var indexOf = String.prototype.indexOf;

  var shim$2 = function (searchString/*, position*/) {
  	return indexOf.call(this, searchString, arguments[1]) > -1;
  };

  var contains = isImplemented$2()
  	? String.prototype.contains
  	: shim$2;

  var d_1 = createCommonjsModule(function (module) {

  var d;

  d = module.exports = function (dscr, value/*, options*/) {
  	var c, e, w, options, desc;
  	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
  		options = value;
  		value = dscr;
  		dscr = null;
  	} else {
  		options = arguments[2];
  	}
  	if (dscr == null) {
  		c = w = true;
  		e = false;
  	} else {
  		c = contains.call(dscr, 'c');
  		e = contains.call(dscr, 'e');
  		w = contains.call(dscr, 'w');
  	}

  	desc = { value: value, configurable: c, enumerable: e, writable: w };
  	return !options ? desc : assign(normalizeOptions(options), desc);
  };

  d.gs = function (dscr, get, set/*, options*/) {
  	var c, e, options, desc;
  	if (typeof dscr !== 'string') {
  		options = set;
  		set = get;
  		get = dscr;
  		dscr = null;
  	} else {
  		options = arguments[3];
  	}
  	if (get == null) {
  		get = undefined;
  	} else if (!isCallable(get)) {
  		options = get;
  		get = set = undefined;
  	} else if (set == null) {
  		set = undefined;
  	} else if (!isCallable(set)) {
  		options = set;
  		set = undefined;
  	}
  	if (dscr == null) {
  		c = true;
  		e = false;
  	} else {
  		c = contains.call(dscr, 'c');
  		e = contains.call(dscr, 'e');
  	}

  	desc = { get: get, set: set, configurable: c, enumerable: e };
  	return !options ? desc : assign(normalizeOptions(options), desc);
  };
  });

  var validCallable = function (fn) {
  	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
  	return fn;
  };

  var eventEmitter = createCommonjsModule(function (module, exports) {

  var apply = Function.prototype.apply, call = Function.prototype.call,
    create = Object.create, defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    descriptor = { configurable: true, enumerable: false, writable: true },

    on, once, off, emit, methods, descriptors, base;

  on = function (type, listener) {
    var data;

    validCallable(listener);

    if (!hasOwnProperty.call(this, '__ee__')) {
      data = descriptor.value = create(null);
      defineProperty(this, '__ee__', descriptor);
      descriptor.value = null;
    } else {
      data = this.__ee__;
    }
    if (!data[type]) data[type] = listener;
    else if (typeof data[type] === 'object') data[type].push(listener);
    else data[type] = [data[type], listener];

    return this
  };

  once = function (type, listener) {
    var once, self;

    validCallable(listener);
    self = this;
    on.call(this, type, once = function () {
      off.call(self, type, once);
      apply.call(listener, this, arguments);
    });

    once.__eeOnceListener__ = listener;
    return this
  };

  off = function (type, listener) {
    var data, listeners, candidate, i;

    validCallable(listener);

    if (!hasOwnProperty.call(this, '__ee__')) return this
    data = this.__ee__;
    if (!data[type]) return this
    listeners = data[type];

    if (typeof listeners === 'object') {
      for (i = 0; (candidate = listeners[i]); ++i) {
        if ((candidate === listener) ||
  					(candidate.__eeOnceListener__ === listener)) {
          if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
          else listeners.splice(i, 1);
        }
      }
    } else {
      if ((listeners === listener) ||
  				(listeners.__eeOnceListener__ === listener)) {
        delete data[type];
      }
    }

    return this
  };

  emit = function (type) {
    var i, l, listener, listeners, args;

    if (!hasOwnProperty.call(this, '__ee__')) return
    listeners = this.__ee__[type];
    if (!listeners) return

    if (typeof listeners === 'object') {
      l = arguments.length;
      args = new Array(l - 1);
      for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

      listeners = listeners.slice();
      for (i = 0; (listener = listeners[i]); ++i) {
        apply.call(listener, this, args);
      }
    } else {
      switch (arguments.length) {
        case 1:
          call.call(listeners, this);
          break
        case 2:
          call.call(listeners, this, arguments[1]);
          break
        case 3:
          call.call(listeners, this, arguments[1], arguments[2]);
          break
        default:
          l = arguments.length;
          args = new Array(l - 1);
          for (i = 1; i < l; ++i) {
            args[i - 1] = arguments[i];
          }
          apply.call(listeners, this, args);
      }
    }
  };

  methods = {
    on: on,
    once: once,
    off: off,
    emit: emit
  };

  descriptors = {
    on: d_1(on),
    once: d_1(once),
    off: d_1(off),
    emit: d_1(emit)
  };

  base = defineProperties({}, descriptors);

  module.exports = exports = function (o) {
    return (o == null) ? create(base) : defineProperties(Object(o), descriptors)
  };
  exports.methods = methods;
  });
  var eventEmitter_1 = eventEmitter.methods;

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var NA_VERSION = "-1";
  var NA = {
    name: "na",
    version: NA_VERSION
  };

  function typeOf(type) {
    return function (object) {
      return Object.prototype.toString.call(object) === "[object " + type + "]";
    };
  }
  var isString = typeOf("String");
  var isRegExp = typeOf("RegExp");
  var isObject = typeOf("Object");
  var isFunction$1 = typeOf("Function");

  function each(object, factory) {
    for (var i = 0, l = object.length; i < l; i++) {
      if (factory.call(object, object[i], i) === false) {
        break;
      }
    }
  }

  // UserAgent Detector.
  // @param {String} ua, userAgent.
  // @param {Object} expression
  // @return {Object}
  //    返回 null 表示当前表达式未匹配成功。
  function detect(name, expression, ua) {
    var expr = isFunction$1(expression) ? expression.call(null, ua) : expression;
    if (!expr) {
      return null;
    }
    var info = {
      name: name,
      version: NA_VERSION,
      codename: ""
    };
    if (expr === true) {
      return info;
    } else if (isString(expr)) {
      if (ua.indexOf(expr) !== -1) {
        return info;
      }
    } else if (isObject(expr)) {
      if (expr.hasOwnProperty("version")) {
        info.version = expr.version;
      }
      return info;
    } else if (isRegExp(expr)) {
      var m = expr.exec(ua);
      if (m) {
        if (m.length >= 2 && m[1]) {
          info.version = m[1].replace(/_/g, ".");
        } else {
          info.version = NA_VERSION;
        }
        return info;
      }
    }
  }

  // 初始化识别。
  function init(ua, patterns, factory, detector) {
    var detected = NA;
    each(patterns, function (pattern) {
      var d = detect(pattern[0], pattern[1], ua);
      if (d) {
        detected = d;
        return false;
      }
    });
    factory.call(detector, detected.name, detected.version);
  }

  var Detector = function () {
    function Detector(rules) {
      _classCallCheck(this, Detector);

      this._rules = rules;
    }

    // 解析 UserAgent 字符串
    // @param {String} ua, userAgent string.
    // @return {Object}


    _createClass(Detector, [{
      key: "parse",
      value: function parse(ua) {
        ua = (ua || "").toLowerCase();
        var d = {};

        init(ua, this._rules.device, function (name, version) {
          var v = parseFloat(version);
          d.device = {
            name: name,
            version: v,
            fullVersion: version
          };
          d.device[name] = v;
        }, d);

        init(ua, this._rules.os, function (name, version) {
          var v = parseFloat(version);
          d.os = {
            name: name,
            version: v,
            fullVersion: version
          };
          d.os[name] = v;
        }, d);

        var ieCore = this.IEMode(ua);

        init(ua, this._rules.engine, function (name, version) {
          var mode = version;
          // IE 内核的浏览器，修复版本号及兼容模式。
          if (ieCore) {
            version = ieCore.engineVersion || ieCore.engineMode;
            mode = ieCore.engineMode;
          }
          var v = parseFloat(version);
          d.engine = {
            name: name,
            version: v,
            fullVersion: version,
            mode: parseFloat(mode),
            fullMode: mode,
            compatible: ieCore ? ieCore.compatible : false
          };
          d.engine[name] = v;
        }, d);

        init(ua, this._rules.browser, function (name, version) {
          var mode = version;
          // IE 内核的浏览器，修复浏览器版本及兼容模式。
          if (ieCore) {
            // 仅修改 IE 浏览器的版本，其他 IE 内核的版本不修改。
            if (name === "ie") {
              version = ieCore.browserVersion;
            }
            mode = ieCore.browserMode;
          }
          var v = parseFloat(version);
          d.browser = {
            name: name,
            version: v,
            fullVersion: version,
            mode: parseFloat(mode),
            fullMode: mode,
            compatible: ieCore ? ieCore.compatible : false
          };
          d.browser[name] = v;
        }, d);
        return d;
      }

      // 解析使用 Trident 内核的浏览器的 `浏览器模式` 和 `文档模式` 信息。
      // @param {String} ua, userAgent string.
      // @return {Object}

    }, {
      key: "IEMode",
      value: function IEMode(ua) {
        if (!this._rules.re_msie.test(ua)) {
          return null;
        }

        var m = void 0;
        var engineMode = void 0;
        var engineVersion = void 0;
        var browserMode = void 0;
        var browserVersion = void 0;

        // IE8 及其以上提供有 Trident 信息，
        // 默认的兼容模式，UA 中 Trident 版本不发生变化。
        if (ua.indexOf("trident/") !== -1) {
          m = /\btrident\/([0-9.]+)/.exec(ua);
          if (m && m.length >= 2) {
            // 真实引擎版本。
            engineVersion = m[1];
            var v_version = m[1].split(".");
            v_version[0] = parseInt(v_version[0], 10) + 4;
            browserVersion = v_version.join(".");
          }
        }

        m = this._rules.re_msie.exec(ua);
        browserMode = m[1];
        var v_mode = m[1].split(".");
        if (typeof browserVersion === "undefined") {
          browserVersion = browserMode;
        }
        v_mode[0] = parseInt(v_mode[0], 10) - 4;
        engineMode = v_mode.join(".");
        if (typeof engineVersion === "undefined") {
          engineVersion = engineMode;
        }

        return {
          browserVersion: browserVersion,
          browserMode: browserMode,
          engineVersion: engineVersion,
          engineMode: engineMode,
          compatible: engineVersion !== engineMode
        };
      }
    }]);

    return Detector;
  }();

  var detector = Detector;

  var win = typeof window === "undefined" ? commonjsGlobal : window;
  var external = win.external;
  var re_msie = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/;
  var re_blackberry_10 = /\bbb10\b.+?\bversion\/([\d.]+)/;
  var re_blackberry_6_7 = /\bblackberry\b.+\bversion\/([\d.]+)/;
  var re_blackberry_4_5 = /\bblackberry\d+\/([\d.]+)/;

  var NA_VERSION$1 = "-1";

  // 硬件设备信息识别表达式。
  // 使用数组可以按优先级排序。
  var DEVICES = [["nokia", function (ua) {
    // 不能将两个表达式合并，因为可能出现 "nokia; nokia 960"
    // 这种情况下会优先识别出 nokia/-1
    if (ua.indexOf("nokia ") !== -1) {
      return (/\bnokia ([0-9]+)?/
      );
    } else {
      return (/\bnokia([a-z0-9]+)?/
      );
    }
  }],
  // 三星有 Android 和 WP 设备。
  ["samsung", function (ua) {
    if (ua.indexOf("samsung") !== -1) {
      return (/\bsamsung(?:[ \-](?:sgh|gt|sm))?-([a-z0-9]+)/
      );
    } else {
      return (/\b(?:sgh|sch|gt|sm)-([a-z0-9]+)/
      );
    }
  }], ["wp", function (ua) {
    return ua.indexOf("windows phone ") !== -1 || ua.indexOf("xblwp") !== -1 || ua.indexOf("zunewp") !== -1 || ua.indexOf("windows ce") !== -1;
  }], ["pc", "windows"], ["ipad", "ipad"],
  // ipod 规则应置于 iphone 之前。
  ["ipod", "ipod"], ["iphone", /\biphone\b|\biph(\d)/], ["mac", "macintosh"],
  // 小米
  ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/],
  // 红米
  ["hongmi", /\bhm[ \-]?([a-z0-9]+)/], ["aliyun", /\baliyunos\b(?:[\-](\d+))?/], ["meizu", function (ua) {
    return ua.indexOf("meizu") >= 0 ? /\bmeizu[\/ ]([a-z0-9]+)\b/ : /\bm([0-9cx]{1,4})\b/;
  }], ["nexus", /\bnexus ([0-9s.]+)/], ["huawei", function (ua) {
    var re_mediapad = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/;
    if (ua.indexOf("huawei-huawei") !== -1) {
      return (/\bhuawei\-huawei\-([a-z0-9\-]+)/
      );
    } else if (re_mediapad.test(ua)) {
      return re_mediapad;
    } else {
      return (/\bhuawei[ _\-]?([a-z0-9]+)/
      );
    }
  }], ["lenovo", function (ua) {
    if (ua.indexOf("lenovo-lenovo") !== -1) {
      return (/\blenovo\-lenovo[ \-]([a-z0-9]+)/
      );
    } else {
      return (/\blenovo[ \-]?([a-z0-9]+)/
      );
    }
  }],
  // 中兴
  ["zte", function (ua) {
    if (/\bzte\-[tu]/.test(ua)) {
      return (/\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/
      );
    } else {
      return (/\bzte[ _\-]?([a-su-z0-9\+]+)/
      );
    }
  }],
  // 步步高
  ["vivo", /\bvivo(?: ([a-z0-9]+))?/], ["htc", function (ua) {
    if (/\bhtc[a-z0-9 _\-]+(?= build\b)/.test(ua)) {
      return (/\bhtc[ _\-]?([a-z0-9 ]+(?= build))/
      );
    } else {
      return (/\bhtc[ _\-]?([a-z0-9 ]+)/
      );
    }
  }], ["oppo", /\boppo[_]([a-z0-9]+)/], ["konka", /\bkonka[_\-]([a-z0-9]+)/], ["sonyericsson", /\bmt([a-z0-9]+)/], ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/], ["lg", /\blg[\-]([a-z0-9]+)/], ["android", /\bandroid\b|\badr\b/], ["blackberry", function (ua) {
    if (ua.indexOf("blackberry") >= 0) {
      return (/\bblackberry\s?(\d+)/
      );
    }
    return "bb10";
  }]];

  // 操作系统信息识别表达式
  var OS = [["wp", function (ua) {
    if (ua.indexOf("windows phone ") !== -1) {
      return (/\bwindows phone (?:os )?([0-9.]+)/
      );
    } else if (ua.indexOf("xblwp") !== -1) {
      return (/\bxblwp([0-9.]+)/
      );
    } else if (ua.indexOf("zunewp") !== -1) {
      return (/\bzunewp([0-9.]+)/
      );
    }
    return "windows phone";
  }], ["windows", /\bwindows nt ([0-9.]+)/], ["macosx", /\bmac os x ([0-9._]+)/], ["ios", function (ua) {
    if (/\bcpu(?: iphone)? os /.test(ua)) {
      return (/\bcpu(?: iphone)? os ([0-9._]+)/
      );
    } else if (ua.indexOf("iph os ") !== -1) {
      return (/\biph os ([0-9_]+)/
      );
    } else {
      return (/\bios\b/
      );
    }
  }], ["yunos", /\baliyunos ([0-9.]+)/], ["android", function (ua) {
    if (ua.indexOf("android") >= 0) {
      return (/\bandroid[ \/-]?([0-9.x]+)?/
      );
    } else if (ua.indexOf("adr") >= 0) {
      if (ua.indexOf("mqqbrowser") >= 0) {
        return (/\badr[ ]\(linux; u; ([0-9.]+)?/
        );
      } else {
        return (/\badr(?:[ ]([0-9.]+))?/
        );
      }
    }
    return "android";
    //return /\b(?:android|\badr)(?:[\/\- ](?:\(linux; u; )?)?([0-9.x]+)?/;
  }], ["chromeos", /\bcros i686 ([0-9.]+)/], ["linux", "linux"], ["windowsce", /\bwindows ce(?: ([0-9.]+))?/], ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/], ["blackberry", function (ua) {
    var m = ua.match(re_blackberry_10) || ua.match(re_blackberry_6_7) || ua.match(re_blackberry_4_5);
    return m ? { version: m[1] } : "blackberry";
  }]];

  // 针对同源的 TheWorld 和 360 的 external 对象进行检测。
  // @param {String} key, 关键字，用于检测浏览器的安装路径中出现的关键字。
  // @return {Undefined,Boolean,Object} 返回 undefined 或 false 表示检测未命中。
  function checkTW360External(key) {
    if (!external) {
      return;
    } // return undefined.
    try {
      //        360安装路径：
      //        C:%5CPROGRA~1%5C360%5C360se3%5C360SE.exe
      var runpath = external.twGetRunPath.toLowerCase();
      // 360SE 3.x ~ 5.x support.
      // 暴露的 external.twGetVersion 和 external.twGetSecurityID 均为 undefined。
      // 因此只能用 try/catch 而无法使用特性判断。
      var security = external.twGetSecurityID(win);
      var version = external.twGetVersion(security);

      if (runpath && runpath.indexOf(key) === -1) {
        return false;
      }
      if (version) {
        return { version: version };
      }
    } catch (ex) {/* */}
  }

  var ENGINE = [["edgehtml", /edge\/([0-9.]+)/], ["trident", re_msie], ["blink", function () {
    return "chrome" in win && "CSS" in win && /\bapplewebkit[\/]?([0-9.+]+)/;
  }], ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/], ["gecko", function (ua) {
    var match = ua.match(/\brv:([\d\w.]+).*\bgecko\/(\d+)/);
    if (match) {
      return {
        version: match[1] + "." + match[2]
      };
    }
  }], ["presto", /\bpresto\/([0-9.]+)/], ["androidwebkit", /\bandroidwebkit\/([0-9.]+)/], ["coolpadwebkit", /\bcoolpadwebkit\/([0-9.]+)/], ["u2", /\bu2\/([0-9.]+)/], ["u3", /\bu3\/([0-9.]+)/]];
  var BROWSER = [
  // Microsoft Edge Browser, Default browser in Windows 10.
  ["edge", /edge\/([0-9.]+)/],
  // Sogou.
  ["sogou", function (ua) {
    if (ua.indexOf("sogoumobilebrowser") >= 0) {
      return (/sogoumobilebrowser\/([0-9.]+)/
      );
    } else if (ua.indexOf("sogoumse") >= 0) {
      return true;
    }
    return (/ se ([0-9.x]+)/
    );
  }],
  // TheWorld (世界之窗)
  // 由于裙带关系，TheWorld API 与 360 高度重合。
  // 只能通过 UA 和程序安装路径中的应用程序名来区分。
  // TheWorld 的 UA 比 360 更靠谱，所有将 TheWorld 的规则放置到 360 之前。
  ["theworld", function () {
    var x = checkTW360External("theworld");
    if (typeof x !== "undefined") {
      return x;
    }
    return (/theworld(?: ([\d.])+)?/
    );
  }],
  // 360SE, 360EE.
  ["360", function (ua) {
    var x = checkTW360External("360se");
    if (typeof x !== "undefined") {
      return x;
    }
    if (ua.indexOf("360 aphone browser") !== -1) {
      return (/\b360 aphone browser \(([^\)]+)\)/
      );
    }
    return (/\b360(?:se|ee|chrome|browser)\b/
    );
  }],
  // Maxthon
  ["maxthon", function () {
    try {
      if (external && (external.mxVersion || external.max_version)) {
        return {
          version: external.mxVersion || external.max_version
        };
      }
    } catch (ex) {/* */}
    return (/\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/
    );
  }], ["micromessenger", /\bmicromessenger\/([\d.]+)/], ["qq", /\bm?qqbrowser\/([0-9.]+)/], ["green", "greenbrowser"], ["tt", /\btencenttraveler ([0-9.]+)/], ["liebao", function (ua) {
    if (ua.indexOf("liebaofast") >= 0) {
      return (/\bliebaofast\/([0-9.]+)/
      );
    }
    if (ua.indexOf("lbbrowser") === -1) {
      return false;
    }
    var version = void 0;
    try {
      if (external && external.LiebaoGetVersion) {
        version = external.LiebaoGetVersion();
      }
    } catch (ex) {/* */}
    return {
      version: version || NA_VERSION$1
    };
  }], ["tao", /\btaobrowser\/([0-9.]+)/], ["coolnovo", /\bcoolnovo\/([0-9.]+)/], ["saayaa", "saayaa"],
  // 有基于 Chromniun 的急速模式和基于 IE 的兼容模式。必须在 IE 的规则之前。
  ["baidu", /\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/],
  // 后面会做修复版本号，这里只要能识别是 IE 即可。
  ["ie", re_msie], ["mi", /\bmiuibrowser\/([0-9.]+)/],
  // Opera 15 之后开始使用 Chromniun 内核，需要放在 Chrome 的规则之前。
  ["opera", function (ua) {
    var re_opera_old = /\bopera.+version\/([0-9.ab]+)/;
    var re_opera_new = /\bopr\/([0-9.]+)/;
    return re_opera_old.test(ua) ? re_opera_old : re_opera_new;
  }], ["oupeng", /\boupeng\/([0-9.]+)/], ["yandex", /yabrowser\/([0-9.]+)/],
  // 支付宝手机客户端
  ["ali-ap", function (ua) {
    if (ua.indexOf("aliapp") > 0) {
      return (/\baliapp\(ap\/([0-9.]+)\)/
      );
    } else {
      return (/\balipayclient\/([0-9.]+)\b/
      );
    }
  }],
  // 支付宝平板客户端
  ["ali-ap-pd", /\baliapp\(ap-pd\/([0-9.]+)\)/],
  // 支付宝商户客户端
  ["ali-am", /\baliapp\(am\/([0-9.]+)\)/],
  // 淘宝手机客户端
  ["ali-tb", /\baliapp\(tb\/([0-9.]+)\)/],
  // 淘宝平板客户端
  ["ali-tb-pd", /\baliapp\(tb-pd\/([0-9.]+)\)/],
  // 天猫手机客户端
  ["ali-tm", /\baliapp\(tm\/([0-9.]+)\)/],
  // 天猫平板客户端
  ["ali-tm-pd", /\baliapp\(tm-pd\/([0-9.]+)\)/],
  // UC 浏览器，可能会被识别为 Android 浏览器，规则需要前置。
  // UC 桌面版浏览器携带 Chrome 信息，需要放在 Chrome 之前。
  ["uc", function (ua) {
    if (ua.indexOf("ucbrowser/") >= 0) {
      return (/\bucbrowser\/([0-9.]+)/
      );
    } else if (ua.indexOf("ubrowser/") >= 0) {
      return (/\bubrowser\/([0-9.]+)/
      );
    } else if (/\buc\/[0-9]/.test(ua)) {
      return (/\buc\/([0-9.]+)/
      );
    } else if (ua.indexOf("ucweb") >= 0) {
      // `ucweb/2.0` is compony info.
      // `UCWEB8.7.2.214/145/800` is browser info.
      return (/\bucweb([0-9.]+)?/
      );
    } else {
      return (/\b(?:ucbrowser|uc)\b/
      );
    }
  }], ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
  // Android 默认浏览器。该规则需要在 safari 之前。
  ["android", function (ua) {
    if (ua.indexOf("android") === -1) {
      return;
    }
    return (/\bversion\/([0-9.]+(?: beta)?)/
    );
  }], ["blackberry", function (ua) {
    var m = ua.match(re_blackberry_10) || ua.match(re_blackberry_6_7) || ua.match(re_blackberry_4_5);
    return m ? { version: m[1] } : "blackberry";
  }], ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
  // 如果不能被识别为 Safari，则猜测是 WebView。
  ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/], ["firefox", /\bfirefox\/([0-9.ab]+)/], ["nokia", /\bnokiabrowser\/([0-9.]+)/]];

  var webRules = {
    device: DEVICES,
    os: OS,
    browser: BROWSER,
    engine: ENGINE,
    re_msie: re_msie
  };

  var userAgent = navigator.userAgent || "";
  //const platform = navigator.platform || "";
  var appVersion = navigator.appVersion || "";
  var vendor = navigator.vendor || "";
  var ua = userAgent + " " + appVersion + " " + vendor;

  var detector$1 = new detector(webRules);

  // 解析使用 Trident 内核的浏览器的 `浏览器模式` 和 `文档模式` 信息。
  // @param {String} ua, userAgent string.
  // @return {Object}
  function IEMode(ua) {
    if (!webRules.re_msie.test(ua)) {
      return null;
    }

    var m = void 0;
    var engineMode = void 0;
    var engineVersion = void 0;
    var browserMode = void 0;
    var browserVersion = void 0;

    // IE8 及其以上提供有 Trident 信息，
    // 默认的兼容模式，UA 中 Trident 版本不发生变化。
    if (ua.indexOf("trident/") !== -1) {
      m = /\btrident\/([0-9.]+)/.exec(ua);
      if (m && m.length >= 2) {
        // 真实引擎版本。
        engineVersion = m[1];
        var v_version = m[1].split(".");
        v_version[0] = parseInt(v_version[0], 10) + 4;
        browserVersion = v_version.join(".");
      }
    }

    m = webRules.re_msie.exec(ua);
    browserMode = m[1];
    var v_mode = m[1].split(".");
    if (typeof browserVersion === "undefined") {
      browserVersion = browserMode;
    }
    v_mode[0] = parseInt(v_mode[0], 10) - 4;
    engineMode = v_mode.join(".");
    if (typeof engineVersion === "undefined") {
      engineVersion = engineMode;
    }

    return {
      browserVersion: browserVersion,
      browserMode: browserMode,
      engineVersion: engineVersion,
      engineMode: engineMode,
      compatible: engineVersion !== engineMode
    };
  }

  function WebParse(ua) {
    var d = detector$1.parse(ua);

    var ieCore = IEMode(ua);

    // IE 内核的浏览器，修复版本号及兼容模式。
    if (ieCore) {
      var engineName = d.engine.name;
      var engineVersion = ieCore.engineVersion || ieCore.engineMode;
      var ve = parseFloat(engineVersion);
      var engineMode = ieCore.engineMode;

      d.engine = {
        name: engineName,
        version: ve,
        fullVersion: engineVersion,
        mode: parseFloat(engineMode),
        fullMode: engineMode,
        compatible: ieCore ? ieCore.compatible : false
      };
      d.engine[d.engine.name] = ve;

      var browserName = d.browser.name;
      // IE 内核的浏览器，修复浏览器版本及兼容模式。
      // 仅修改 IE 浏览器的版本，其他 IE 内核的版本不修改。
      var browserVersion = d.browser.fullVersion;
      if (browserName === "ie") {
        browserVersion = ieCore.browserVersion;
      }
      var browserMode = ieCore.browserMode;
      var vb = parseFloat(browserVersion);
      d.browser = {
        name: browserName,
        version: vb,
        fullVersion: browserVersion,
        mode: parseFloat(browserMode),
        fullMode: browserMode,
        compatible: ieCore ? ieCore.compatible : false
      };
      d.browser[browserName] = vb;
    }
    return d;
  }

  var Tan = WebParse(ua);
  Tan.parse = WebParse;
  var webDetector = Tan;

  var win$1 = window;
  var doc = win$1.document;
  var loc = win$1.location;
  var M = win$1.Sai;

  // 避免未引用先行脚本抛出异常。
  if (!M) {
    M = {};
  }
  if (!M._DATAS) {
    M._DATAS = [];
  }

  // 数据通信规范的版本。
  var version = '1.0';

  var URLLength = webDetector.engine.trident ? 2083 : 8190;
  var url = path(loc.href);

  // UTILS -------------------------------------------------------

  function typeOf$1(obj) {
    return Object.prototype.toString.call(obj);
  }

  // 合并 oa, ob 两个对象的属性到新对象，不修改原有对象。
  // @param {Object} target, 目标对象。
  // @param {Object} object, 来源对象。
  // @return {Object} 返回目标对象，目标对象附带有来源对象的属性。
  function merge$1(oa, ob) {
    var result = {};

    for (var i = 0, o, l = arguments.length; i < l; i++) {
      o = arguments[i];
      for (var k in o) {
        if (has(o, k)) {
          result[k] = o[k];
        }
      }
    }
    return result;
  }

  // simple random string.
  // @return {String}
  function rand() {
    return ('' + Math.random()).slice(-6);
  }

  // 获得资源的路径（不带参数和 hash 部分）
  // 另外新版 Arale 通过 nginx 提供的服务，支持类似：
  // > https://www.example.com/??a.js,b.js,c.js
  // 的方式请求资源，需要特殊处理。
  //
  // @param {String} uri, 仅处理绝对路径。
  // @return {String} 返回 uri 的文件路径，不包含参数和 jsessionid。
  function path(uri) {
    if (undefined === uri || typeof uri !== 'string') {
      return '';
    }
    var len = uri.length;

    var idxSessionID = uri.indexOf(';jsessionid=');
    if (idxSessionID < 0) {
      idxSessionID = len;
    }

    // 旧版的合并 HTTP 服务。
    var idxMin = uri.indexOf('/min/?');
    if (idxMin >= 0) {
      idxMin = uri.indexOf('?', idxMin);
    }
    if (idxMin < 0) {
      idxMin = len;
    }

    var idxHash = uri.indexOf('#');
    if (idxHash < 0) {
      idxHash = len;
    }

    var idxQ = uri.indexOf('??');
    idxQ = uri.indexOf('?', idxQ < 0 ? 0 : idxQ + 2);
    if (idxQ < 0) {
      idxQ = len;
    }

    var idx = Math.min(idxSessionID, idxMin, idxHash, idxQ);

    return idx < 0 ? uri : uri.substr(0, idx);
  }

  // 必要的字符串转义，保证发送的数据是安全的。
  // @param {String} str.
  // @return {String}
  function escapeString(str) {
    return String(str).replace(/(?:\r\n|\r|\n)/g, '<CR>');
  }

  // 将对象转为键值对参数字符串。
  function param(obj) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      return '';
    }
    var p = [];
    for (var k in obj) {
      if (!has(obj, k)) {
        continue;
      }
      if (typeOf$1(obj[k]) === '[object Array]') {
        for (var i = 0, l = obj[k].length; i < l; i++) {
          p.push(k + '=' + encodeURIComponent(escapeString(obj[k][i])));
        }
      } else if (typeOf$1(obj[k]) === '[object Object]') {
        Object.keys(obj[k]).forEach(function (item) {
          p.push('data[' + item + ']=' + encodeURIComponent(escapeString(obj[k][item])));
        });
      } else {
        p.push(k + '=' + encodeURIComponent(escapeString(obj[k])));
      }
    }
    return p.join('&');
  }

  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  function warn(info) {
    win$1.console && console.warn && console.warn(info);
  }

  // /UTILS -------------------------------------------------------

  var DEFAULT_DATA = {
    url: url,
    ref: path(doc.referrer) || '-',
    clnt: webDetector.device.name + '/' + webDetector.device.fullVersion + '|' + webDetector.os.name + '/' + webDetector.os.fullVersion + '|' + webDetector.browser.name + '/' + webDetector.browser.fullVersion + '|' + webDetector.engine.name + '/' + webDetector.engine.fullVersion + (webDetector.browser.compatible ? '|c' : ''),
    v: version

    // 创建 HTTP GET 请求发送数据。
    // @param {String} url, 日志服务器 URL 地址。
    // @param {Object} data, 附加的监控数据。
    // @param {Function} callback
  };function send(host, data, callback) {
    if (!callback) {
      callback = function callback() {};
    }
    if (!host) {
      warn('Sai: required logger server.' + host);return callback();
    }
    if (!data) {
      return callback();
    }

    var d = param(data);
    var url = host + (host.indexOf('?') < 0 ? '?' : '&') + d;
    // 忽略超长 url 请求，避免资源异常。
    if (url.length > URLLength) {
      return callback();
    }

    // @see http://www.javascriptkit.com/jsref/image.shtml
    // 暂时先用post
    var img = new window.Image(1, 1);
    img.onload = img.onerror = img.onabort = function () {
      callback();
      img.onload = img.onerror = img.onabort = null;
      img = null;
    };
    img.crossOrigin = 'Anonymous';
    img.src = url;
  }

  var sending = false;
  /**
   * 分时发送队列中的数据，避免 IE(6) 的连接请求数限制。
   * 这是里逐条发送
   * 这个是通过数组实现一个队列，依次发动
   */
  function timedSend() {
    if (sending) {
      return;
    }

    var e = M._DATAS.shift();
    if (!e) {
      return;
    }
    sending = true;

    // 理论上应该在收集异常消息时修正 file，避免连接带有参数。
    // 但是收集部分在 seer 中，不适合放置大量的脚本。
    if (e.profile === 'jserror') {
      e.file = path(e.file);
    }

    var data = merge$1(DEFAULT_DATA, e);
    data.rnd = rand(); // 避免缓存。

    send(M.server, data, function () {
      sending = false;
      timedSend();
    });
  }
  var _push = M._DATAS.push;
  // timedSend 准备好后可以替换 push 方法，自动分时发送。
  M.log = function () {
    _push.apply(M._DATAS, arguments);
    timedSend();
  };

  // 主动发送已捕获的异常。
  timedSend();

  var M$1 = M;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  // 忽略错误监听
  window.ignoreError = false;

  // 定义的错误类型码
  var ERROR_RUNTIME = 1;
  var ERROR_SCRIPT = 2;
  var ERROR_STYLE = 3;
  var ERROR_IMAGE = 4;
  var ERROR_AUDIO = 5;
  var ERROR_VIDEO = 6;
  var ERROR_TRY_CATHC = 8;

  var LOAD_ERROR_TYPE = {
    SCRIPT: ERROR_SCRIPT,
    LINK: ERROR_STYLE,
    IMG: ERROR_IMAGE,
    AUDIO: ERROR_AUDIO,
    VIDEO: ERROR_VIDEO
  };
  var debug = "production" === 'development';
  var event = eventEmitter();

  /**
   * 生成 runtime 错误日志
   *
   * @param  {String} message 错误信息
   * @param  {String} source  发生错误的脚本 URL
   * @param  {Number} lineno  发生错误的行号
   * @param  {Number} colno   发生错误的列号
   * @param  {Object} error   error 对象
   * @return {Object}
   */
  function formatRuntimerError(message, source, lineno, colno, error) {
    return {
      type: ERROR_RUNTIME,
      desc: message + ' at ' + source + ':' + lineno + ':' + colno,
      stack: error && error.stack ? error.stack : 'no stack' // IE <9, has no error stack
    };
  }

  /**
   * 生成 laod 错误日志
   *
   * @param  {Object} errorTarget
   * @return {Object}
   */
  function formatLoadError(errorTarget) {
    return {
      type: LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()],
      desc: errorTarget.baseURI + '@' + (errorTarget.src || errorTarget.href),
      stack: 'no stack'
    };
  }

  /**
   * 生成 try..catch 错误日志
   *
   * @param  {Object} error error 对象
   * @return {Object} 格式化后的对象
   */
  function formatTryCatchError(error) {
    return {
      type: ERROR_TRY_CATHC,
      desc: error.message,
      stack: error.stack
    };
  }

  /**
   * 设置一个采样率，决定是否上报
   *
   * @param  {Number} sampling 0 - 1
   * @return {Boolean}
   */
  function needReport(sampling) {
    return Math.random() < (sampling || 1);
  }

  var CaptureErrorAbstract = function () {
    function CaptureErrorAbstract(opts) {
      classCallCheck(this, CaptureErrorAbstract);

      this.errorList = []; // 错误数据的收集数组
      this.config = {
        concat: false, // 默认不合并 单条发送
        delay: 2000, // 错误处理间隔时间
        maxError: 16, // 异常报错数量限制
        sampling: 1 // 采样率
      };
      Object.assign(this.config, opts);
    }

    createClass(CaptureErrorAbstract, [{
      key: 'report',
      value: function report() {
        throw new Error('该类必须继承后覆盖使用');
      }
    }]);
    return CaptureErrorAbstract;
  }();

  var CaptureError = function (_CaptureErrorAbstract) {
    inherits(CaptureError, _CaptureErrorAbstract);

    function CaptureError(opts) {
      classCallCheck(this, CaptureError);

      var _this = possibleConstructorReturn(this, (CaptureError.__proto__ || Object.getPrototypeOf(CaptureError)).call(this, opts));

      if (!opts.url) throw new Error('不存在url参数');
      Object.assign(_this.config, opts);

      M$1.server = opts.url;

      var report = null;
      if (debug) {
        report = function report(error) {
          console.warn(error);
        };
      } else {
        report = function report(error) {
          error = error[0];
          event.emit('jserror', error);
          M$1.log({
            profile: 'log',
            type: error.type,
            channel: 'frontend',
            message: error.desc,
            data: error
          });
        };
      }
      _this.report = debounce(report, _this.config.delay, function () {
        _this.errorList = [];
      });
      _this.init();
      return _this;
    }

    createClass(CaptureError, [{
      key: 'init',
      value: function init() {
        var self = this;
        // 监听 JavaScript 报错异常(JavaScript runtime error)
        window.onerror = function () {
          if (window.ignoreError) {
            window.ignoreError = false;
            return;
          }
          self.handleError(formatRuntimerError.apply(null, arguments));
        };

        // 监听资源加载错误(JavaScript Scource failed to load)
        window.addEventListener('error', function (event) {
          // 过滤 target 为 window 的异常，避免与上面的 onerror 重复
          var errorTarget = event.target;
          if (errorTarget !== window && errorTarget.nodeName && LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()]) {
            self.handleError(formatLoadError(errorTarget));
          }
        }, true);

        setting({ handleTryCatchError: function handleTryCatchError(error) {
            self.handleError(formatTryCatchError(error));
          } });
      }
      /**
      * 错误数据预处理
      *
      * @param  {Object} errorLog    错误日志
      */

    }, {
      key: 'handleError',
      value: function handleError(errorLog) {
        // 是否延时处理
        if (!this.config.concat) {
          !needReport(this.config.sampling) || this.report([errorLog]);
        } else {
          this.pushError(errorLog);
          this.report(this.errorList);
        }
      }

      /**
      * 往异常信息数组里面添加一条记录
      *
      * @param  {Object} errorLog 错误日志
      */

    }, {
      key: 'pushError',
      value: function pushError(errorLog) {
        if (needReport(this.config.sampling) && this.errorList.length < this.config.maxError) {
          this.errorList.push(errorLog);
        }
      }
    }]);
    return CaptureError;
  }(CaptureErrorAbstract);

  /**
   *
   * vue里的插件
   * 用法如下
   * 在html中引入
   * <script type="text/javascript" src="http://npmprivate.xinhehui.com/error-tracker/packages/error-tracker/dist/index.js"></script>
  <script>
  var errorTracker = new ErrorTracker.Handle({
    concat: false,
    server: 'http://localhost:10086/demo/demo/vertical.jpg',
    report: function (errorLogs) {
      var error = errorLogs[0]
      let mapJS = undefined
      if (error.stack != 'no stack') {
        const stack = error.stack.split(/[\n]/)
        mapJS = stack[1].match(/\((.*)js/)
        if (mapJS) mapJS = mapJS[1] + 'js.map'
      }
      ErrorTracker.Handle.log(Object.assign(error, {profile: 'log', mapjs: mapJS, type: error.type}))
    }
  })
  在main.js中传入Vue对象
   * window.ErrorTracker.vueHandle((error) => {
    window.ErrorTracker.Handle.error(error)
  }, Vue)
  **/
  function formatComponentName(vm) {
    if (vm.$root === vm) {
      return 'root instance';
    }
    var name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
    return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options.__file ? ' at ' + vm.$options.__file : '');
  }

  function vuePlugin(cb, Vue) {
    Vue = Vue || window.Vue;

    // quit if Vue isn't on the page
    if (!Vue || !Vue.config) return;

    Vue.config.errorHandler = function VueErrorHandler(error, vm, info) {
      var metaData = {};

      // vm and lifecycleHook are not always available
      if (Object.prototype.toString.call(vm) === '[object Object]') {
        metaData.componentName = formatComponentName(vm);
        metaData.propsData = vm.$options.propsData;
      }

      if (typeof info !== 'undefined') {
        metaData.lifecycleHook = info;
      }
      cb(error, metaData);
    };
  }

  var Handle = function () {
    function Handle(opts) {
      classCallCheck(this, Handle);

      this.CaptureError = new CaptureError(opts);
    }

    createClass(Handle, [{
      key: 'on',
      value: function on() {
        event.on.apply(event, arguments);
      }
    }, {
      key: 'once',
      value: function once() {
        event.once.apply(event, arguments);
      }
    }, {
      key: 'off',
      value: function off() {
        event.off.apply(event, arguments);
      }
      /*
        对一些需要用try catch包装的地方可以使用这个简单的函数
      */

    }, {
      key: 'wrapErrors',
      value: function wrapErrors(func) {
        return tryJS.wrap(func)();
      }
    }, {
      key: 'log',
      value: function log(error) {
        if (!error) {
          throw new Error('没有传递error对象');
        }
        if (!error.type) {
          throw new Error('传递的error对象没有type类型');
        }
        event.emit('jserror', error);
        M$1.log({
          profile: 'log',
          type: error.type,
          channel: 'frontend',
          message: error.desc,
          data: error
        });
      }
    }, {
      key: 'error',
      value: function error(_error) {
        if (Object.prototype.toString.call(_error) === '[object Error]') {
          this.CaptureError.handleError(formatTryCatchError(_error));
        }
      }
    }, {
      key: 'useVue',
      value: function useVue(Vue) {
        vuePlugin(function (error) {
          Handle.error(error);
        }, Vue);
      }
    }], [{
      key: 'config',
      value: function config(opts) {
        if (!Handle.instance) {
          Handle.instance = new Handle(opts);
        }
        return Handle.instance;
      }
    }]);
    return Handle;
  }();

  return Handle;

})));
