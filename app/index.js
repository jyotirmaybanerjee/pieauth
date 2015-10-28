import React from 'react';
import {Router, Route, Redirect} from 'react-router';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

import App from './components/App';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import CheckAuth from './lib/CheckAuth';
import AuthStore from './stores/AuthStore';

import './stylesheets/main.less';

let history = createBrowserHistory();

// function checkAuth(nextState, transition) {
//   console.log('checkAuth- ',AuthStore.isAuthenticated());
//   console.log('checkAuth nextState- ',nextState);
//   console.log('checkAuth transition- ',transition);
//   if (!AuthStore.isAuthenticated()) {
//     AuthStore.setLoginReferrer(nextState.location.pathname);
//     history.replaceState(null, '/login');
//     transition.to('/login');
//   }
// }

// let routes = (
//   <Route component={App}>
//     <Route path="/" component={Home} />
//     <Route path="/profile" component={Profile} onEnter={checkAuth}/>
//     <Route path="/login" component={Login} />
//     <Route path="/logout" component={Logout} />
//     <Route path="/register" component={Register} />
//   </Route>
// );

ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('app'));
