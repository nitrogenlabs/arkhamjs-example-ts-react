import {mount} from 'enzyme';
import * as React from 'react';
import {HomeView} from 'views';
import {AppActions} from '../../actions';
import {AppConstants} from '../../constants';

describe('HomeView', () => {
  let rendered;

  beforeAll(() => {
    // Render
    rendered = mount(<HomeView/>);
  });

  it('should render', () => {
    return expect(rendered.exists()).toBe(true);
  });

  describe('#onChange', () => {
    let updateSpy;
    const inputVal: string = 'test';

    beforeAll(() => {
      // Stubs
      updateSpy = jest.spyOn(AppActions, 'updateContent');
      updateSpy.mockReturnValue({type: AppConstants.UPDATE_CONTENT, content: inputVal});

      // Vars
      rendered.instance().input.value = inputVal;

      // Method
      rendered.instance().onChange();
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
