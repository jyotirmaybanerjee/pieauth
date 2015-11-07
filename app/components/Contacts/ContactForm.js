import React, {Component} from 'react';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import _ from 'lodash';
import ContactActions from '../../actions/ContactActions';

class ContactForm extends Component {

  constructor() {
    super();

    let name = (this.props && this.props.name) ? this.props.name : '';
    let email = (this.props && this.props.email) ? this.props.email : '';
    let phone = (this.props && this.props.phone) ? this.props.phone : '';
    this.state = {
      name: name,
      email: email,
      phone: phone,
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleChange() {
  	
    console.log('this.refs- ',this.refs);
    console.log('this.refs.name.value- ',this.refs.name.value);
    console.log('this.refs.email.value- ',this.refs.email.value);
    console.log('this.refs.phone.value- ',this.refs.phone.value);
  	this.setState({
	  	name: this.refs.name.value,
	  	email: this.refs.email.value,
	  	phone: this.refs.phone.value
  	});
    console.log('inside handleChange- ',this.state);
  }

  updateContact() {
    console.log('editing contact- ',this.state);
    let contactObj = _(this.state).pick('name', 'email', 'phone').value();
    console.log('editing contact new obj- ',contactObj);
    if(this.props.type === 'new') {
      ContactActions.saveContact(contactObj);
    } else {
      ContactActions.editContact(contactObj);
    }
  }

  render() {

      let toggleHandler = <i className="fa fa-pencil pointer" onClick={this.open.bind(this)}></i>;
      if(this.props.type === 'new') {
        toggleHandler = <i className="fa fa-plus fa-2x pointer" onClick={this.open.bind(this)}></i>;
      }
    return (

      <div>
        
        {toggleHandler}
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

export default ContactForm;
