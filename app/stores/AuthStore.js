import cookie from 'react-cookie';
import alt from '../lib/alt';
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
      getAccessToken: this.getAccessToken,
      getLoginReferrer: this.getLoginReferrer,
      setLoginReferrer: this.setLoginReferrer,
      isAuthenticated: this.isAuthenticated
    });
  }

  getDefaultState() {
    return {auth: {}};
  }

  onSetAuth(auth) {
    if(auth._id) {
      cookie.save('userId', auth._id);
    }
    this.setState({auth});
  }

  onSetError(error) {
    cookie.remove('userId');
    this.setState({error});
  }

  onLogout() {
    cookie.remove('loginReferrer');
    cookie.remove('userId');
    this.setState(this.getDefaultState());
  }

  getAccessToken() {
    return cookie.load('userId');
  }

  getLoginReferrer() {
    return cookie.load('loginReferrer') || '/';
  }

  setLoginReferrer(path) {
    console.log('setLoginReferrer- ',path);
    cookie.save('loginReferrer', path);
  }

  isAuthenticated() {
    return !!this.getAccessToken();
  }
}

export default alt.createStore(AuthStore);
