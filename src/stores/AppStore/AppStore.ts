import {AppConstants} from 'actions';
import {Store} from 'arkhamjs';
import {set} from 'lodash';

export class AppStore extends Store {
  constructor() {
    super('app');
  }

  initialState(): object {
    return {
      content: 'Hello World'
    };
  }

  onAction(type: string, data, state): object {
    switch(type) {
      case AppConstants.UPDATE_CONTENT:
        return set(state, 'content', data.content);
      default:
        return state;
    }
  }
}
