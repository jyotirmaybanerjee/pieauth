import React from 'react';
import './Footer.less';
class Footer extends React.Component {

  render() {

    return (
      <footer className={'footer-main'}>
        <div className="container">
          <div className="text-center">© 2015 Jyotirmay Banerjee.</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
