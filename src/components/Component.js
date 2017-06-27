import {Component} from 'react';
import PropTypes from 'prop-types';

export default class Component extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  constructor(props, name) {
    super(props);

    // Component Name
    if(typeof name === 'string') {
      this.name = name;
    } else {
      this.name = 'component';
    }

    // Methods
    this.addStyles = this.addStyles.bind(this);
    this.getStyles = this.getStyles.bind(this);
  }

  getStyles() {
    const clsNames = this.props.className || '';
    let cls = clsNames.split(' ');
    cls.push(this.name);

    // Add additional classes
    return cls.concat(this.addStyles()).filter(o => o !== '').join(' ').trim();
  }

  addStyles() {
    return [];
  }

  render() {
    return null;
  }
}
