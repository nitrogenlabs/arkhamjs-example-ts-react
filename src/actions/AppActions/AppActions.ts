import {Flux, FluxAction} from 'arkhamjs';

import {AppConstants} from '../../constants/AppConstants';

export class AppActions {
  static updateContent(content: string): Promise<FluxAction> {
    return Flux.dispatch({content, type: AppConstants.UPDATE_CONTENT});
  }
}
