import {Logger, LoggerDebugLevel} from '@nlabs/arkhamjs-middleware-logger';
import {BrowserStorage} from '@nlabs/arkhamjs-storage-browser';
import {Arkham} from '@nlabs/arkhamjs-views-react';
import {FluxOptions} from 'arkhamjs';
import * as React from 'react';
import {Route} from 'react-router-dom';
import {AppStore} from 'stores';
import {LayoutView} from 'views';
import {Config} from '../../config';

export class AppView extends React.Component<{}, {}> {
  private arkhamConfig: FluxOptions;

  constructor(props) {
    super(props);

    // ArkhamJS Middleware
    const env: string = Config.get('environment');
    const logger: Logger = new Logger({
      debugLevel: env === 'development' ? LoggerDebugLevel.DISPATCH : LoggerDebugLevel.DISABLED
    });

    // ArkhamJS Configuration
    const storage = new BrowserStorage({type: 'session'});
    this.arkhamConfig = {
      middleware: [logger],
      storage,
      stores: [AppStore]
    };
  }

  render(): JSX.Element {
    return (
      <Arkham config={this.arkhamConfig}>
        <Route path="/" component={LayoutView} />
      </Arkham>
    );
  }
}
