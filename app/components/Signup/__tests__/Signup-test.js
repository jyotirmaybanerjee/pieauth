import React from 'react';
import ReactDom from 'react-dom';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import Signup from '../Signup.js';

describe('Signup', () => {
  it('Should have the correct css class', () => {
    let signup = TestUtils.renderIntoDocument(
      <Signup />
    );
    let element = ReactDom.findDOMNode(signup);
    expect(element.className).to.equal('signup');
  });
});
