import React from 'react';
import ReactDom from 'react-dom';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import Home from '../Home.js';

describe('Home', () => {
  it('Should have the correct css class', () => {
    let home = TestUtils.renderIntoDocument(
      <Home />
    );
    let element = ReactDom.findDOMNode(home);
    expect(element.className).to.equal('home-main');
  });
});
