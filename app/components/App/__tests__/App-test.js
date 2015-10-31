import React from 'react/addons';
import App from '../App.js';
import { expect } from 'chai';

let { TestUtils } = React.addons;

describe('App', () => {
  it('Should have the correct css class', () => {
    let app = TestUtils.renderIntoDocument(
      <App />
    );
    let element = React.findDOMNode(app);
    expect(element.className).to.equal('app-main');
  });
});
