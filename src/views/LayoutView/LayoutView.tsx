import {ViewBase, ViewContainer, ViewProps} from '@nlabs/arkhamjs-views-react';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {RouteProps} from 'react-router';
import {HomeView} from '../../views';

export interface LayoutProps extends ViewProps {
  readonly children?: React.ReactNode;
}

export class LayoutView extends ViewBase<LayoutProps, {}> {
  routes: RouteProps[];

  static propTypes: object = {
    ...ViewBase.propTypes,
    children: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.routes = [{path: '/', component: HomeView}];
  }

  render(): JSX.Element {
    return <ViewContainer className="container view-layout" routes={this.routes} />;
  }
}
