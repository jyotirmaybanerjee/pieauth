import React from 'react';
import ReactDom from 'react-dom';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';
import Profile from '../Profile.js';

describe('Profile', () => {
  it('Should have the correct css class', () => {
    let profile = TestUtils.renderIntoDocument(
      <Profile />
    );
    let element = ReactDom.findDOMNode(profile);
    expect(element.className).to.equal('profile-main');
  });
});
