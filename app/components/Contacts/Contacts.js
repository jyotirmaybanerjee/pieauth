import React, {Component} from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import NewContact from './NewContact';
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

      return ( <Contact key={c.id} {...c} /> );
    });

    if(!contactList.length) {
      contactList = <p>Your contact list is empty. Add some contacts.</p>;
    }

    let rowStyle = {
      height: '30px',
      fontSize: '16px',
      borderBottom: '1px solid #a1a1a1'
    };

    return (

      <div className="container">

        <Row className="pointer">
          <Col className="col-md-12">
            <div className="pull-right">
              <NewContact />
            </div>
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col className="col-md-4 col-md-offset-1"><strong>Name</strong></Col>
          <Col className="col-md-3"><strong>Email</strong></Col>
          <Col className="col-md-3"><strong>Phone</strong></Col>
        </Row>
        {contactList}
      </div>
    );
  }
}

export default Contacts;
