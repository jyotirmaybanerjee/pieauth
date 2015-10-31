import React from 'react/addons';
import Register from '../Register.js';
import { expect } from 'chai';

let { TestUtils } = React.addons;

describe('Register', () => {
  it('Should have the correct css class', () => {
    let register = TestUtils.renderIntoDocument(
      <Register />
    );
    let element = React.findDOMNode(register);
    expect(element.className).to.equal('register-main');
  });
});
