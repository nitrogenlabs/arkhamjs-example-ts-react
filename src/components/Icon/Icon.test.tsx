import {shallow} from 'enzyme';
import * as React from 'react';
import {Icon} from './Icon';

describe('Icon', () => {
  let rendered;

  beforeAll(() => {
    rendered = shallow(<Icon name="pencil"/>);
  });

  it('should render', () => {
    return expect(rendered.exists()).toBe(true);
  });
});
