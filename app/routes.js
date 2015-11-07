import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import App from './components/App/App';
import Home from './components/Home/Home';
import Contacts from './components/Contacts/Contacts';

export default (
  <Route path="/" component={App}>
  	<IndexRoute component={Home} />
    <Route path="contacts" component={Contacts}/>
  </Route>
);
