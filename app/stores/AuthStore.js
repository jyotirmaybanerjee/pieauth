import cookie from 'react-cookie';
import alt from '../lib/alt';
import _ from 'lodash';
import AuthActions from '../actions/AuthActions';

class AuthStore {
  constructor() {
    this.state = this.getDefaultState();
    this.bindListeners({
      onSetAuth: AuthActions.setAuth,
      onSetError: AuthActions.setError,
      onLogout: AuthActions.logout
    });
    this.bindActions(AuthActions);
    this.exportPublicMethods({
      getUserCookie: this.getUserCookie,
      isAuthenticated: this.isAuthenticated
    });
  }

  getDefaultState() {
    return {user: {}};
  }

  onSetAuth(user) {
    if(user._id) {
      this.setUserCookie(user);
    }
    this.setState({user});
  }

  onSetError(error) {
    console.log('error- ',error);
    cookie.remove('user');
    this.setState({error});
  }

  onLogout() {
    cookie.remove('user');
    this.setState(this.getDefaultState());
  }

  setUserCookie(user) {
    cookie.save('user', JSON.stringify(user));
  }

  getUserCookie() {
    let userCookie = cookie.load('user');
    return userCookie;
  }

  isAuthenticated() {
    return !!this.getUserCookie();
  }
}

export default alt.createStore(AuthStore);
