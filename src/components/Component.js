import React, {PropTypes} from 'react';

export default class Component extends React.Component {
  static propTypes() {
    return {
      className: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      className: ''
    };
  }

  constructor(props, name) {
    super(props);

    // Component Name
    this.name = name || 'component';

    // Methods
    this.addStyles = this.addStyles.bind(this);
  }

  getStyles() {
    const clsNames = this.props.className || '';
    let cls = clsNames.split(' ');
    cls.push(this.name);

    // Add additional classes
    return cls.concat(this.addStyles()).join(' ').trim();
  }

  addStyles() {
    return [];
  }
}
