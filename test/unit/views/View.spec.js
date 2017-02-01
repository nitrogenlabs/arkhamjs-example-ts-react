import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {View} from 'views';
import {AppActions} from 'actions';
import sinon from 'sinon';
import {expect} from 'chai';
import config from 'config';

describe('View', () => {
  let rendered, sandbox;

  before(() => {
    // Sandbox
    sandbox = sinon.sandbox.create();

    // Render
    rendered = TestUtils.renderIntoDocument(<View/>);
  });

  after(() => {
    sandbox.restore();
  });

  it('should render', () => {
    return expect(rendered).to.be.ok;
  });

  it('#setTitle', () => {
    let name = 'Test';
    const title = rendered.setTitle(name);
    return expect(title).to.eq(`${name} :: ${config.appName}`);
  });

  describe('#goto', () => {
    let gotoStub;
    let path = '/test';

    before(() => {
      gotoStub = sandbox.stub(AppActions, 'goto');
      rendered.goto(path);
    });

    after(() => {
      // gotoStub.restore();
    });

    it('should call AppActions.goto', () => {
      return expect(gotoStub.called).to.be.true;
    });

    it('should call AppActions.goto', () => {
      return expect(gotoStub.args[0][0]).to.eq(path);
    });
  });
});
