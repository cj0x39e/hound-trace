const utils = require('./utils.js');

function insertCode(babel, path, name) {
    const params = path.node.params.map(n => n.name);

    let body = path.node.body.body;

    babel.parse(utils.getBeforeHookCode(name, params)).program.body.reverse().forEach(node => {
        body.unshift(node);
    });

    babel.parse(utils.getAfterHookCode()).program.body.forEach(node => {
        body.push(node);
    });
}

function expressionHandle(babel, path) {
    if (path.parent.type !== 'VariableDeclarator') return;

    const name = (path.parent.id && path.parent.id.name) || '';

    if (utils.ignoreFunction(name)) return;

    insertCode(babel, path, name);
}

module.exports = function (babel) {

    return {
        visitor: {
            FunctionDeclaration: (path) => {
                const name = (path.node.id && path.node.id.name) || '';

                if (utils.ignoreFunction(name)) return;

                insertCode(babel, path, name);
            },
            FunctionExpression: expressionHandle.bind(null, babel),
            ArrowFunctionExpression: expressionHandle.bind(null, babel)
        }
    };
};