import React, {Component} from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import UpdateContact from './UpdateContact';
import ContactActions from '../../actions/ContactActions';

class Contact extends Component {

  deleteContact() {
    ContactActions.deleteContact(this.props.id);
  }

  render() {

    let rowStyle = {
      height: '30px',
      fontSize: '16px',
      borderBottom: '1px solid #a1a1a1'
    };

    return (

      <Row style={rowStyle} className="pointer">
        <Col className="col-md-1">
          <UpdateContact {...this.props} />
        </Col>
        <Col className="col-md-4">
          {this.props.name}
        </Col>
        <Col className="col-md-3">
          {this.props.email}
        </Col>
        <Col className="col-md-3">
          {this.props.phone}
        </Col>
        <Col className="col-md-1">
          <i className="fa fa-trash-o" onClick={this.deleteContact.bind(this)}/>
        </Col>
      </Row>
    );
  }
}

export default Contact;
