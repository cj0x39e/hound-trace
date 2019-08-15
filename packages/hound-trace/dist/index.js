(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global = global || self, global.houndTrace = factory());
})(this, function () { 'use strict';

    var trace = false;

    function __NoTraceHook__start() {
      if (trace) {
        return;
      }

      window.__trace__ = trace = true;
      window.__traceParent__ = {};
    }

    function __NoTraceHook__end(callback) {
      if (!trace) {
        return;
      }

      window.__trace__ = trace = false;
      callback && callback(window.__traceParent__);
    }

    var index = {
      start: __NoTraceHook__start,
      end: __NoTraceHook__end
    };

    return index;

});
