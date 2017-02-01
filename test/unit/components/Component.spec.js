import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Component} from 'components';
import {expect} from 'chai';

describe('Component', () => {
  let rendered;

  before(() => {
    rendered = TestUtils.renderIntoDocument(<Component className="test"/>);
  });

  it('should render', () => {
    return expect(rendered).to.be.ok;
  });

  it('#getStyles', () => {
    const styles = rendered.getStyles();
    return expect(styles).to.eq('test component');
  });

  it('#addStyles', () => {
    const styles = rendered.addStyles();
    return expect(styles.length).to.eq(0);
  });
});
