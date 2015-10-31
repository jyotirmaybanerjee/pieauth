import React from 'react';
import {Route, Redirect} from 'react-router';
import App from './components/App/App';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="/profile" component={Profile}/>
  </Route>
);
