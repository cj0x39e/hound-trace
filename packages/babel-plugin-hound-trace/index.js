const utils = require('./utils.js');

function insertCode(babel, path, name) {
    const params = path.node.params.map(n => n.name);

    let body = path.node.body.body;

    babel.parse(utils.getBeforeHookCode(name, params)).program.body.reverse().forEach(node => {
        body.unshift(node);
    });

    const afterNode = babel.parse(utils.getAfterHookCode()).program.body[0];

    // handler function return
    path.traverse({
        ReturnStatement: (subPath) => {

            const parentBody = subPath.parent.body || subPath.parent.consequent;
            if (parentBody) {
                let returnIndex = -1;
                for (let i = 0; i < parentBody.length; i++) {
                    if (parentBody[i].type === 'ReturnStatement') {
                        returnIndex = i;
                        break;
                    }
                }
                if (returnIndex !== -1) {
                    if (returnIndex === 0) {
                        parentBody.unshift(afterNode);
                    } else {
                        parentBody.splice(returnIndex, 0, afterNode);
                    }
                }
            }
        }
    });

    // handler no return
    body.push(afterNode);
}

function expressionHandle(babel, path) {

    const parentType = path.parent.type;
    let name;

    if (parentType === 'VariableDeclarator') {
        name = (path.parent.id && path.parent.id.name) || '';
    } else if (parentType === 'ObjectProperty') {
        name = (path.parent.key && path.parent.key.name) || '';
    } else {
        return;
    }

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