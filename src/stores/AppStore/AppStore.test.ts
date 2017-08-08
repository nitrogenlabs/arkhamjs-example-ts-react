import {AppConstants} from 'actions';
import {AppStore} from './AppStore';

describe('AppStore', () => {
  const store = new AppStore();

  describe('#onAction', () => {
    it('should listen for AppConstants.UPDATE_CONTENT', () => {
      let state = store.getInitialState();
      const content = 'test';
      state = store.onAction(AppConstants.UPDATE_CONTENT, {content}, state);
      return expect(state.content).toBe(content);
    });
  });
});
