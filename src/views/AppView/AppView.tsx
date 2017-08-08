import {Arkham, FluxDebugLevel, FluxOptions} from 'arkhamjs';
import {config} from 'config';
import * as React from 'react';
import {Route} from 'react-router-dom';
import {AppStore} from 'stores';
import {LayoutView} from 'views';

export class AppView extends React.Component<{}, {}> {
  private arkhamConfig: FluxOptions;
  private stores: any[];
  
  constructor(props) {
    super(props);
    
    // Configuration
    this.arkhamConfig = {
      debugLevel: config.env === 'development' ? FluxDebugLevel.DISPATCH : FluxDebugLevel.DISABLED,
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
