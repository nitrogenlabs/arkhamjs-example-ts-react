import React from 'react';
import PropTypes from 'prop-types';
import Component from './Component';

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.string
  };

  static defaultProps = {
    size: ''
  };

  constructor(props) {
    super(props, 'icon');
  }

  addStyles() {
    let cls = [];
    const size = this.props.size.toLowerCase();

    if(size !== '') {
      cls = cls.push('icon-' + size);
    }

    return cls;
  }

  render() {
    const useTag = `<use xlink:href="/icons/icons.svg#${this.props.name}" />`;
    return <svg className={this.getStyles()} dangerouslySetInnerHTML={{__html: useTag}}/>;
  }
}
