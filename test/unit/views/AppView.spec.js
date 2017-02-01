import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {AppView} from 'views';
import {expect} from 'chai';

describe('AppView', () => {
  let rendered;

  before(() => {
    // Render
    rendered = TestUtils.renderIntoDocument(<AppView/>);
  });

  it('should render', () => {
    return expect(rendered).to.be.ok;
  });
});
