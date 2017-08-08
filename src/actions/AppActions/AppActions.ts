import {Flux, FluxAction} from 'arkhamjs';
import {createBrowserHistory, History} from 'history';

export class AppConstants {
  static readonly UPDATE_CONTENT: string = 'APP_UPDATE_CONTENT';
  static readonly UPDATE_VIEW: string = 'APP_UPDATE_VIEW';
}

export class AppActions {
  static goto(route: string): History {
    const history = createBrowserHistory();
    history.push(`/${route}`);
    return history;
  }
  
  static updateContent(content: string): FluxAction {
    return Flux.dispatch({type: AppConstants.UPDATE_CONTENT, content});
  }
  
  static updateView(path: string): FluxAction {
    return Flux.dispatch({type: AppConstants.UPDATE_VIEW, path});
  }
}
