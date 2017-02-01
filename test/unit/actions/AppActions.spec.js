import sinon from 'sinon';
import {expect} from 'chai';
import {AppActions} from 'actions';
import {AppConstants} from 'constants';
import {browserHistory} from 'react-router';

describe('ConcessionActions', () => {
  let sandbox;
  const path = 'test';
  const content = 'test';

  before(() => {
    // Sandbox
    sandbox = sinon.sandbox.create();
  });

  after(() => {
    // Restore
    sandbox.restore();
  });

  describe('#goto', () => {
    let browserStub;

    before(() => {
      // Stubs
      browserStub = sandbox.stub(browserHistory, 'push');

      // Method
      AppActions.goto(path);
    });

    after(() => {
      // Stubs
      browserStub.restore();
    });

    it('should call browserHistory.push', () => {
      return expect(browserStub.called).to.be.true;
    });

    it('should go to a route', () => {
      expect(browserStub.args[0][0]).to.be.eq(`/${path}`);
    });
  });

  describe('#updateContent', () => {
    let action;

    before(() => {
      // Method
      action = AppActions.updateContent(content);
    });

    it('should dispatch AppConstants.UPDATE_CONTENT', () => {
      expect(action.get('type')).to.eq(AppConstants.UPDATE_CONTENT);
    });

    it('should contain content in action', () => {
      expect(action.get('content')).to.eq(content);
    });
  });

  describe('#updateView', () => {
    let action;

    before(() => {
      // Method
      action = AppActions.updateView(path);
    });

    it('should dispatch AppConstants.UPDATE_VIEW', () => {
      return expect(action.get('type')).to.eq(AppConstants.UPDATE_VIEW);
    });

    it('should contain content in action', () => {
      expect(action.get('path')).to.eq(path);
    });
  });
});
