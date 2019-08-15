import houndTrace from '../../hound-trace/src/index';
import renderCallStack from './renderCallStack';

import './index.css';


function start() {
    houndTrace.start();
}

function end() {
    houndTrace.end(callStack => {
        setTimeout(() => {
            renderCallStack(callStack);
        }, 14);
    });
}

export default {
    start,
    end,
    endAndRenderCallStack: end
};