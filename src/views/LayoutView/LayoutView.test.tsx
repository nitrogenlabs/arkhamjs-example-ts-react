import {shallow} from 'enzyme';
import * as React from 'react';
import {LayoutView} from 'views';

describe('LayoutView', () => {
  let rendered;
  
  beforeAll(() => {
    // Render
    rendered = shallow(<LayoutView/>);
  });
  
  it('should render', () => {
    return expect(rendered.exists()).toBe(true);
  });
});
