import alt from '../lib/alt';
import cookie from 'react-cookie';
import RestApi from '../lib/RestApi';

class AuthActions {

  getUserDetails() {

    console.log('getAuth data- ',data);
  }

  setAuth(res) {
    console.log('res- ',res);
    if(res.data)
      this.dispatch(res.data);
    else
      this.dispatch();
  }

  login(data) {
    this.dispatch();
    RestApi.post('/login', data).then(this.actions.setAuth).catch(this.actions.setError);
  }

  register(data) {
    this.dispatch();
    RestApi.post('/register', data).then(this.actions.setAuth).catch(this.actions.setError);
  }

  logout() {
    this.dispatch();
  }

  setError(res) {
    console.log('inside setError res- ',res);
    this.dispatch(res.data.error);
  }
}

export default alt.createActions(AuthActions);
