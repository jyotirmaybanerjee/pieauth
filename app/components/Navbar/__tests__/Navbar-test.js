import React from 'react';
import ReactDom from 'react-dom';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import Navbar from '../Navbar.js';

describe('Navbar', () => {
  it('Should have the correct css class', () => {
    let navbar = TestUtils.renderIntoDocument(
      <Navbar />
    );
    let element = ReactDom.findDOMNode(navbar);
    expect(element.className).to.equal('navbar-main');
  });
});
