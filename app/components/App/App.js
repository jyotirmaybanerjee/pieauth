import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Signup from '../Signup/Signup';
import AuthStore from '../../stores/AuthStore.js'
import AuthActions from '../../actions/AuthActions.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = AuthStore.getState();
    this.storeListener = this.onChange.bind(this);
  }

  componentDidMount() {
    AuthStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    AuthStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state);
  }

  render() {

  	let mainComponent = <span />;
    if (AuthStore.isAuthenticated()) {
      mainComponent = (
        <div>
		      <Navbar history={this.props.history} />
          {this.props.children}
          <Footer />
        </div>
      );
    } else {
      mainComponent = (
        <div>
          <Signup />
        </div>
      );
    }

    return (
      <div className={'app-main'}>
		    {mainComponent}
      </div>
    );
  }
}

export default App;

