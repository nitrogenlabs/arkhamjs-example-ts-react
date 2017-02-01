import React, {Component, PropTypes} from 'react';

export default class LayoutView extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div className="container view-layout">
        {this.props.children}
      </div>
    );
  }
}
