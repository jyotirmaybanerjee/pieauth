import alt from '../lib/alt';
import RestApi from '../lib/RestApi';

class ContactActions {

  getContacts() {

    this.dispatch();
    RestApi.get('/persons', null).then(this.actions.setContacts).catch(this.actions.setError);
  }

  setContacts(res) {
    console.log('res- ',res);
    if(res.data)
      this.dispatch(res.data);
    else
      this.dispatch();
  }

  saveContact(data) {
    this.dispatch();
    RestApi.post('/persons', data).then(this.actions.setContacts).catch(this.actions.setError);
  }

  editContact(data) {
    this.dispatch();
    RestApi.put('/persons', data).then(this.actions.setContacts).catch(this.actions.setError);
  }

  deleteContact(id) {
    this.dispatch();
    RestApi.delete(`/persons/${id}`, null).then(this.actions.setContacts).catch(this.actions.setError);
  }

  setError(res) {
    console.log('inside setError res- ',res);
    this.dispatch(res.data.error);
  }
}

export default alt.createActions(ContactActions);
