import React from 'react/addons';
import Profile from '../Profile.js';
import { expect } from 'chai';

let { TestUtils } = React.addons;

describe('Profile', () => {
  it('Should have the correct css class', () => {
    let profile = TestUtils.renderIntoDocument(
      <Profile />
    );
    let element = React.findDOMNode(profile);
    expect(element.className).to.equal('profile-main');
  });
});
