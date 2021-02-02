import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
//we place header outside switch and route because we want it to be rendered despite whatever switch and route decides to render on dom
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }
  
  unsubscribeFromAuth = null; //new method

  componentDidMount() {
    // we open a connection(subscription) between firebase and our app and this sens us the current auth state
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => //auth status hanged i.e. when changes occur on firebase user signs in signs out etc parameter is user state of the auth on firebase proj
      {
        this.setState({ currentUser:user });
        console.log(user);
      });
  }

  //on calling onAuthStateChanged it gives us back a function which we store in unsubscribefromauth which when called closes the subscription
  componentWillUnmount(){
    //here we close the subcription or connection between
    this.unsubscribeFromAuth() //close subscription
  }
  
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} /> 
        <Switch>
          <Route exact path='/' component={HomePage} /> 
          <Route path='/shop' component={ShopPage} /> 
          <Route path='/signin' component={SignInAndSignUp} />
        </Switch>
      </div> 
    );
  }
}

export default App;
