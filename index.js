// Automatically compile gulp tasks files on the fly from ES6 to ES5
require('babel-core/register');

// Run production server
require('./build/prod-server');