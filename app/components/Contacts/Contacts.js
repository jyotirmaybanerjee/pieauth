import React, {Component} from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ContactForm from './ContactForm';
import Contact from './Contact';
import ContactStore from '../../stores/ContactStore';
import ContactActions from '../../actions/ContactActions';

class Contacts extends Component {

  constructor() {
    super();
    this.state = {
      contacts: []
    };
  }

  componentDidMount() {

    ContactStore.listen(this.onChange.bind(this));
    ContactActions.getContacts();
  }

  componentWillUnmount() {

    ContactStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {

    this.setState(state);
  }

  newContact() {

  }

  render() {


    let contactList = this.state.contacts.map( c => {

      return ( <Contact key={c.id} name={c.name} email={c.email} phone={c.phone} /> );
    });

    if(!contactList.length) {
      contactList = <p>Your contact list is empty. Add some contacts.</p>;
    }

    return (

      <div className="container">

        <Row className="pointer">
          <Col className="col-md-12">
            <div className="pull-right">
              <ContactForm type={'new'} />
            </div>
          </Col>
        </Row>
        {contactList}
      </div>
    );
  }
}

export default Contacts;
