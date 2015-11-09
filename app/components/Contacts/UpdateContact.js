import React, {Component} from 'react';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import _ from 'lodash';
import validator from 'validator';
import ContactActions from '../../actions/ContactActions';

class UpdateContact extends Component {

  constructor(props) {
    super(props);
    let newState = Object.assign({}, this.props, {showModal: false});
    this.state = newState;
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleChange() {
  	
  	this.setState({
	  	name: this.refs.name.value,
	  	email: this.refs.email.value,
	  	phone: this.refs.phone.value
  	});
  }

  updateContact() {
    let contactObj = _(this.state).pick('id', 'name', 'email', 'phone').value();
    ContactActions.editContact(contactObj);
    this.close();
  }

  render() {

    return (

      <div>
        
        <i className="fa fa-pencil pointer" onClick={this.open.bind(this)}></i>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" ref="name" placeholder="Name" onChange={this.handleChange.bind(this)} value={this.state.name} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" ref="email" placeholder="Email" onChange={this.handleChange.bind(this)} value={this.state.email} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text" className="form-control" id="phone" ref="phone" placeholder="Phone" onChange={this.handleChange.bind(this)} value={this.state.phone} />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary pull-right" onClick={this.updateContact.bind(this)}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UpdateContact;
