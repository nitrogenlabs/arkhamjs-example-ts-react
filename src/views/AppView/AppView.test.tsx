import {shallow} from 'enzyme';
import * as React from 'react';
import {AppView} from 'views';

describe('AppView', () => {
  let rendered;

  beforeAll(() => {
    // Render
    rendered = shallow(<AppView/>);
  });

  it('should render', () => {
    return expect(rendered.exists()).toBe(true);
  });
});
