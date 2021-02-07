import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
//we place header outside switch and route because we want it to be rendered despite whatever switch and route decides to render on dom
import { auth, createUserProfileDocument  } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  
  unsubscribeFromAuth = null; //new method

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // we open a connection(subscription) between firebase and our app and this sens us the current auth state
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { //auth status changed i.e. when changes occur on firebase user signs in signs out etc parameter is user state of the auth on firebase proj
      console.log(userAuth);

      if (userAuth) {//null if signing out
        const userRef = await createUserProfileDocument(userAuth); //we return userRef in createUserProfileDocument funct
        userRef.onSnapshot(snapShot => {  //we get the 1st state of the newdata we stored in userRef or already stored data in that uid, has uid
          setCurrentUser({        //setting payload of setCurrentUser action and in turn user reducer value with new obj when user snapShot changes
              id: snapShot.id,
              ...snapShot.data()        //to get actual data as json object displayname email stored but without uid so need to store seperately in state of app snapShot has uid
            });
          });
      }
      else {
        setCurrentUser(userAuth); //setting user to null when user sign out
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
        <Header /> 
        <Switch>
          <Route exact path='/' component={HomePage} /> 
          <Route path='/shop' component={ShopPage} /> 
          <Route path='/signin' component={SignInAndSignUp} />
        </Switch>
      </div> 
    );
  }
}

const mapDispatchToProps = dispatch => ({ //to dispatch new action we return an object with prop name will be whatever prop we want to pass that dispatches the new action we want to pass
  setCurrentUser: user => dispatch(setCurrentUser(user))  //setCurrentUser goes to a function which gets user obejct then calls dispatch, which is a way for redux to know that whatever obj is passed inside it is an action obj passed to all reducers
  //this invokes the setCurrentUser action with user which will be used as payload
});

export default connect(null, mapDispatchToProps)(App); //app doesnt need user so instead of mapstatetoprops we have null 
