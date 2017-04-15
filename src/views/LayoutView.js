import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router';
import {HomeView} from 'views';

export default class LayoutView extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div className="container view-layout">
        <Route path="/" component={HomeView}/>
      </div>
    );
  }
}
