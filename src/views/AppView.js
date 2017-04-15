import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import config from 'config';
import {Flux} from 'arkhamjs';
import {LayoutView} from 'views';
import {AppStore} from 'stores';

export default class AppView extends Component {
  constructor(props) {
    super(props);

    // Configuration
    Flux.config({
      debugLevel: config.env === 'development' ? Flux.DEBUG_DISPATCH : Flux.DEBUG_DISABLED,
      useCache: true
    });

    // Register stores
    Flux.registerStore([AppStore]);
    
    // Methods
    this.onUpdate = this.onUpdate.bind(this);
  }
  
  onUpdate() {
    // Scroll to the top
    window.scrollTo(0, 0);
    return true;
  }
  
  render() {
    return (
      <Router
        forceRefresh={'pushState' in window.history}
        getUserConfirmation={this.onUpdate}>
        <Route path='/' component={LayoutView}/>
      </Router>
    );
  }
}
