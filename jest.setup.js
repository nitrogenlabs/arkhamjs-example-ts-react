// Request Animation Frame
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

// Configuration
const Flux = require('arkhamjs').Flux;

Flux.init({name: 'arkhamDemo'});