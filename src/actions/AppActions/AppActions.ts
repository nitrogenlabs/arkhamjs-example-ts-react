import {Flux, FluxAction} from 'arkhamjs';
import {AppConstants} from '../../constants/AppConstants';
import {createBrowserHistory, History} from 'history';

export class AppActions {
  static goto(routePath: string): History {
    const history = createBrowserHistory();
    history.push(`/${routePath}`);
    return history;
  }

  static updateContent(content: string): Promise<FluxAction> {
    return Flux.dispatch({type: AppConstants.UPDATE_CONTENT, content});
  }
}
