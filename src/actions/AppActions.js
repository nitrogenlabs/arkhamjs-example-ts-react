import {Flux} from 'arkhamjs';
import {browserHistory} from 'react-router';
import {AppConstants} from 'constants';

const AppActions = {
  updateContent: content => {
    return Flux.dispatch({type: AppConstants.UPDATE_CONTENT, content});
  },

  updateView: path => {
    return Flux.dispatch({type: AppConstants.UPDATE_VIEW, path});
  },

  goto: route => {
    browserHistory.push(`/${route}`);
  }
};

export default AppActions;
