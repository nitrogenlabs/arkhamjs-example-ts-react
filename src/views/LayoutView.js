import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewContainer} from 'arkhamjs';
import {HomeView} from 'views';

export default class LayoutView extends View {
  static propTypes = {
    children: PropTypes.object
  };
  
  constructor(props) {
    super(props);
    
    this.routes = [
      {path: '/', component: HomeView, key: 'name'}
    ];
  }
  
  render() {
    return <ViewContainer className="container view-layout" routes={this.routes}/>;
  }
}
