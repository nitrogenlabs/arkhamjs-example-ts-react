import React, {Component, PropTypes} from 'react';
import config from 'config';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Flux} from 'arkhamjs';
import {AppActions} from 'actions';
import * as views from 'views';
import {AppStore} from 'stores';

// Enable debugger in dev mode
if(config.env === 'development') {
  Flux.enableDebugger();
}

const {
  WelcomeView,
  LayoutView
} = views;

export default class AppView extends Component {
  static get propTypes() {
    return {
      location: PropTypes.object
    };
  }

  constructor(props) {
    super(props);

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
      <Router history={browserHistory} onUpdate={this.onUpdate}>
        <Route path='/' component={LayoutView}>
          <IndexRoute component={WelcomeView}/>
        </Route>
      </Router>
    );
  }
}
