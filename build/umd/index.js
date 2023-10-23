(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash/camelCase'), require('lodash/snakeCase')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash/camelCase', 'lodash/snakeCase'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SmartAppBridge = {}, global.camelCase, global.snakeCase));
})(this, (function (exports, camelCase, snakeCase) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var camelCase__default = /*#__PURE__*/_interopDefaultLegacy(camelCase);
    var snakeCase__default = /*#__PURE__*/_interopDefaultLegacy(snakeCase);

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
            const keyValue = isUuid(key) ? key : camelCase__default["default"](key);
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
            return { ...result, [snakeCase__default["default"](key)]: value };
        }, {});
    };

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

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
        constructor() {
            this.hasCommunicationObject = typeof window.express !== 'undefined' && !!window.express.handleSmartAppEvent;
            this.eventEmitter = new ExtendedEventEmitter();
            this.logsEnabled = false;
            this.isRenameParamsEnabledForBotx = true;
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
                // const isRenameParamsEnabled = data.handler === HANDLER.BOTX ? this.isRenameParamsEnabledForBotx : true // TODO uncomment when client is ready
                const eventFiles = this.isRenameParamsEnabledForBotx ?
                    files?.map((file) => snakeCaseToCamelCase(file)) : files;
                const event = {
                    ref,
                    type,
                    payload: this.isRenameParamsEnabledForBotx ? snakeCaseToCamelCase(payload) : payload,
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
        constructor() {
            this.hasCommunicationObject =
                window.webkit &&
                    window.webkit.messageHandlers &&
                    window.webkit.messageHandlers.express &&
                    !!window.webkit.messageHandlers.express.postMessage;
            this.eventEmitter = new ExtendedEventEmitter();
            this.logsEnabled = false;
            this.isRenameParamsEnabledForBotx = true;
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
                // const isRenameParamsEnabled = data.handler === HANDLER.BOTX ? this.isRenameParamsEnabledForBotx : true // TODO uncomment when client is ready
                const eventFiles = this.isRenameParamsEnabledForBotx ?
                    files?.map((file) => snakeCaseToCamelCase(file)) : files;
                const event = {
                    ref,
                    type,
                    payload: this.isRenameParamsEnabledForBotx ? snakeCaseToCamelCase(payload) : payload,
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
        constructor() {
            this.eventEmitter = new ExtendedEventEmitter();
            this.addGlobalListener();
            this.logsEnabled = false;
            this.isRenameParamsEnabledForBotx = true;
        }
        addGlobalListener() {
            window.addEventListener('message', (event) => {
                if (typeof event.data !== 'object' ||
                    typeof event.data.data !== 'object' ||
                    typeof event.data.data.type !== 'string')
                    return;
                const { ref, data: { type, ...payload }, files, } = event.data;
                const isRenameParamsEnabled = this.isRenameParamsEnabledForBotx; // TODO fix when handler is passed
                if (this.logsEnabled)
                    console.log('Bridge ~ Incoming event', event.data);
                const emitterType = ref || EVENT_TYPE.RECEIVE;
                const eventFiles = isRenameParamsEnabled ?
                    files?.map((file) => snakeCaseToCamelCase(file)) : files;
                this.eventEmitter.emit(emitterType, {
                    ref,
                    type,
                    payload: this.isRenameParamsEnabledForBotx ? snakeCaseToCamelCase(payload) : payload,
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

    const LIB_VERSION = "1.2.1";

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
        METHODS["OPEN_FILE"] = "open_file";
        METHODS["SUBSCRIBE_CLIENT_EVENTS"] = "subscribe_client_events";
        METHODS["UNSUBSCRIBE_CLIENT_EVENTS"] = "unsubscribe_client_events";
        METHODS["GET_CONNECTION_STATUS"] = "get_connection_status";
        METHODS["CREATE_DEEPLINK"] = "create_deeplink";
    })(METHODS || (METHODS = {}));
    var STATUS;
    (function (STATUS) {
        STATUS["SUCCESS"] = "success";
        STATUS["ERROR"] = "error";
    })(STATUS || (STATUS = {}));
    var ERROR_CODES;
    (function (ERROR_CODES) {
        ERROR_CODES["NO_BRIDGE"] = "no_bridge";
        ERROR_CODES["SUBSCRIPTION_NOT_FOUND"] = "subscription_not_found";
    })(ERROR_CODES || (ERROR_CODES = {}));

    var LOCATION;
    (function (LOCATION) {
        LOCATION["ROOT"] = "root";
        LOCATION["NESTED"] = "nested";
    })(LOCATION || (LOCATION = {}));

    var SubscriptionEventType;
    (function (SubscriptionEventType) {
        SubscriptionEventType["CONNECTION_STATUS"] = "connection_status";
    })(SubscriptionEventType || (SubscriptionEventType = {}));

    const subscriptions = [];
    let bridgeEventListenerInstalled = false;
    const isAnySubscriptionsOfType = (eventType) => {
        return subscriptions.some(sub => sub.eventType == eventType);
    };
    const installBridgeEventListener = () => {
        if (bridgeEventListenerInstalled || !bridge)
            return;
        bridgeEventListenerInstalled = true;
        bridge.onReceive(event => {
            subscriptions.filter(sub => sub.eventType === event.type).map(sub => sub.callback(event));
        });
    };
    /**
     * Subscribe to special client events
     * @param eventType Event from SubscriptionEventType enum to be subscribed
     * @param callback Function to be handled when event is coming
     * @returns Promise that'll be fullfilled on successful subscription, otherwise rejected with reason
     */
    const subscribeClientEvents = (eventType, callback) => {
        const successResponse = { status: STATUS.SUCCESS };
        // No need to subscribe event twice on client
        if (isAnySubscriptionsOfType(eventType)) {
            subscriptions.push({ eventType, callback });
            return Promise.resolve(successResponse);
        }
        if (!bridge)
            return Promise.reject(ERROR_CODES.NO_BRIDGE);
        return bridge
            .sendClientEvent({
            method: METHODS.SUBSCRIBE_CLIENT_EVENTS,
            params: {
                event: eventType,
            },
        })
            .then(() => {
            installBridgeEventListener();
            subscriptions.push({ eventType, callback });
            return successResponse;
        });
    };
    /**
     * Unsubscribe from previously subscribed client events
     * @param eventType Event from SubscriptionEventType enum to be unsubscribed
     * @param callback Function to be unsibscribed
     * @returns Promise that'll be fullfilled on successful unsubscription, otherwise rejected with reason
     */
    const unsubscribeClientEvents = (eventType, callback) => {
        const successResponse = { status: STATUS.SUCCESS };
        const index = subscriptions.findIndex(sub => sub.eventType == eventType && sub.callback == callback);
        if (!bridge)
            return Promise.reject(ERROR_CODES.NO_BRIDGE);
        if (index == -1)
            return Promise.reject(ERROR_CODES.SUBSCRIPTION_NOT_FOUND);
        subscriptions.splice(index, 1);
        // Send unsubscribe to client only at last subscription
        if (isAnySubscriptionsOfType(eventType))
            return Promise.resolve(successResponse);
        return bridge
            .sendClientEvent({
            method: METHODS.UNSUBSCRIBE_CLIENT_EVENTS,
            params: {
                event: eventType,
            },
        })
            .then(() => successResponse);
    };

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
    const openFile = (file) => {
        return bridge?.sendClientEvent({
            method: METHODS.OPEN_FILE,
            params: file,
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
    /**
     * Get client current connection status. It's based on client's WebSocket connection state.
     * @returns Promise that'll be fullfilled with status data on success, otherwise rejected with reason
     */
    const getConnectionStatus = async () => {
        if (!bridge)
            return Promise.reject(ERROR_CODES.NO_BRIDGE);
        const response = await bridge.sendClientEvent({
            method: METHODS.GET_CONNECTION_STATUS,
            params: {},
        });
        return response;
    };
    /**
     * Create deeplink URL to open SmartApp
     * @param appId ID of SmartApp
     * @param meta Array of params to be included in deeplink
     * @returns Promise that'll be fullfilled with deeplink data on success, otherwise rejected with reason
     */
    const createDeeplink = async (appId, meta) => {
        if (!bridge)
            return Promise.reject(ERROR_CODES.NO_BRIDGE);
        const response = await bridge.sendClientEvent({
            method: METHODS.CREATE_DEEPLINK,
            params: { appId, meta },
        });
        return response;
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

    /**
     * @param timeout
     */
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
        if (!bridge)
            return Promise.reject(ERROR_CODES.NO_BRIDGE);
        if (isLogsEnabled)
            bridge.enableLogs?.();
        return response;
    };

    /**
     * @param handleNotification
     */
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
    exports.createDeeplink = createDeeplink;
    exports.createPersonalChat = createPersonalChat;
    exports.exitSmartAppToCatalog = exitSmartAppToCatalog;
    exports.getChats = getChats;
    exports.getConnectionStatus = getConnectionStatus;
    exports.getContact = getContact;
    exports.onBackPressed = onBackPressed;
    exports.onMoveToRoot = onMoveToRoot;
    exports.onNotification = onNotification;
    exports.openClientSettings = openClientSettings;
    exports.openContactCard = openContactCard;
    exports.openFile = openFile;
    exports.openGroupChat = openGroupChat;
    exports.openSmartApp = openSmartApp;
    exports.ready = ready;
    exports.requestLocation = requestLocation;
    exports.requestSelfProfile = requestSelfProfile;
    exports.routingChanged = routingChanged;
    exports.searchCorporatePhonebook = searchCorporatePhonebook;
    exports.sendBotCommand = sendBotCommand;
    exports.sendMessage = sendMessage;
    exports.subscribeClientEvents = subscribeClientEvents;
    exports.unsubscribeClientEvents = unsubscribeClientEvents;
    exports.useQuery = useQuery;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
