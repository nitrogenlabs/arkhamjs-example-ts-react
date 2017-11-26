import {Arkham, FluxDebugLevel, FluxOptions} from 'arkhamjs';
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
    this.arkhamConfig = {
      debugLevel: env === 'development' ? FluxDebugLevel.DISPATCH : FluxDebugLevel.DISABLED,
      useCache: true
    };
    
    // Stores
    this.stores = [AppStore];
  }
  
  render(): JSX.Element {
    return (
      <Arkham
        config={this.arkhamConfig}
        stores={this.stores}>
        <Route path="/" component={LayoutView}/>
      </Arkham>
    );
  }
}
