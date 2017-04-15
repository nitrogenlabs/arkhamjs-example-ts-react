import React from 'react';
import {shallow} from 'enzyme';
import {AppView} from 'views';
import {expect} from 'chai';

describe('AppView', () => {
  let rendered;

  before(() => {
    // Render
    rendered = shallow(<AppView/>);
  });

  it('should render', () => {
    return expect(rendered.exists()).to.be.true;
  });
});
