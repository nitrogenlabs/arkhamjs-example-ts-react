import {Flux} from 'arkhamjs';
import * as fetch from 'isomorphic-fetch';

global.fetch = fetch;

// Configuration
Flux.config({
  name: 'arkhamDemo',
  useCache: true
});
