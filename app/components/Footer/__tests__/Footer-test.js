import React from 'react/addons';
import Footer from '../Footer.js';
import { expect } from 'chai';

let { TestUtils } = React.addons;

describe('Footer', () => {
  it('Should have the correct css class', () => {
    let footer = TestUtils.renderIntoDocument(
      <Footer />
    );
    let element = React.findDOMNode(footer);
    expect(element.className).to.equal('footer-main');
  });
});
