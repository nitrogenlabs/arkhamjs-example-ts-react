import React from 'react';
import {ArkhamActions, Flux, View} from 'arkhamjs';
import {AppActions} from 'actions';
import {AppConstants} from 'constants';
import {StringService} from 'services';
import {Icon} from 'components';

export default class HomeView extends View {
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

  componentWillMount() {
    // Update title
    ArkhamActions.updateTitle('Demo');
    
    // Add listeners
    Flux.on(AppConstants.UPDATE_CONTENT, this.onUpdateContent);
  }
  
  componentWillUnmount() {
    // Add listeners
    Flux.off(AppConstants.UPDATE_CONTENT, this.onUpdateContent);
  }

  onChange() {
    const val = this._input.value;
    AppActions.updateContent(val);
  }

  onUpdateContent() {
    const content = Flux.getStore(['app', 'content'], '');
    this.setState({content});
  }

  render() {
    return (
      <div className="view view-welcome">
        <div className="logo"><img className="logo_img" src="/img/logo-main.png"/></div>
        <div className="helloTxt">{StringService.uppercaseWords(this.state.content)}</div>
        <div className="form">
          <input ref={r => this._input = r} type="text" name="test"/>
          <button className="btn btn-primary" onClick={this.onChange}><Icon name="pencil"/>UPDATE</button>
        </div>
      </div>
    );
  }
}
