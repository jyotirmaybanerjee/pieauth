import React from 'react';
import serialize from 'form-serialize';
import Input from 'react-bootstrap/lib/Input';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import AuthStore from '../stores/AuthStore.js'
import AuthActions from '../actions/AuthActions.js';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = AuthStore.getState();
    this.storeListener = this.onChange.bind(this);
  }

  componentDidMount() {
    AuthStore.listen(this.onChange.bind(this));
    AuthActions.getAuth({'_id': AuthStore.getAccessToken()});
  }

  componentWillUnmount() {
    AuthStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state);
    console.log('onChange AuthStore.getState()- ',AuthStore.getState());
    console.log('onChange AuthStore.isAuthenticated()- ',AuthStore.isAuthenticated());

    if (AuthStore.isAuthenticated()) {
      let nextRoute = AuthStore.getLoginReferrer();
      transition(null, nextRoute);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = serialize(e.target, {hash: true});
    AuthActions.login(data);
  }

  render() {

    let panelStyle = {
      width: '400px',
      position: 'absolute',
      left: '50%',
      marginLeft: '-200px'
    };

    return (
      <Panel header={'Login'} style={panelStyle}>
        <form id={'login-form'} onSubmit={this.handleSubmit.bind(this)}>
          {this.state.error ? (<div className={'danger-badge'}>{this.state.error}!</div>) : ''}
          <Input type="text" placeholder="Username/Email" label="Username" name="username" ref="username" groupClassName="group-class" labelClassName="label-class" />
          <Input type="password" placeholder="Password" label="Password" name="password" ref="password" groupClassName="group-class" labelClassName="label-class" />
          <Button bsStyle="primary" bsSize="small" className={'pull-right'} type="submit">Login</Button>
        </form>
      </Panel>
    );
  }
}

export default Login;
