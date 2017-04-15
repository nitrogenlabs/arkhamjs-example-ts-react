import {Component} from 'react';
import PropTypes from 'prop-types';
import config from 'config';
import {AppActions} from 'actions';

export default class View extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  constructor(props, name, isSecured = false) {
    super(props);

    // Set initial state
    this.state = {};
    this.pageTitle = name || '';
    this.isSecured = isSecured;

    // Methods
    this.goto = this.goto.bind(this);
    this.onLoading = this.onLoading.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.viewWillMount = this.viewWillMount.bind(this);
    this.viewDidMount = this.viewDidMount.bind(this);
    this.viewWillUnmount = this.viewWillUnmount.bind(this);
  }

  componentWillMount() {
    // Can add authentication here
    if(this.isSecured) {
      // Go to login page
    }

    this.viewWillMount();
  }

  componentDidMount() {
    this.setTitle(this.pageTitle);
    this.viewDidMount();
  }

  componentWillUnmount() {
    this.viewWillUnmount();
  }

  viewWillMount() {

  }

  viewDidMount() {

  }

  viewWillUnmount() {

  }

  setTitle(name) {
    if(name === '') {
      document.title = `${config.appName}`;
    } else {
      document.title = `${name} :: ${config.appName}`;
    }

    return document.title;
  }

  onLoading(toggle) {
    this.setState({isLoading: toggle});
  }

  goto(path = '/') {
    AppActions.goto(path);
  }

  render() {
    return null;
  }
}

View.contextTypes = {
  router: PropTypes.object
};
