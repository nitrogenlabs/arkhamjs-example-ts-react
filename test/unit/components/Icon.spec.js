import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Icon} from 'components';
import {expect} from 'chai';

describe('Icon', () => {
  let rendered;

  before(() => {
    rendered = TestUtils.renderIntoDocument(<Icon name="pencil"/>);
  });

  it('should render', () => {
    return expect(rendered).to.be.ok;
  });
});
