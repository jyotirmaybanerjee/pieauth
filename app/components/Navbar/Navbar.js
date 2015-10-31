import React from 'react';
import {Link} from 'react-router';
import AuthStore from '../../stores/AuthStore.js'
import AuthActions from '../../actions/AuthActions.js';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = AuthStore.getState();
    this.storeListener = this.onChange.bind(this);
  }

  componentDidMount() {
    AuthStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    AuthStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state);
  }

  logout() {
    AuthActions.logout();
  }

  render() {

    return (
      <nav className={'navbar navbar-default navbar-static-top navbar-main'}>
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/" className="navbar-brand">PAI</Link>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right" style={{marginRight: '10px'}}>
            <li><a href="#" onClick={this.logout}>Logout</a></li>  
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;

