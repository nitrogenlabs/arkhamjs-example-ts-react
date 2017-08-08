// Automatically compile gulp tasks files on the fly from TypeScript to ES5
require('ts-node/register');

// All gulp tasks are located in the ./gulp/tasks directory
// Gulp configuration: ./build/config.js
require('require-dir')('build/tasks');
