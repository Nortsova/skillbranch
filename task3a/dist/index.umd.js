(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

function hello(name) {
  console.log('Hello ' + name); // eslint-disable-line
}
hello('JS World');

})));
//# sourceMappingURL=index.umd.js.map
