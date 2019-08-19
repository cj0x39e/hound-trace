import houndTrace from '../../hound-trace/src/index';
import renderCallStack from './renderCallStack';

import './index.css';


function start() {
    houndTrace.start();
}

function end(options) {
    houndTrace.end(callStack => {
        setTimeout(() => {
            renderCallStack(callStack, options);
        }, 14);
    });
}

export default {
    start,
    end,
    endAndRenderCallStack: end
};