import {expect} from 'chai';
import {AppConstants} from 'constants';
import {AppStore} from 'stores';
import {Map} from 'immutable';

describe('AppStore', () => {
  const store = new AppStore();

  describe('#onAction', () => {
    it('should listen for AppConstants.UPDATE_CONTENT', () => {
      let state = store.getInitialState();
      const content = 'test';
      state = store.onAction(AppConstants.UPDATE_CONTENT, Map({content}), state);
      return expect(state.get('content')).to.eq(content);
    });
  });
});
