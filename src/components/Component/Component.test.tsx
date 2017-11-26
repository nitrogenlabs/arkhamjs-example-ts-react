import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Component} from './Component';

describe('Component', () => {
  let instance, rendered;

  beforeAll(() => {
    rendered = renderer.create(<Component className="test"/>);
    instance = rendered.root.instance;
  });

  it('should render', () => {
    return expect(rendered).toBeDefined();
  });

  it('#getStyles', () => {
    const styles = instance.getStyles();
    return expect(styles).toBe('test component');
  });

  it('#addStyles', () => {
    const styles = instance.addStyles();
    return expect(styles.length).toBe(0);
  });
});
