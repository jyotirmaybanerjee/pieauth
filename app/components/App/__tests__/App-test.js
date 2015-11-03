// import React from 'react';
// import ReactDom from 'react-dom';
// import { expect } from 'chai';
// import TestUtils from 'react-addons-test-utils';
// import App from '../App.js';

// describe('App', () => {
//   it('Should have the correct css class', () => {
//     let app = TestUtils.renderIntoDocument(
//       <App />
//     );
//     let element = ReactDom.findDOMNode(app);
//     expect(element.className).to.equal('app-main');
//   });
// });


import React from 'react';
import ReactDom from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import expect from 'expect.js';
import App from '../App.js';

describe('App', function () {
  it('renders without problems', function () {
    var root = TestUtils.renderIntoDocument(<App/>);
    expect(root).toExist();
  });
});
