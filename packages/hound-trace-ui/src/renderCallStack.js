import mermaid from 'mermaid';

const DOMID = 'hound_trance_mermaid_container';

const defaultOptions = {
    maxCallFrame: 100
};

/**
 *
 * @param {function} callStack
 * @param {object} options
 * @param {object.maxCallFrame} maxCallFrame max call frame number, default 100
 */
export default function renderCallback(callStack, options) {
    const {
        maxCallFrame
    } = { ...defaultOptions, ...options };
    const element = document.createElement('div');
    element.id = DOMID;

    let graphDefinition = 'graph TB;';
    let frameCount = 0;

    const queue = [callStack];

    if (!callStack.name) {
        callStack.name = 'Begin';
    }

    for (const frame of queue) {
        if (Array.isArray(frame.next)) {
            frameCount++;
            if (frameCount > maxCallFrame) { break }

            const showLable = frame.next.length > 1;
            // eslint-disable-next-line no-loop-func
            frame.next.forEach(function (n, i) {
                graphDefinition += `\n${frame.name}-->${showLable ? '|' + (i + 1) + '|' : ''}${n.name}`;
                queue.push(n);
            });
        }
    }

    if (queue.length === 1 && !Array.isArray(queue[0].next)) {
        const frame = queue[0];
        graphDefinition += `\n${frame.name}`;
    }

    element.innerHTML = graphDefinition;

    document.body.appendChild(element);

    mermaid.initialize({
        theme: 'default',
        rightAngles: false
    });
    mermaid.init(undefined, element);
}