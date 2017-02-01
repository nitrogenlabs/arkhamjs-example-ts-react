import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {WelcomeView} from 'views';
import {AppActions} from 'actions';
import sinon from 'sinon';
import {expect} from 'chai';

describe('WelcomeView', () => {
  let rendered, sandbox;

  before(() => {
    // Sandbox
    sandbox = sinon.sandbox.create();

    // Render
    rendered = TestUtils.renderIntoDocument(<WelcomeView router={{}}/>);
  });

  after(() => {
    sandbox.restore();
  });

  it('should render', () => {
    return expect(rendered).to.be.ok;
  });

  describe('#onChange', () => {
    let updateStub;
    let inputVal = 'test';

    before(() => {
      // Stubs
      updateStub = sandbox.stub(AppActions, 'updateContent');

      // Vars
      rendered._input.value = inputVal;

      // Method
      rendered.onChange();
    });

    after(() => {
      // Restore
      updateStub.restore();
    });

    it('should clear diner results', () => {
      return expect(updateStub.called).to.be.true;
    });

    it('should clear merchant results', () => {
      return expect(updateStub.args[0][0]).to.eq(inputVal);
    });
  });
});
