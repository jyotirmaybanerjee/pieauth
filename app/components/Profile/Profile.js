import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';

class Profile extends React.Component {

  render() {

    let formStyle = {
      width: '700px',
      position: 'absolute',
      left: '50%',
      marginLeft: '-350px'
    };

    return (
      <div className={'container profile-main'}>
        <h3>Profile</h3>
        <form className="form-horizontal" style={formStyle}>
          <Input type="text" label="First Name" name="firstname" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
          <Input type="text" label="Last Name" name="lastname" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
          <Input type="text" label="Mobile No" name="mobile" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
          <Button className={'pull-right'} bsStyle="primary" bsSize="small">Save</Button>
        </form>
      </div>
    );
  }
}

export default Profile;
