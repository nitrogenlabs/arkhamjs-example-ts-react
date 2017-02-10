import React, {Component, PropTypes} from 'react';
import config from 'config';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Flux} from 'arkhamjs';
import {AppActions} from 'actions';
import * as views from 'views';
import {AppStore} from 'stores';

const {
  WelcomeView,
  LayoutView
} = views;

export default class AppView extends Component {
  static propTypes = {
    location: PropTypes.object
  };

  constructor(props) {
    super(props);

    // Configuration
    Flux.config({
      debugLevel: config.env === 'development' ? Flux.DEBUG_DISPATCH : Flux.DEBUG_DISABLED,
      useCache: true
    });

    // Register stores
    Flux.registerStore([AppStore]);

    // Initial state
    this.state = {};

    browserHistory.listen(e => {
      AppActions.updateView(e.pathname);
    });

    // Methods
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Router key={Math.random()} history={browserHistory} onUpdate={this.onUpdate}>
        <Route path='/' component={LayoutView}>
          <IndexRoute component={WelcomeView}/>
        </Route>
      </Router>
    );
  }
}
