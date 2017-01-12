// Automatically compile gulp tasks files on the fly from ES6 to ES5
require('babel-core/register');

// All gulp tasks are located in the ./gulp/tasks directory
// Gulp configuration is ./build/config.js
require('require-dir')('build/tasks');