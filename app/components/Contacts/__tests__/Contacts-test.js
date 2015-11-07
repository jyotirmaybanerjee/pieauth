import React from 'react';
import ReactDom from 'react-dom';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import Contacts from '../Contacts.js';

describe('Contacts', () => {
  it('Should have the correct css class', () => {
    let contacts = TestUtils.renderIntoDocument(
      <Contacts />
    );
    let element = ReactDom.findDOMNode(contacts);
    expect(element.className).to.equal('contacts-main');
  });
});
