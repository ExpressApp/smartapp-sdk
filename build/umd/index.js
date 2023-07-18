(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SmartAppBridge = {}));
})(this, (function (exports) { 'use strict';

    var PLATFORM;
    (function (PLATFORM) {
        PLATFORM["WEB"] = "web";
        PLATFORM["IOS"] = "ios";
        PLATFORM["ANDROID"] = "android";
        PLATFORM["UNKNOWN"] = "unknown";
    })(PLATFORM || (PLATFORM = {}));
    var EVENT_TYPE;
    (function (EVENT_TYPE) {
        EVENT_TYPE["RECEIVE"] = "recv";
        EVENT_TYPE["SEND"] = "send";
    })(EVENT_TYPE || (EVENT_TYPE = {}));
    var HANDLER;
    (function (HANDLER) {
        HANDLER["BOTX"] = "botx";
        HANDLER["EXPRESS"] = "express";
    })(HANDLER || (HANDLER = {}));
    const RESPONSE_TIMEOUT = 30000;
    const WEB_COMMAND_TYPE = 'smartapp';
    const WEB_COMMAND_TYPE_RPC = 'smartapp_rpc';
    const WEB_COMMAND_TYPE_RPC_LOGS = 'smartAppLogs';

    const getPlatformByGetParam = () => {
        const platform = new URLSearchParams(location.search).get('platform');
        const isValidPlatform = Object.values(PLATFORM).includes(platform);
        if (isValidPlatform)
            return platform;
        return PLATFORM.UNKNOWN;
    };
    const detectPlatformByUserAgent = () => {
        if (/android/i.test(navigator.userAgent)) {
            return PLATFORM.ANDROID;
        }
        if ((/iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.userAgent.includes('Mac') && 'ontouchend' in document)) &&
            !window.MSStream)
            return PLATFORM.IOS;
        return PLATFORM.WEB;
    };
    /**
     * Get platform. Detection based on GET param `platform` or user agent.
     *
     * ```typescript
     * const platform = getPlatform();
     *
     * // => 'web' | 'ios' | 'android'
     * ```
     */
    const getPlatform = () => {
        return getPlatformByGetParam() || detectPlatformByUserAgent();
    };

    // Unique ID creation requires a high quality random # generator. In the browser we therefore
    // require the crypto API and do not support built-in fallback to lower quality random number
    // generators (like Math.random()).
    var getRandomValues;
    var rnds8 = new Uint8Array(16);
    function rng() {
      // lazy load so that environments that need to polyfill have a chance to do so
      if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
        // find the complete implementation of crypto (msCrypto) on IE11.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

        if (!getRandomValues) {
          throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
      }

      return getRandomValues(rnds8);
    }

    var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

    function validate(uuid) {
      return typeof uuid === 'string' && REGEX.test(uuid);
    }

    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */

    var byteToHex = [];

    for (var i = 0; i < 256; ++i) {
      byteToHex.push((i + 0x100).toString(16).substr(1));
    }

    function stringify(arr) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      // Note: Be careful editing this code!  It's been tuned for performance
      // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
      var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
      // of the following:
      // - One or more input array values don't map to a hex octet (leading to
      // "undefined" in the uuid)
      // - Invalid input values for the RFC `version` or `variant` fields

      if (!validate(uuid)) {
        throw TypeError('Stringified UUID is invalid');
      }

      return uuid;
    }

    function v4(options, buf, offset) {
      options = options || {};
      var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

      rnds[6] = rnds[6] & 0x0f | 0x40;
      rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

      if (buf) {
        offset = offset || 0;

        for (var i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }

        return buf;
      }

      return stringify(rnds);
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    /** Detect free variable `global` from Node.js. */

    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    var _freeGlobal = freeGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = _freeGlobal || freeSelf || Function('return this')();

    var _root = root;

    /** Built-in value references. */
    var Symbol = _root.Symbol;

    var _Symbol = Symbol;

    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    var _arrayMap = arrayMap;

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    var isArray_1 = isArray;

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto$1.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$1.toString;

    /** Built-in value references. */
    var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag$1),
          tag = value[symToStringTag$1];

      try {
        value[symToStringTag$1] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString$1.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$1] = tag;
        } else {
          delete value[symToStringTag$1];
        }
      }
      return result;
    }

    var _getRawTag = getRawTag;

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    var _objectToString = objectToString;

    /** `Object#toString` result references. */
    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';

    /** Built-in value references. */
    var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? _getRawTag(value)
        : _objectToString(value);
    }

    var _baseGetTag = baseGetTag;

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    var isObjectLike_1 = isObjectLike;

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
    }

    var isSymbol_1 = isSymbol;

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = _Symbol ? _Symbol.prototype : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray_1(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return _arrayMap(value, baseToString) + '';
      }
      if (isSymbol_1(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    var _baseToString = baseToString;

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : _baseToString(value);
    }

    var toString_1 = toString;

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    var _baseSlice = baseSlice;

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : _baseSlice(array, start, end);
    }

    var _castSlice = castSlice;

    /** Used to compose unicode character classes. */
    var rsAstralRange$2 = '\\ud800-\\udfff',
        rsComboMarksRange$3 = '\\u0300-\\u036f',
        reComboHalfMarksRange$3 = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange$3 = '\\u20d0-\\u20ff',
        rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3,
        rsVarRange$2 = '\\ufe0e\\ufe0f';

    /** Used to compose unicode capture groups. */
    var rsZWJ$2 = '\\u200d';

    /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
    var reHasUnicode = RegExp('[' + rsZWJ$2 + rsAstralRange$2  + rsComboRange$3 + rsVarRange$2 + ']');

    /**
     * Checks if `string` contains Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a symbol is found, else `false`.
     */
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }

    var _hasUnicode = hasUnicode;

    /**
     * Converts an ASCII `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function asciiToArray(string) {
      return string.split('');
    }

    var _asciiToArray = asciiToArray;

    /** Used to compose unicode character classes. */
    var rsAstralRange$1 = '\\ud800-\\udfff',
        rsComboMarksRange$2 = '\\u0300-\\u036f',
        reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange$2 = '\\u20d0-\\u20ff',
        rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2,
        rsVarRange$1 = '\\ufe0e\\ufe0f';

    /** Used to compose unicode capture groups. */
    var rsAstral = '[' + rsAstralRange$1 + ']',
        rsCombo$2 = '[' + rsComboRange$2 + ']',
        rsFitz$1 = '\\ud83c[\\udffb-\\udfff]',
        rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')',
        rsNonAstral$1 = '[^' + rsAstralRange$1 + ']',
        rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        rsZWJ$1 = '\\u200d';

    /** Used to compose unicode regexes. */
    var reOptMod$1 = rsModifier$1 + '?',
        rsOptVar$1 = '[' + rsVarRange$1 + ']?',
        rsOptJoin$1 = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
        rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
        rsSymbol = '(?:' + [rsNonAstral$1 + rsCombo$2 + '?', rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join('|') + ')';

    /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
    var reUnicode = RegExp(rsFitz$1 + '(?=' + rsFitz$1 + ')|' + rsSymbol + rsSeq$1, 'g');

    /**
     * Converts a Unicode `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }

    var _unicodeToArray = unicodeToArray;

    /**
     * Converts `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function stringToArray(string) {
      return _hasUnicode(string)
        ? _unicodeToArray(string)
        : _asciiToArray(string);
    }

    var _stringToArray = stringToArray;

    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString_1(string);

        var strSymbols = _hasUnicode(string)
          ? _stringToArray(string)
          : undefined;

        var chr = strSymbols
          ? strSymbols[0]
          : string.charAt(0);

        var trailing = strSymbols
          ? _castSlice(strSymbols, 1).join('')
          : string.slice(1);

        return chr[methodName]() + trailing;
      };
    }

    var _createCaseFirst = createCaseFirst;

    /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = _createCaseFirst('toUpperCase');

    var upperFirst_1 = upperFirst;

    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(string) {
      return upperFirst_1(toString_1(string).toLowerCase());
    }

    var capitalize_1 = capitalize;

    /**
     * A specialized version of `_.reduce` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initAccum] Specify using the first element of `array` as
     *  the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1,
          length = array == null ? 0 : array.length;

      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }

    var _arrayReduce = arrayReduce;

    /**
     * The base implementation of `_.propertyOf` without support for deep paths.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined : object[key];
      };
    }

    var _basePropertyOf = basePropertyOf;

    /** Used to map Latin Unicode letters to basic Latin letters. */
    var deburredLetters = {
      // Latin-1 Supplement block.
      '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
      '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
      '\xc7': 'C',  '\xe7': 'c',
      '\xd0': 'D',  '\xf0': 'd',
      '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
      '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
      '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
      '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
      '\xd1': 'N',  '\xf1': 'n',
      '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
      '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
      '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
      '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
      '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
      '\xc6': 'Ae', '\xe6': 'ae',
      '\xde': 'Th', '\xfe': 'th',
      '\xdf': 'ss',
      // Latin Extended-A block.
      '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
      '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
      '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
      '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
      '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
      '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
      '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
      '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
      '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
      '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
      '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
      '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
      '\u0134': 'J',  '\u0135': 'j',
      '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
      '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
      '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
      '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
      '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
      '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
      '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
      '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
      '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
      '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
      '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
      '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
      '\u0163': 't',  '\u0165': 't', '\u0167': 't',
      '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
      '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
      '\u0174': 'W',  '\u0175': 'w',
      '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
      '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
      '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
      '\u0132': 'IJ', '\u0133': 'ij',
      '\u0152': 'Oe', '\u0153': 'oe',
      '\u0149': "'n", '\u017f': 's'
    };

    /**
     * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
     * letters to basic Latin letters.
     *
     * @private
     * @param {string} letter The matched letter to deburr.
     * @returns {string} Returns the deburred letter.
     */
    var deburrLetter = _basePropertyOf(deburredLetters);

    var _deburrLetter = deburrLetter;

    /** Used to match Latin Unicode letters (excluding mathematical operators). */
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

    /** Used to compose unicode character classes. */
    var rsComboMarksRange$1 = '\\u0300-\\u036f',
        reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
        rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;

    /** Used to compose unicode capture groups. */
    var rsCombo$1 = '[' + rsComboRange$1 + ']';

    /**
     * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
     * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
     */
    var reComboMark = RegExp(rsCombo$1, 'g');

    /**
     * Deburrs `string` by converting
     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters to basic Latin letters and removing
     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = toString_1(string);
      return string && string.replace(reLatin, _deburrLetter).replace(reComboMark, '');
    }

    var deburr_1 = deburr;

    /** Used to match words composed of alphanumeric characters. */
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

    /**
     * Splits an ASCII `string` into an array of its words.
     *
     * @private
     * @param {string} The string to inspect.
     * @returns {Array} Returns the words of `string`.
     */
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }

    var _asciiWords = asciiWords;

    /** Used to detect strings that need a more robust regexp to match words. */
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

    /**
     * Checks if `string` contains a word composed of Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a word is found, else `false`.
     */
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }

    var _hasUnicodeWord = hasUnicodeWord;

    /** Used to compose unicode character classes. */
    var rsAstralRange = '\\ud800-\\udfff',
        rsComboMarksRange = '\\u0300-\\u036f',
        reComboHalfMarksRange = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange = '\\u20d0-\\u20ff',
        rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
        rsDingbatRange = '\\u2700-\\u27bf',
        rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
        rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
        rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
        rsPunctuationRange = '\\u2000-\\u206f',
        rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
        rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
        rsVarRange = '\\ufe0e\\ufe0f',
        rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

    /** Used to compose unicode capture groups. */
    var rsApos$1 = "['\u2019]",
        rsBreak = '[' + rsBreakRange + ']',
        rsCombo = '[' + rsComboRange + ']',
        rsDigits = '\\d+',
        rsDingbat = '[' + rsDingbatRange + ']',
        rsLower = '[' + rsLowerRange + ']',
        rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
        rsFitz = '\\ud83c[\\udffb-\\udfff]',
        rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
        rsNonAstral = '[^' + rsAstralRange + ']',
        rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        rsUpper = '[' + rsUpperRange + ']',
        rsZWJ = '\\u200d';

    /** Used to compose unicode regexes. */
    var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
        rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
        rsOptContrLower = '(?:' + rsApos$1 + '(?:d|ll|m|re|s|t|ve))?',
        rsOptContrUpper = '(?:' + rsApos$1 + '(?:D|LL|M|RE|S|T|VE))?',
        reOptMod = rsModifier + '?',
        rsOptVar = '[' + rsVarRange + ']?',
        rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
        rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
        rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
        rsSeq = rsOptVar + reOptMod + rsOptJoin,
        rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

    /** Used to match complex or compound words. */
    var reUnicodeWord = RegExp([
      rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
      rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
      rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
      rsUpper + '+' + rsOptContrUpper,
      rsOrdUpper,
      rsOrdLower,
      rsDigits,
      rsEmoji
    ].join('|'), 'g');

    /**
     * Splits a Unicode `string` into an array of its words.
     *
     * @private
     * @param {string} The string to inspect.
     * @returns {Array} Returns the words of `string`.
     */
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }

    var _unicodeWords = unicodeWords;

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      string = toString_1(string);
      pattern = guard ? undefined : pattern;

      if (pattern === undefined) {
        return _hasUnicodeWord(string) ? _unicodeWords(string) : _asciiWords(string);
      }
      return string.match(pattern) || [];
    }

    var words_1 = words;

    /** Used to compose unicode capture groups. */
    var rsApos = "['\u2019]";

    /** Used to match apostrophes. */
    var reApos = RegExp(rsApos, 'g');

    /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        return _arrayReduce(words_1(deburr_1(string).replace(reApos, '')), callback, '');
      };
    }

    var _createCompounder = createCompounder;

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */
    var camelCase = _createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize_1(word) : word);
    });

    var camelCase_1 = camelCase;

    /**
     * Converts `string` to
     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     */
    var snakeCase = _createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    var snakeCase_1 = snakeCase;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const isUuid = (value) => {
        return /[0-9a-fA-F-]{32}/.test(value);
    };
    const snakeCaseToCamelCase = (data) => {
        if (Array.isArray(data))
            return data.map(snakeCaseToCamelCase);
        if (!data || data.constructor?.name !== 'Object')
            return data;
        return Object.keys(data).reduce((result, key) => {
            const value = snakeCaseToCamelCase(data[key]);
            const keyValue = isUuid(key) ? key : camelCase_1(key);
            return { ...result, [keyValue]: value };
        }, {});
    };
    const camelCaseToSnakeCase = (data) => {
        if (Array.isArray(data))
            return data.map(camelCaseToSnakeCase);
        if (!data || data.constructor?.name !== 'Object')
            return data;
        return Object.keys(data).reduce((result, key) => {
            const value = camelCaseToSnakeCase(data[key]);
            return { ...result, [snakeCase_1(key)]: value };
        }, {});
    };

    var eventemitter3 = createCommonjsModule(function (module) {

    var has = Object.prototype.hasOwnProperty
      , prefix = '~';

    /**
     * Constructor to create a storage for our `EE` objects.
     * An `Events` instance is a plain object whose properties are event names.
     *
     * @constructor
     * @private
     */
    function Events() {}

    //
    // We try to not inherit from `Object.prototype`. In some engines creating an
    // instance in this way is faster than calling `Object.create(null)` directly.
    // If `Object.create(null)` is not supported we prefix the event names with a
    // character to make sure that the built-in object properties are not
    // overridden or used as an attack vector.
    //
    if (Object.create) {
      Events.prototype = Object.create(null);

      //
      // This hack is needed because the `__proto__` property is still inherited in
      // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
      //
      if (!new Events().__proto__) prefix = false;
    }

    /**
     * Representation of a single event listener.
     *
     * @param {Function} fn The listener function.
     * @param {*} context The context to invoke the listener with.
     * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
     * @constructor
     * @private
     */
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }

    /**
     * Add a listener for a given event.
     *
     * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} context The context to invoke the listener with.
     * @param {Boolean} once Specify if the listener is a one-time listener.
     * @returns {EventEmitter}
     * @private
     */
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function');
      }

      var listener = new EE(fn, context || emitter, once)
        , evt = prefix ? prefix + event : event;

      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];

      return emitter;
    }

    /**
     * Clear event by name.
     *
     * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
     * @param {(String|Symbol)} evt The Event name.
     * @private
     */
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }

    /**
     * Minimal `EventEmitter` interface that is molded against the Node.js
     * `EventEmitter` interface.
     *
     * @constructor
     * @public
     */
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }

    /**
     * Return an array listing the events for which the emitter has registered
     * listeners.
     *
     * @returns {Array}
     * @public
     */
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = []
        , events
        , name;

      if (this._eventsCount === 0) return names;

      for (name in (events = this._events)) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }

      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }

      return names;
    };

    /**
     * Return the listeners registered for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Array} The registered listeners.
     * @public
     */
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event
        , handlers = this._events[evt];

      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];

      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }

      return ee;
    };

    /**
     * Return the number of listeners listening to a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Number} The number of listeners.
     * @public
     */
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event
        , listeners = this._events[evt];

      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };

    /**
     * Calls each of the listeners registered for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Boolean} `true` if the event had listeners, else `false`.
     * @public
     */
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;

      if (!this._events[evt]) return false;

      var listeners = this._events[evt]
        , len = arguments.length
        , args
        , i;

      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

        switch (len) {
          case 1: return listeners.fn.call(listeners.context), true;
          case 2: return listeners.fn.call(listeners.context, a1), true;
          case 3: return listeners.fn.call(listeners.context, a1, a2), true;
          case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }

        for (i = 1, args = new Array(len -1); i < len; i++) {
          args[i - 1] = arguments[i];
        }

        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length
          , j;

        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

          switch (len) {
            case 1: listeners[i].fn.call(listeners[i].context); break;
            case 2: listeners[i].fn.call(listeners[i].context, a1); break;
            case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
            case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
            default:
              if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
                args[j - 1] = arguments[j];
              }

              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }

      return true;
    };

    /**
     * Add a listener for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };

    /**
     * Add a one-time listener for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };

    /**
     * Remove the listeners of a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn Only remove the listeners that match this function.
     * @param {*} context Only remove the listeners that have this context.
     * @param {Boolean} once Only remove one-time listeners.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;

      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }

      var listeners = this._events[evt];

      if (listeners.fn) {
        if (
          listeners.fn === fn &&
          (!once || listeners.once) &&
          (!context || listeners.context === context)
        ) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (
            listeners[i].fn !== fn ||
            (once && !listeners[i].once) ||
            (context && listeners[i].context !== context)
          ) {
            events.push(listeners[i]);
          }
        }

        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }

      return this;
    };

    /**
     * Remove all listeners, or those of the specified event.
     *
     * @param {(String|Symbol)} [event] The event name.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;

      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }

      return this;
    };

    //
    // Alias methods names because people roll like that.
    //
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;

    //
    // Expose the prefix.
    //
    EventEmitter.prefixed = prefix;

    //
    // Allow `EventEmitter` to be imported as module namespace.
    //
    EventEmitter.EventEmitter = EventEmitter;

    //
    // Expose the module.
    //
    {
      module.exports = EventEmitter;
    }
    });

    /**
     * Extended Event Emitted class
     *
     * ```typescript
     * const emitter = new EmitterEventPayload();
     *
     * // promise will be rejected in 20 secs
     * // if no one event has been received with type 'ref-uuid-value'
     * // otherwise promise will be fulfilled with payload object
     * const promise = emitter.onceWithTimeout('ref-uuid-value', 20000)
     * ```
     */
    class ExtendedEventEmitter extends eventemitter3 {
        constructor() {
            super();
        }
        /**
         * Wait when event with `type` will be emitted for `timeout` ms.
         *
         * ```js
         * emitter.onceWithTimeout('d6910a9d-ea24-5fc6-a654-28781ef21f8f', 20000)
         * // => Promise
         * ```
         */
        onceWithTimeout(type, timeout) {
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => reject(), timeout);
                this.once(type, (event) => {
                    clearTimeout(timer);
                    resolve(event);
                });
            });
        }
    }

    /** @ignore */
    const log = (...args) => {
        const text = args.map((arg) => (typeof arg === 'string' ? arg : JSON.stringify(arg))).join(' ');
        alert(text);
    };

    class AndroidBridge {
        eventEmitter;
        hasCommunicationObject;
        logsEnabled;
        isRenameParamsEnabledForBotx;
        handler;
        constructor() {
            this.hasCommunicationObject = typeof window.express !== 'undefined' && !!window.express.handleSmartAppEvent;
            this.eventEmitter = new ExtendedEventEmitter();
            this.logsEnabled = false;
            this.isRenameParamsEnabledForBotx = true;
            this.handler = null;
            if (!this.hasCommunicationObject) {
                log('No method "express.handleSmartAppEvent", cannot send message to Android');
                return;
            }
            // Expect json data as string
            window.handleAndroidEvent = ({ ref, data, files, }) => {
                if (this.logsEnabled)
                    console.log('Bridge ~ Incoming event', JSON.stringify({ ref, data, files }, null, 2));
                const { type, ...payload } = data;
                const emitterType = ref || EVENT_TYPE.RECEIVE;
                const isRenameParamsEnabled = this.handler === HANDLER.BOTX ? this.isRenameParamsEnabledForBotx : true;
                const eventFiles = isRenameParamsEnabled ?
                    files?.map((file) => snakeCaseToCamelCase(file)) : files;
                const event = {
                    ref,
                    type,
                    payload: isRenameParamsEnabled ? snakeCaseToCamelCase(payload) : payload,
                    files: eventFiles,
                };
                this.eventEmitter.emit(emitterType, event);
            };
        }
        /**
         * Set callback function to handle events without **ref**
         * (notifications for example).
         *
         * ```js
         * bridge.onReceive(({ type, handler, payload }) => {
         *   // Handle event data
         *   console.log('event', type, handler, payload)
         * })
         * ```
         * @param callback - Callback function.
         */
        onReceive(callback) {
            this.eventEmitter.on(EVENT_TYPE.RECEIVE, callback);
        }
        sendEvent({ handler, method, params, files, timeout = RESPONSE_TIMEOUT, guaranteed_delivery_required = false, }) {
            if (!this.hasCommunicationObject)
                return Promise.reject();
            const isRenameParamsEnabled = handler === HANDLER.BOTX ? this.isRenameParamsEnabledForBotx : true;
            const ref = v4(); // UUID to detect express response.
            const eventParams = {
                ref,
                type: WEB_COMMAND_TYPE_RPC,
                method,
                handler,
                payload: isRenameParamsEnabled ? camelCaseToSnakeCase(params) : params,
                guaranteed_delivery_required,
            };
            const eventFiles = isRenameParamsEnabled ?
                files?.map((file) => camelCaseToSnakeCase(file)) : files;
            const event = JSON.stringify(files ? { ...eventParams, files: eventFiles } : eventParams);
            if (this.logsEnabled)
                console.log('Bridge ~ Outgoing event', JSON.stringify(event, null, '  '));
            window.express.handleSmartAppEvent(event);
            return this.eventEmitter.onceWithTimeout(ref, timeout);
        }
        /**
         * Send event and wait response from express client.
         *
         * ```js
         * bridge
         *   .sendBotEvent(
         *     {
         *       method: 'get_weather',
         *       params: {
         *         city: 'Moscow',
         *       },
         *       files: []
         *     }
         *   )
         *   .then(data => {
         *     // Handle response
         *     console.log('response', data)
         *   })
         * ```
         * @param method - Event type.
         * @param params
         * @param files
         * @param timeout - Timeout in ms.
         * @param guaranteed_delivery_required - boolean.
         * @returns Promise.
         */
        sendBotEvent({ method, params, files, timeout, guaranteed_delivery_required, }) {
            return this.sendEvent({
                handler: HANDLER.BOTX,
                method,
                params,
                files,
                timeout,
                guaranteed_delivery_required,
            });
        }
        /**
         * Send event and wait response from express client.
         *
         * ```js
         * bridge
         *   .sendClientEvent(
         *     {
         *       type: 'get_weather',
         *       handler: 'express',
         *       payload: {
         *         city: 'Moscow',
         *       },
         *     }
         *   )
         *   .then(data => {
         *     // Handle response
         *     console.log('response', data)
         *   })
         * ```
         * @param method - Event type.
         * @param params
         * @param timeout - Timeout in ms.
         * @returns Promise.
         */
        sendClientEvent({ method, params, timeout }) {
            return this.sendEvent({ handler: HANDLER.EXPRESS, method, params, timeout });
        }
        /**
         * Enabling logs.
         *
         * ```js
         * bridge
         *   .enableLogs()
         * ```
         */
        enableLogs() {
            this.logsEnabled = true;
        }
        /**
         * Disabling logs.
         *
         * ```js
         * bridge
         *   .disableLogs()
         * ```
         */
        disableLogs() {
            this.logsEnabled = false;
        }
        /**
         * Enabling renaming event params from camelCase to snake_case and vice versa
         * ```js
         * bridge
         *    .enableRenameParams()
         * ```
         */
        enableRenameParams() {
            this.isRenameParamsEnabledForBotx = true;
            console.log('Bridge ~ Enabled renaming event params from camelCase to snake_case and vice versa');
        }
        /**
         * Enabling renaming event params from camelCase to snake_case and vice versa
         * ```js
         * bridge
         *    .disableRenameParams()
         * ```
         */
        disableRenameParams() {
            this.isRenameParamsEnabledForBotx = false;
            console.log('Bridge ~ Disabled renaming event params from camelCase to snake_case and vice versa');
        }
        log(data) {
            if ((!this.hasCommunicationObject || !data) ||
                (typeof data !== 'string' && typeof data !== 'object'))
                return;
            window.express.handleSmartAppEvent(JSON.stringify({ 'SmartApp Log': data }, null, 2));
        }
    }

    class IosBridge {
        eventEmitter;
        hasCommunicationObject;
        logsEnabled;
        isRenameParamsEnabledForBotx;
        handler;
        constructor() {
            this.hasCommunicationObject =
                window.webkit &&
                    window.webkit.messageHandlers &&
                    window.webkit.messageHandlers.express &&
                    !!window.webkit.messageHandlers.express.postMessage;
            this.eventEmitter = new ExtendedEventEmitter();
            this.logsEnabled = false;
            this.isRenameParamsEnabledForBotx = true;
            this.handler = null;
            if (!this.hasCommunicationObject) {
                log('No method "express.postMessage", cannot send message to iOS');
                return;
            }
            // Expect json data as string
            window.handleIosEvent = ({ ref, data, files, }) => {
                if (this.logsEnabled)
                    console.log('Bridge ~ Incoming event', JSON.stringify({ ref, data, files }, null, 2));
                const { type, ...payload } = data;
                const emitterType = ref || EVENT_TYPE.RECEIVE;
                const isRenameParamsEnabled = this.handler === HANDLER.BOTX ? this.isRenameParamsEnabledForBotx : true;
                const eventFiles = isRenameParamsEnabled ?
                    files?.map((file) => snakeCaseToCamelCase(file)) : files;
                const event = {
                    ref,
                    type,
                    payload: isRenameParamsEnabled ? snakeCaseToCamelCase(payload) : payload,
                    files: eventFiles,
                };
                this.eventEmitter.emit(emitterType, event);
            };
        }
        /**
         * Set callback function to handle events without **ref**
         * (notifications for example).
         *
         * ```js
         * bridge.onRecieve(({ type, handler, payload }) => {
         *   // Handle event data
         *   console.log('event', type, handler, payload)
         * })
         * ```
         */
        onReceive(callback) {
            this.eventEmitter.on(EVENT_TYPE.RECEIVE, callback);
        }
        sendEvent({ handler, method, params, files, timeout = RESPONSE_TIMEOUT, guaranteed_delivery_required = false, }) {
            if (!this.hasCommunicationObject)
                return Promise.reject();
            const ref = v4(); // UUID to detect express response.
            this.handler = handler;
            const isRenameParamsEnabled = handler === HANDLER.BOTX ? this.isRenameParamsEnabledForBotx : true;
            const eventProps = {
                ref,
                type: WEB_COMMAND_TYPE_RPC,
                method,
                handler,
                payload: isRenameParamsEnabled ? camelCaseToSnakeCase(params) : params,
                guaranteed_delivery_required,
            };
            const eventFiles = isRenameParamsEnabled ?
                files?.map((file) => camelCaseToSnakeCase(file)) : files;
            const event = files ? { ...eventProps, files: eventFiles } : eventProps;
            if (this.logsEnabled)
                console.log('Bridge ~ Outgoing event', JSON.stringify(event, null, '  '));
            window.webkit.messageHandlers.express.postMessage(event);
            return this.eventEmitter.onceWithTimeout(ref, timeout);
        }
        /**
         * Send event and wait response from express client.
         *
         * ```js
         * bridge
         *   .sendBotEvent(
         *     {
         *       method: 'get_weather',
         *       params: {
         *         city: 'Moscow',
         *       },
         *       files: []
         *     }
         *   )
         *   .then(data => {
         *     // Handle response
         *     console.log('response', data)
         *   })
         * ```
         */
        sendBotEvent({ method, params, files, timeout = RESPONSE_TIMEOUT, guaranteed_delivery_required, }) {
            return this.sendEvent({
                handler: HANDLER.BOTX,
                method,
                params,
                files,
                timeout,
                guaranteed_delivery_required,
            });
        }
        /**
         * Send event and wait response from express client.
         *
         * ```js
         * bridge
         *   .sendClientEvent(
         *     {
         *       type: 'get_weather',
         *       handler: 'express',
         *       payload: {
         *         city: 'Moscow',
         *       },
         *     }
         *   )
         *   .then(data => {
         *     // Handle response
         *     console.log('response', data)
         *   })
         * ```
         */
        sendClientEvent({ method, params, timeout = RESPONSE_TIMEOUT, }) {
            return this.sendEvent({
                handler: HANDLER.EXPRESS,
                method,
                params,
                timeout,
            });
        }
        /**
         * Enabling logs.
         *
         * ```js
         * bridge
         *   .enableLogs()
         * ```
         */
        enableLogs() {
            this.logsEnabled = true;
        }
        /**
         * Disabling logs.
         *
         * ```js
         * bridge
         *   .disableLogs()
         * ```
         */
        disableLogs() {
            this.logsEnabled = false;
        }
        /**
         * Enabling renaming event params from camelCase to snake_case and vice versa
         * ```js
         * bridge
         *    .enableRenameParams()
         * ```
         */
        enableRenameParams() {
            this.isRenameParamsEnabledForBotx = true;
            console.log('Bridge ~ Enabled renaming event params from camelCase to snake_case and vice versa');
        }
        /**
         * Enabling renaming event params from camelCase to snake_case and vice versa
         * ```js
         * bridge
         *    .disableRenameParams()
         * ```
         */
        disableRenameParams() {
            this.isRenameParamsEnabledForBotx = false;
            console.log('Bridge ~ Disabled renaming event params from camelCase to snake_case and vice versa');
        }
        log(data) {
            if (!this.hasCommunicationObject || !data)
                return;
            let value = '';
            if (typeof data === 'string') {
                value = data;
            }
            else if (typeof data === 'object') {
                value = JSON.stringify(data, null, 2);
            }
            else
                return;
            window.webkit.messageHandlers.express.postMessage({ 'SmartApp Log': value });
        }
    }

    class WebBridge {
        eventEmitter;
        logsEnabled;
        isRenameParamsEnabledForBotx;
        handler;
        constructor() {
            this.eventEmitter = new ExtendedEventEmitter();
            this.addGlobalListener();
            this.logsEnabled = false;
            this.isRenameParamsEnabledForBotx = true;
            this.handler = null;
        }
        addGlobalListener() {
            window.addEventListener('message', (event) => {
                if (typeof event.data !== 'object' ||
                    typeof event.data.data !== 'object' ||
                    typeof event.data.data.type !== 'string')
                    return;
                const { ref, data: { type, ...payload }, files, } = event.data;
                const isRenameParamsEnabled = this.handler === HANDLER.BOTX ? this.isRenameParamsEnabledForBotx : false;
                if (this.logsEnabled)
                    console.log('Bridge ~ Incoming event', event.data);
                const emitterType = ref || EVENT_TYPE.RECEIVE;
                const eventFiles = isRenameParamsEnabled ?
                    files?.map((file) => snakeCaseToCamelCase(file)) : files;
                this.eventEmitter.emit(emitterType, {
                    ref,
                    type,
                    payload: isRenameParamsEnabled ? snakeCaseToCamelCase(payload) : payload,
                    files: eventFiles,
                });
            });
        }
        /**
         * Set callback function to handle events without **ref**
         * (notifications for example).
         *
         * ```js
         * bridge.onReceive(({ type, handler, payload }) => {
         *   // Handle event data
         *   console.log('event', type, handler, payload)
         * })
         * ```
         */
        onReceive(callback) {
            this.eventEmitter.on(EVENT_TYPE.RECEIVE, callback);
        }
        sendEvent({ handler, method, params, files, timeout = RESPONSE_TIMEOUT, guaranteed_delivery_required = false, }) {
            const isRenameParamsEnabled = handler === HANDLER.BOTX ? this.isRenameParamsEnabledForBotx : false;
            const ref = v4(); // UUID to detect express response.
            this.handler = handler;
            const payload = {
                ref,
                type: WEB_COMMAND_TYPE_RPC,
                method,
                handler,
                payload: isRenameParamsEnabled ? camelCaseToSnakeCase(params) : params,
                guaranteed_delivery_required,
            };
            const eventFiles = isRenameParamsEnabled ?
                files?.map((file) => camelCaseToSnakeCase(file)) : files;
            const event = files ? { ...payload, files: eventFiles } : payload;
            if (this.logsEnabled)
                console.log('Bridge ~ Outgoing event', event);
            window.parent.postMessage({
                type: WEB_COMMAND_TYPE,
                payload: event,
            }, '*');
            return this.eventEmitter.onceWithTimeout(ref, timeout);
        }
        /**
         * Send event and wait response from express client.
         *
         * ```js
         * bridge
         *   .sendClientEvent(
         *     {
         *       method: 'get_weather',
         *       params: {
         *         city: 'Moscow',
         *       },
         *     }
         *   )
         *   .then(data => {
         *     // Handle response
         *     console.log('response', data)
         *   })
         * ```
         */
        sendBotEvent({ method, params, files, timeout, guaranteed_delivery_required, }) {
            return this.sendEvent({
                handler: HANDLER.BOTX,
                method,
                params,
                files,
                timeout,
                guaranteed_delivery_required,
            });
        }
        /**
         * Send event and wait response from express client.
         *
         * ```js
         * bridge
         *   .sendClientEvent(
         *     {
         *       method: 'get_weather',
         *       params: {
         *         city: 'Moscow',
         *       },
         *     }
         *   )
         *   .then(data => {
         *     // Handle response
         *     console.log('response', data)
         *   })
         * ```
         */
        sendClientEvent({ method, params, timeout }) {
            return this.sendEvent({
                handler: HANDLER.EXPRESS,
                method,
                params,
                timeout,
            });
        }
        /**
         * Enabling logs.
         *
         * ```js
         * bridge
         *   .enableLogs()
         * ```
         */
        enableLogs() {
            this.logsEnabled = true;
            const _log = console.log;
            console.log = function (...rest) {
                window.parent.postMessage({
                    type: WEB_COMMAND_TYPE_RPC_LOGS,
                    payload: rest,
                }, '*');
                _log.apply(console, rest);
            };
        }
        /**
         * Disabling logs.
         *
         * ```js
         * bridge
         *   .disableLogs()
         * ```
         */
        disableLogs() {
            this.logsEnabled = false;
        }
        /**
         * Enabling renaming event params from camelCase to snake_case and vice versa
         * ```js
         * bridge
         *    .enableRenameParams()
         * ```
         */
        enableRenameParams() {
            this.isRenameParamsEnabledForBotx = true;
            console.log('Bridge ~ Enabled renaming event params from camelCase to snake_case and vice versa');
        }
        /**
         * Enabling renaming event params from camelCase to snake_case and vice versa
         * ```js
         * bridge
         *    .disableRenameParams()
         * ```
         */
        disableRenameParams() {
            this.isRenameParamsEnabledForBotx = false;
            console.log('Bridge ~ Disabled renaming event params from camelCase to snake_case and vice versa');
        }
    }

    const LIB_VERSION = "1.1.9";

    const getBridge = () => {
        if (process.env.NODE_ENV === 'test')
            return null;
        const platform = getPlatform();
        console.log('Bridge ~ version', LIB_VERSION);
        switch (platform) {
            case PLATFORM.ANDROID:
                return new AndroidBridge();
            case PLATFORM.IOS:
                return new IosBridge();
            case PLATFORM.WEB:
                return new WebBridge();
            default:
                console.error('Wrong platform');
                break;
        }
        return null;
    };
    var bridge = getBridge();

    var METHODS;
    (function (METHODS) {
        METHODS["READY"] = "ready";
        METHODS["ROUTING_CHANGED"] = "routing_changes";
        METHODS["BACK_PRESSED"] = "back_pressed";
        METHODS["MOVE_TO_ROOT"] = "move_to_root";
        METHODS["ADD_CONTACT"] = "add_contact";
        METHODS["GET_CONTACT"] = "get_contact";
        METHODS["CREATE_PERSONAL_CHAT"] = "create_personal_chat";
        METHODS["SEND_MESSAGE"] = "send_message";
        METHODS["NOTIFICATION"] = "notification";
        METHODS["OPEN_SMART_APP"] = "open_smart_app";
        METHODS["OPEN_CLIENT_SETTINGS"] = "open_client_settings";
        METHODS["GET_CHATS"] = "get_chats";
        METHODS["SEARCH_CORPORATE_PHONEBOOK"] = "search_corporate_phonebook";
        METHODS["SEND_BOT_COMMAND"] = "send_bot_command";
        METHODS["OPEN_GROUP_CHAT"] = "open_group_chat";
        METHODS["OPEN_CONTACT_CARD"] = "open_contact_card";
        METHODS["REQUEST_LOCATION"] = "request_location";
        METHODS["REQUEST_SELF_PROFILE"] = "request_self_profile";
        METHODS["CLOSE_SMART_APP"] = "close_smart_app";
    })(METHODS || (METHODS = {}));

    var LOCATION;
    (function (LOCATION) {
        LOCATION["ROOT"] = "root";
        LOCATION["NESTED"] = "nested";
    })(LOCATION || (LOCATION = {}));

    const openClientSettings = () => {
        return bridge?.sendClientEvent({
            method: METHODS.OPEN_CLIENT_SETTINGS,
            params: {},
        });
    };
    const getChats = ({ filter = null }) => {
        return bridge?.sendClientEvent({
            method: METHODS.GET_CHATS,
            params: { filter },
        });
    };
    const searchCorporatePhonebook = ({ filter = null }) => {
        return bridge?.sendClientEvent({
            method: METHODS.SEARCH_CORPORATE_PHONEBOOK,
            params: { filter },
        });
    };
    const openGroupChat = ({ groupChatId }) => {
        return bridge?.sendClientEvent({
            method: METHODS.OPEN_GROUP_CHAT,
            params: { groupChatId },
        });
    };
    const sendBotCommand = ({ userHuid, body, data, }) => {
        if (typeof data !== 'object')
            return;
        return bridge?.sendClientEvent({
            method: METHODS.SEND_BOT_COMMAND,
            params: {
                userHuid,
                message: {
                    body,
                    data,
                },
            },
        });
    };
    const requestLocation = () => {
        return bridge?.sendClientEvent({
            method: METHODS.REQUEST_LOCATION,
            params: {},
        });
    };

    const addContact = ({ phone, name }) => {
        return bridge?.sendClientEvent({
            method: METHODS.ADD_CONTACT,
            params: {
                phone,
                name,
            },
        });
    };
    const getContact = async ({ phone }) => {
        return bridge?.sendClientEvent({
            method: METHODS.GET_CONTACT,
            params: { phone },
        });
    };
    const createPersonalChat = ({ huid }) => {
        return bridge?.sendClientEvent({
            method: METHODS.CREATE_PERSONAL_CHAT,
            params: { huid },
        });
    };
    const sendMessage = ({ userHuid = null, groupChatId = null, messageBody = '', messageMeta = {}, }) => {
        return bridge?.sendClientEvent({
            method: METHODS.SEND_MESSAGE,
            params: {
                userHuid,
                groupChatId,
                message: {
                    body: messageBody,
                    meta: messageMeta,
                },
            },
        });
    };
    const openContactCard = ({ userHuid }) => {
        if (!userHuid)
            return;
        return bridge?.sendClientEvent({
            method: METHODS.OPEN_CONTACT_CARD,
            params: { userHuid }
        });
    };
    const requestSelfProfile = () => {
        return bridge?.sendClientEvent({
            method: METHODS.REQUEST_SELF_PROFILE,
            params: {},
        });
    };

    const useQuery = () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        return Object.fromEntries(urlSearchParams.entries());
    };

    const bridgeSendReady = (timeout) => {
        const event = {
            method: METHODS.READY,
            params: {},
        };
        return bridge?.sendClientEvent(timeout ? { ...event, timeout } : event);
    };

    const ready = async (timeout) => {
        const response = await bridgeSendReady(timeout);
        const isLogsEnabled = response?.payload?.logsEnabled;
        if (isLogsEnabled)
            bridge?.enableLogs?.();
        return response;
    };

    const onNotification = async (handleNotification) => {
        const response = await bridge?.sendClientEvent({
            method: METHODS.NOTIFICATION,
            params: {},
        });
        return bridge?.onReceive((event) => {
            if (event?.type === METHODS.NOTIFICATION) {
                handleNotification(response);
            }
        });
    };

    const routingChanged = (isRoot) => {
        return bridge?.sendClientEvent({
            method: METHODS.ROUTING_CHANGED,
            params: {
                location: isRoot ? LOCATION.ROOT : LOCATION.NESTED,
            },
        });
    };
    const onBackPressed = (handleBackPressed) => {
        return bridge?.onReceive(event => {
            if (event.type === METHODS.BACK_PRESSED)
                handleBackPressed();
        });
    };
    const openSmartApp = ({ appId, meta }) => {
        return bridge?.sendClientEvent({
            method: METHODS.OPEN_SMART_APP,
            params: meta ? { appId, meta } : { appId },
        });
    };
    const closeSmartApp = () => {
        return bridge?.sendClientEvent({
            method: METHODS.CLOSE_SMART_APP,
            params: {},
        });
    };
    const onMoveToRoot = (handleMoveToRoot) => {
        return bridge?.onReceive(event => {
            if (event.type === METHODS.MOVE_TO_ROOT)
                handleMoveToRoot();
        });
    };
    const exitSmartAppToCatalog = () => {
        return bridge?.sendClientEvent({
            method: METHODS.OPEN_SMART_APP,
            params: { appId: '' },
        });
    };

    exports.Bridge = bridge;
    exports.addContact = addContact;
    exports.closeSmartApp = closeSmartApp;
    exports.createPersonalChat = createPersonalChat;
    exports.exitSmartAppToCatalog = exitSmartAppToCatalog;
    exports.getChats = getChats;
    exports.getContact = getContact;
    exports.onBackPressed = onBackPressed;
    exports.onMoveToRoot = onMoveToRoot;
    exports.onNotification = onNotification;
    exports.openClientSettings = openClientSettings;
    exports.openContactCard = openContactCard;
    exports.openGroupChat = openGroupChat;
    exports.openSmartApp = openSmartApp;
    exports.ready = ready;
    exports.requestLocation = requestLocation;
    exports.requestSelfProfile = requestSelfProfile;
    exports.routingChanged = routingChanged;
    exports.searchCorporatePhonebook = searchCorporatePhonebook;
    exports.sendBotCommand = sendBotCommand;
    exports.sendMessage = sendMessage;
    exports.useQuery = useQuery;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
