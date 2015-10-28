import React from 'react';
import {Route, Redirect} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import CheckAuth from './lib/CheckAuth';

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="/profile" component={Profile} onEnter={CheckAuth}/>
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/register" component={Register} />
  </Route>
);
