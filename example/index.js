import houndTrace from 'hound-trace-ui';

function f() {}

function e() {}

function d() { f() }

const b = () => { d(); e() };

const c = function () { d() };

function a() { b(); c() }

houndTrace.start();
a();
houndTrace.end();