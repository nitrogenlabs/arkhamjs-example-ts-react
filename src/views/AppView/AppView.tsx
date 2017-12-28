import {FluxDebugLevel, FluxOptions} from 'arkhamjs';
import {BrowserStorage} from 'arkhamjs-storage-browser';
import {Arkham} from 'arkhamjs-views-react';
import * as React from 'react';
import {Route} from 'react-router-dom';
import {AppStore} from 'stores';
import {LayoutView} from 'views';
import {Config} from '../../config';

export class AppView extends React.Component<{}, {}> {
  private arkhamConfig: FluxOptions;
  private stores: any[];

  constructor(props) {
    super(props);

    // Configuration
    const env: string = Config.get('environment');
    const storage = new BrowserStorage({type: 'session'});
    this.arkhamConfig = {
      debugLevel: env === 'development' ? FluxDebugLevel.DISPATCH : FluxDebugLevel.DISABLED,
      storage
    };

    // Stores
    this.stores = [AppStore];
  }

  render(): JSX.Element {
    return (
      <Arkham
        config={this.arkhamConfig}
        stores={this.stores}>
        <Route path="/" component={LayoutView} />
      </Arkham>
    );
  }
}
