import React from 'react/addons';
import Navbar from '../Navbar.js';
import { expect } from 'chai';

let { TestUtils } = React.addons;

describe('Navbar', () => {
  it('Should have the correct css class', () => {
    let navbar = TestUtils.renderIntoDocument(
      <Navbar />
    );
    let element = React.findDOMNode(navbar);
    expect(element.className).to.equal('navbar-main');
  });
});
