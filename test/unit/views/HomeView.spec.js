import React from 'react';
import {mount} from 'enzyme';
import {HomeView} from 'views';
import {AppActions} from 'actions';
import sinon from 'sinon';
import {expect} from 'chai';

describe('HomeView', () => {
  let rendered, sandbox;

  before(() => {
    // Sandbox
    sandbox = sinon.sandbox.create();

    // Render
    rendered = mount(<HomeView/>);
  });

  after(() => {
    sandbox.restore();
  });

  it('should render', () => {
    return expect(rendered.exists()).to.be.true;
  });

  describe('#onChange', () => {
    let updateStub;
    let inputVal = 'test';

    before(() => {
      // Stubs
      updateStub = sandbox.stub(AppActions, 'updateContent');

      // Vars
      rendered.instance()._input.value = inputVal;

      // Method
      rendered.instance().onChange();
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
