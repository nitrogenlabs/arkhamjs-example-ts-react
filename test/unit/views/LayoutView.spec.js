import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {LayoutView} from 'views';
import {expect} from 'chai';

describe('LayoutView', () => {
  let rendered;

  before(() => {
    // Render
    rendered = TestUtils.renderIntoDocument(<LayoutView router={{}}/>);
  });

  it('should render', () => {
    return expect(rendered).to.be.ok;
  });
});
