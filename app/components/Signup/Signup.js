import React from 'react';
import serialize from 'form-serialize';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import AuthActions from '../../actions/AuthActions.js';

class Login extends React.Component {

  handleLogin(e) {
    e.preventDefault();
    let data = serialize(e.target, {hash: true});
    AuthActions.login(data);
  }

  handleRegistration(e) {
    e.preventDefault();
    let data = serialize(e.target, {hash: true});
    AuthActions.register(data);
  }

  render() {

    return (
      <div className={'container signup'}>
        <div className={'col-md-6 col-sm-6'}>
          <h3>Signup</h3>
          <form onSubmit={this.handleRegistration.bind(this)}>
            <Input type="text" label="Username" name="username" ref="username" groupClassName="group-class" labelClassName="label-class" />
            <Input type="password" label="Password" name="password" ref="password" groupClassName="group-class" labelClassName="label-class" />
            <Button bsStyle="primary" bsSize="small" className={'pull-right'} type="submit">Signup</Button>
          </form>
        </div>
        <div className={'col-md-6 col-sm-6'}>
          <h3>Login</h3>
          <form id={'login-form'} onSubmit={this.handleLogin.bind(this)}>
            <Input type="text" label="Username" name="username" ref="username" groupClassName="group-class" labelClassName="label-class" />
            <Input type="password" label="Password" name="password" ref="password" groupClassName="group-class" labelClassName="label-class" />
            <Button bsStyle="primary" bsSize="small" className={'pull-right'} type="submit">Login</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
