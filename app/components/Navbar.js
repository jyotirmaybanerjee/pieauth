import React from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';

class Navbar extends React.Component {

  render() {

    let userSignComponents = <span />;
    if (this.state.auth.token) {

      userSignComponents = (
        <ul className="nav navbar-nav navbar-right" style={{marginRight: '10px'}}>
          <li><Link to="/logout">Logout</Link></li>  
        </ul>
      );
    } else {
      userSignComponents = (
        <ul className="nav navbar-nav navbar-right" style={{marginRight: '10px'}}>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      );
    }

    return (
      <nav className="navbar navbar-default navbar-static-top">
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
          {userSignComponents}
          {/*<ul className="nav navbar-nav navbar-right" style={{marginRight: '10px'}}>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>*/}
        </div>
      </nav>
    );
  }
}

export default Navbar;

