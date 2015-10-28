import alt from '../lib/alt';
import RestApi from '../lib/RestApi';

class AuthActions {

  getAuth(data) {

    console.log('getAuth data- ',data);
    this.dispatch();
    if(data._id) {
      RestApi.post('/verify', data).then(this.actions.setAuth).catch(this.actions.setError);
    }
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
    console.log('inside register data- ',data);
    this.dispatch();
    RestApi.post('/register', data).then(this.actions.setAuth).catch(this.actions.setError);
  }

  logout() {
    this.dispatch();
  }

  setError(res) {
    this.dispatch(res.data.error);
  }
}

export default alt.createActions(AuthActions);
