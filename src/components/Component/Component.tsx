import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface ComponentProps {
  readonly className?: string;
}

export class Component<P extends ComponentProps> extends React.Component<P, {}> {
  readonly name: string;
  
  static propTypes: object = {
    className: PropTypes.string
  };

  static defaultProps: object = {
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

  getStyles(): string {
    const {className = ''} = this.props;
    const styleClasses: string[] = className.split(' ');
    styleClasses.push(this.name);

    // Add additional classes
    return styleClasses
      .concat(this.addStyles())
      .filter((style: string) => style !== '')
      .join(' ')
      .trim();
  }

  addStyles(): string[] {
    return [];
  }

  render(): JSX.Element {
    return null;
  }
}
