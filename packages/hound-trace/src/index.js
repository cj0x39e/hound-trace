
let trace = false;

function __NoTraceHook__start() {
    if (trace) { return }

    window.__trace__ = trace = true;

    window.__traceParent__ = {};
}

function __NoTraceHook__end(callback) {
    if (!trace) { return }

    window.__trace__ = trace = false;

    callback && callback(window.__traceParent__);
}

export default {
    start: __NoTraceHook__start,
    end: __NoTraceHook__end
};