import React from 'react';
import {shallow} from 'enzyme';
import {LayoutView} from 'views';
import {expect} from 'chai';

describe('LayoutView', () => {
  let rendered;
  
  before(() => {
    // Render
    rendered = shallow(<LayoutView/>);
  });
  
  it('should render', () => {
    return expect(rendered.exists()).to.be.true;
  });
});
