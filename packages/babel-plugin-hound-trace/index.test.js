const pluginTester = require('babel-plugin-tester');
const houndTrace = require('./index');

pluginTester({
    plugin: houndTrace,
    pluginName: 'hound-trace',
    snapshot: true,
    tests: [
        {
            title: 'function declaration',
            code: `
                function test(a, b, c) {
                    const cj = 'cj';
                }
            `
        },
        {
            title: 'function expression',
            code: `
                const test = function (a, b, c) {
                    const cj = 'cj';
                }
            `
        },
        {
            title: 'arrow function expression',
            code: `
                const test = (a, b, c) => {
                    const cj = 'cj';
                }
            `
        },
        {
            title: 'call expression with function expression',
            code: `
                callback(function () {
                })
            `
        },
        {
            title: 'call expression with arrow function expression',
            code: `
                callback(() => {})
            `
        },
        {
            title: '__NoTraceHook__ function',
            code: `
                function __NoTraceHook__A() {}

                const __NoTraceHook__B = () =>  {}

                const __NoTraceHook__C = function () { }
            `
        },
        {
            title: 'return function',
            code: `
                function A(a, b, c) {
                    if ( a === b) {
                        return 'ok';
                    }

                    switch (c) {
                        case '1':
                            return '1';
                    
                        default:
                            return '2';
                    }

                    return 'error';
                }
            `
        }
    ]
});