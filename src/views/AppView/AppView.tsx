import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {Arkham} from '@nlabs/arkhamjs-views-react';
import {FluxOptions} from 'arkhamjs';
import * as React from 'react';
import {Route} from 'react-router-dom';
import {AppStore} from 'stores';
import {LayoutView} from 'views';
import {Config} from '../../config';

export class AppView extends React.Component<{}, {}> {
  private arkhamConfig: FluxOptions;
  private middleware: any[];
  private stores: any[];

  constructor(props) {
    super(props);

    // Configuration
    const storage = new BrowserStorage({type: 'session'});
    this.arkhamConfig = {
      storage
    };

    // Stores
    this.stores = [AppStore];

    // Middleware
    const env: string = Config.get('environment');
    const logger: Logger = new Logger({
      debugLevel: env === 'development' ? LoggerDebugLevel.DISPATCH : LoggerDebugLevel.DISABLED
    });
    this.middleware = [logger];
  }

  render(): JSX.Element {
    return (
      <Arkham
        config={this.arkhamConfig}
        middleware={this.middleware}
        stores={this.stores}>
        <Route path="/" component={LayoutView} />
      </Arkham>
    );
  }
}
