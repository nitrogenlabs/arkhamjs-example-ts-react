import {AppActions} from '../../actions';
import {AppConstants} from '../../constants/AppConstants';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {HomeView} from './HomeView';
import SpyInstance = jest.SpyInstance;

describe('HomeView', () => {
  let instance, rendered;

  beforeAll(() => {
    // Render
    rendered = renderer.create(<HomeView />);
    instance = rendered.root.instance;
  });

  it('should render', () => {
    return expect(rendered).toBeDefined();
  });

  describe('#onChange', () => {
    let updateSpy: SpyInstance;
    const inputVal: string = 'test';

    beforeAll(() => {
      // Stubs
      updateSpy = jest.spyOn(AppActions, 'updateContent');
      updateSpy.mockReturnValue({type: AppConstants.UPDATE_CONTENT, content: inputVal});

      // Vars
      instance.input = {value: inputVal};

      // Method
      instance.onChange();
    });

    afterAll(() => {
      // Restore
      updateSpy.mockRestore();
    });

    it('should clear diner results', () => {
      return expect(updateSpy.mock.calls.length).toBe(1);
    });

    it('should clear merchant results', () => {
      return expect(updateSpy.mock.calls[0][0]).toBe(inputVal);
    });
  });
});
