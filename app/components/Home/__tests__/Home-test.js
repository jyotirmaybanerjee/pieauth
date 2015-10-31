import React from 'react/addons';
import Home from '../Home.js';
import { expect } from 'chai';

let { TestUtils } = React.addons;

describe('Home', () => {
  it('Should have the correct css class', () => {
    let home = TestUtils.renderIntoDocument(
      <Home />
    );
    let element = React.findDOMNode(home);
    expect(element.className).to.equal('home-main');
  });
});
