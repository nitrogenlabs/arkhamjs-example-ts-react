import {Flux, FluxAction} from 'arkhamjs';
import {AppConstants} from 'constants/AppConstants';
import {createBrowserHistory, History} from 'history';

export class AppActions {
  static goto(route: string): History {
    const history = createBrowserHistory();
    history.push(`/${route}`);
    return history;
  }

  static updateContent(content: string): Promise<FluxAction> {
    return Flux.dispatch({type: AppConstants.UPDATE_CONTENT, content});
  }

  static updateView(path: string): Promise<FluxAction> {
    return Flux.dispatch({type: AppConstants.UPDATE_VIEW, path});
  }
}
