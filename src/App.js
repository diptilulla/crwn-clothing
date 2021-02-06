import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
//we place header outside switch and route because we want it to be rendered despite whatever switch and route decides to render on dom
import { auth, createUserProfileDocument  } from './firebase/firebase.utils';

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { //auth status changed i.e. when changes occur on firebase user signs in signs out etc parameter is user state of the auth on firebase proj
      console.log(userAuth);

      if (userAuth) {//null if signing out
        const userRef = await createUserProfileDocument(userAuth); //we return userRef in createUserProfileDocument funct
        userRef.onSnapshot(snapShot => {  //we get the 1st state of the newdata we stored in userRef or already stored data in that uid, has uid
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()        //to get actual data as json object displayname email stored but without uid so need to store seperately in state of app snapShot has uid

            }
          }, 
            // () => {
            // console.log(this.state);
            // }
          );
        });
      }
      else {
        this.setState({ currentUser: userAuth }); //setting user to null when user sign out
      }
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
