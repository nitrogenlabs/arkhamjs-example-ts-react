import {Flux} from 'arkhamjs';
// import createHistory from 'history/createBrowserHistory';
import {AppConstants} from 'constants';

const AppActions = {
  goto: route => {
    console.log('route', route);
    // const history = createHistory();
    // history.push(`/${route}`);
    // return history;
  },

  updateContent: content => {
    return Flux.dispatch({type: AppConstants.UPDATE_CONTENT, content});
  },

  updateView: path => {
    return Flux.dispatch({type: AppConstants.UPDATE_VIEW, path});
  }
};

export default AppActions;
