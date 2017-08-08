import {ArkhamActions, Flux, View, ViewProps} from 'arkhamjs';
import * as React from 'react';
import {AppActions, AppConstants} from '../../actions';
import {Icon} from '../../components';
import {StringService} from '../../services';

export interface HomeState {
  content: string;
}

export class HomeView extends View<ViewProps, HomeState> {
  input: HTMLInputElement;
  
  constructor(props) {
    super(props);
    
    // Methods
    this.onChange = this.onChange.bind(this);
    this.onUpdateContent = this.onUpdateContent.bind(this);

    // Initial state
    this.state = {
      content: Flux.getStore(['app', 'content'], '')
    };
  }

  componentWillMount(): void {
    // Update title
    ArkhamActions.updateTitle('Demo');
    
    // Add listeners
    Flux.on(AppConstants.UPDATE_CONTENT, this.onUpdateContent);
  }
  
  componentWillUnmount(): void {
    // Add listeners
    Flux.off(AppConstants.UPDATE_CONTENT, this.onUpdateContent);
  }

  onChange(): void {
    const {value} = this.input;
    AppActions.updateContent(value);
  }

  onUpdateContent(): void {
    const content = Flux.getStore(['app', 'content'], '');
    this.setState({content});
  }

  render(): JSX.Element {
    return (
      <div className="view view-home">
        <div className="logo"><img className="logo_img" src="/img/logo-main.png"/></div>
        <div className="helloTxt">{StringService.uppercaseWords(this.state.content)}</div>
        <div className="form">
          <input ref={(r: HTMLInputElement) => this.input = r} type="text" name="test"/>
          <button className="btn btn-primary" onClick={this.onChange}><Icon name="pencil"/>UPDATE</button>
        </div>
      </div>
    );
  }
}
