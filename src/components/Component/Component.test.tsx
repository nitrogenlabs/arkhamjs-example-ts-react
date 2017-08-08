import {shallow} from 'enzyme';
import * as React from 'react';
import {Component} from './Component';

describe('Component', () => {
  let rendered;

  beforeAll(() => {
    rendered = shallow(<Component className="test"/>);
  });

  it('should render', () => {
    return expect(rendered.exists()).toBe(true);
  });

  it('#getStyles', () => {
    const styles = rendered.instance().getStyles();
    return expect(styles).toBe('test component');
  });

  it('#addStyles', () => {
    const styles = rendered.instance().addStyles();
    return expect(styles.length).toBe(0);
  });
});
