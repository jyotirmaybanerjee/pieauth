import React from 'react';
import ReactDom from 'react-dom';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import Footer from '../Footer.js';

describe('Footer', () => {
  it('Should have the correct css class', () => {
    let footer = TestUtils.renderIntoDocument(
      <Footer />
    );
    let element = ReactDom.findDOMNode(footer);
    expect(element.className).to.equal('footer-main');
  });
});
