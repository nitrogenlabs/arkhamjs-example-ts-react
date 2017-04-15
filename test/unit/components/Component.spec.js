import React from 'react';
import {shallow} from 'enzyme';
import {Component} from 'components';
import {expect} from 'chai';

describe('Component', () => {
  let rendered;

  before(() => {
    rendered = shallow(<Component className="test"/>);
  });

  it('should render', () => {
    return expect(rendered.exists()).to.be.true;
  });

  it('#getStyles', () => {
    const styles = rendered.instance().getStyles();
    return expect(styles).to.eq('test component');
  });

  it('#addStyles', () => {
    const styles = rendered.instance().addStyles();
    return expect(styles.length).to.eq(0);
  });
});
