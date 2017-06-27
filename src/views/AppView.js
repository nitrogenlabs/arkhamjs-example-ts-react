import React from 'react';
import {Route} from 'react-router-dom';
import {Arkham, Flux} from 'arkhamjs';
import config from 'config';
import {LayoutView} from 'views';
import {AppStore} from 'stores';

export default class AppView extends React.Component {
  constructor(props) {
    super(props);
    
    // Configuration
    this.config = {
      debugLevel: config.env === 'development' ? Flux.DEBUG_DISPATCH : Flux.DEBUG_DISABLED,
      useCache: true
    };
    
    // Stores
    this._stores = [AppStore];
  }
  
  render() {
    return (
      <Arkham
        config={this.config}
        stores={this._stores}>
        <Route path='/' component={LayoutView}/>
      </Arkham>
    );
  }
}
