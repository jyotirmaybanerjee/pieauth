import cookie from 'react-cookie';
import alt from '../lib/alt';
import _ from 'lodash';
import ContactActions from '../actions/ContactActions';

class ContactStore {
  constructor() {
    this.state = this.getDefaultState();
    this.bindListeners({
      onSetContacts: ContactActions.setContacts,
      onSetError: ContactActions.setError
    });
  }

  getDefaultState() {
    return {contacts: []};
  }

  onSetContacts(contacts) {
    this.setState({contacts});
  }

  onSetError(error) {
    console.log('error- ',error);
    this.setState({error});
  }
}

export default alt.createStore(ContactStore);
