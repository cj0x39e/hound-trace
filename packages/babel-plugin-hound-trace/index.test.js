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
        }
    ]
});