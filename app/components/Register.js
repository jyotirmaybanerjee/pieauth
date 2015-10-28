import React from 'react';
import serialize from 'form-serialize';
import Input from 'react-bootstrap/lib/Input';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import AuthStore from '../stores/AuthStore.js'
import AuthActions from '../actions/AuthActions.js';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = AuthStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AuthStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AuthStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  onSubmit(e) {
    e.preventDefault();

    let data = serialize(e.target, {hash: true});
    AuthActions.register(data);
  }

  render() {

    let panelStyle = {
      width: '400px',
      position: 'absolute',
      left: '50%',
      marginLeft: '-200px'
    };

    return (
      
      <Panel header={'Register'} style={panelStyle}>
        <form id={'login-form'} ref="form" onSubmit={this.onSubmit.bind(this)}>
          {this.state.error ? (<div className={'danger-badge'}>Wrong Username/Password!</div>) : null}
          <Input type="text" placeholder="Username/Email" label="Username" name="username" ref="username" groupClassName="group-class" labelClassName="label-class" />
          <Input type="password" placeholder="Password" label="Password" name="password" ref="password" groupClassName="group-class" labelClassName="label-class" />
          <Button bsStyle="primary" bsSize="small" className={'pull-right'} type="submit">Register</Button>
        </form>
      </Panel>
    );
  }
}

export default Register;
