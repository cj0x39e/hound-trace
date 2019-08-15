import mermaid from 'mermaid';

const DOMID = 'hound_trance_mermaid_container';

/**
 * 渲染调用栈
 */

export default function renderCallback(callStack) {
    console.log(callStack);
    let element = document.createElement('div');
    element.id = DOMID;

    let graphDefinition = 'graph TB;';

    let queue = [callStack.next[0]];

    for (const frame of queue) {
        if (Array.isArray(frame.next)) {

            const showLable = frame.next.length > 1;
            // eslint-disable-next-line no-loop-func
            frame.next.forEach(function (n, i) {
                graphDefinition += `\n${frame.name}-->${showLable ? '|' + (i + 1) + '|' : ''}${n.name}`;
                queue.push(n);
            });
        }
    }

    if (queue.length === 1) {
        const frame = queue[0];
        graphDefinition += `\n${frame.name}`;
    }

    console.log(graphDefinition);

    element.innerHTML = graphDefinition;

    document.body.appendChild(element);

    mermaid.initialize({
        theme: 'default',
        rightAngles: false
    });
    mermaid.init(undefined, element);
}