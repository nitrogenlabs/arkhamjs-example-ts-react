import {Store} from 'arkhamjs';
import {AppConstants} from 'constants';

export class AppStore extends Store {
  constructor() {
    super('app');
  }

  initialState() {
    return {
      content: 'Hello World'
    };
  }

  onAction(type, data, state) {
    switch(type) {
      case AppConstants.UPDATE_CONTENT:
        return state.set('content', data.get('content'));
    }
  }
}
