import {Flux} from 'arkhamjs';
import {AppStore} from 'stores'

before(() => {
  // Stores
  Flux.registerStore([
    AppStore
  ]);
});
