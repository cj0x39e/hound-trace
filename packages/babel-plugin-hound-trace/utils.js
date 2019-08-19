
function getBeforeHookCode(name, params) {
    const hookCode = `
    let __traceParent__ = window.__traceParent__;
    let __traceOldParent__ = __traceParent__;
    if (window.__trace__) {
      if (!__traceParent__.next) {
        __traceParent__.next = [];
      }
      const current = { name: '${name}', params: ${JSON.stringify(params)} };
      __traceParent__.next.push(current);
      window.__traceParent__ = current;
    }
  `;
    return hookCode;
}

function getAfterHookCode() {
    return `window.__traceParent__ = __traceOldParent__;`;
}

function ignoreFunction(name = '') {
    // ignore anonymous functions
    // ignore __NoTraceHook__ tag function
    return name === '' || name.indexOf('__NoTraceHook__') !== -1;
}

module.exports = {
    getBeforeHookCode: getBeforeHookCode,
    getAfterHookCode: getAfterHookCode,
    ignoreFunction: ignoreFunction
};