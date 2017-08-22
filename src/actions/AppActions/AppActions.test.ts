import {AppConstants} from '../../constants';
import {AppActions} from './AppActions';

describe('AppActions', () => {
  const path: string = 'test';
  const content: string = 'test';

  describe('#goto', () => {
    it('should go to a route', () => {
      // Method
      const history = AppActions.goto(path);
      return expect(history.location.pathname).toBe(`/${path}`);
    });
  });

  describe('#updateContent', () => {
    let action;

    beforeAll(() => {
      // Method
      action = AppActions.updateContent(content);
    });

    it('should dispatch AppConstants.UPDATE_CONTENT', () => {
      expect(action.type).toBe(AppConstants.UPDATE_CONTENT);
    });

    it('should contain content in action', () => {
      expect(action.content).toBe(content);
    });
  });

  describe('#updateView', () => {
    let action;

    beforeAll(() => {
      // Method
      action = AppActions.updateView(path);
    });

    it('should dispatch AppConstants.UPDATE_VIEW', () => {
      return expect(action.type).toBe(AppConstants.UPDATE_VIEW);
    });

    it('should contain content in action', () => {
      expect(action.path).toBe(path);
    });
  });
});
