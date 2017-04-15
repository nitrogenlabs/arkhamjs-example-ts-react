import React from 'react';
import {shallow} from 'enzyme';
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
    rendered = shallow(<View/>);
  });

  after(() => {
    sandbox.restore();
  });

  it('should render', () => {
    return expect(rendered.exists()).to.be.true;
  });

  it('#setTitle', () => {
    let name = 'Test';
    const title = rendered.instance().setTitle(name);
    return expect(title).to.eq(`${name} :: ${config.appName}`);
  });

  describe('#goto', () => {
    let gotoStub;
    let path = '/test';

    before(() => {
      gotoStub = sandbox.stub(AppActions, 'goto');
      rendered.instance().goto(path);
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
