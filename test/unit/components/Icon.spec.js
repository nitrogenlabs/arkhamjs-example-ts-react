import React from 'react';
import {shallow} from 'enzyme';
import {Icon} from 'components';
import {expect} from 'chai';

describe('Icon', () => {
  let rendered;

  before(() => {
    rendered = shallow(<Icon name="pencil"/>);
  });

  it('should render', () => {
    return expect(rendered.exists()).to.be.true;
  });
});
