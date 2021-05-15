import React from 'react';
import { Route, Switch , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from './components/header/header.component';
//we place header outside switch and route because we want it to be rendered despite whatever switch and route decides to render on dom

import {
  auth,
  createUserProfileDocument,
  // addCollectionAndDocuments,
} from "./firebase/firebase.utils";

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";
// import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

class App extends React.Component {
  
  unsubscribeFromAuth = null; //new method

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // const { setCurrentUser, collectionsArray } = this.props;

    // we open a connection(subscription to observable of auth data-stream) between firebase and our app and this sens us the current auth state when we instantiate listener
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { //auth status changed i.e. when changes occur on firebase user signs in signs out etc parameter is user state of the auth on firebase proj
      //auth.onAuthStateChange is observable of stream of events or data stream in auth lib, userAuth is the observer next call
      console.log(userAuth);

      if (userAuth) {//null if signing out
        const userRef = await createUserProfileDocument(userAuth); //we return userRef in createUserProfileDocument funct
        userRef.onSnapshot((snapShot) => {
          //we get the 1st state of the newdata we stored in userRef or already stored data in that uid, has uid, onSnapdhot is a listener like onAuthStateChanged which is fired when document snapshot object changes(on set, update or deleting a value)
          setCurrentUser({
            //setting payload of setCurrentUser action and in turn user reducer value with new obj when user snapShot changes
            id: snapShot.id,
            ...snapShot.data(), //to get actual data as json object displayname email stored but without uid so need to store seperately in state of app snapShot has uid
          });
        });
      }
      
        setCurrentUser(userAuth); //setting user to null when user sign out
        // addCollectionAndDocuments('collections',collectionsArray.map(({title, items}) => ({ title, items }))) //destructring off of obj and returning new array with objs with just title and items
    }, error => console.log(error)); //error call of Observer
  }

  //on calling onAuthStateChanged it gives us back a function which we store in unsubscribefromauth which when called closes the subscription
  componentWillUnmount(){
    //here we close the subcription or connection between
    this.unsubscribeFromAuth() //close subscription, we need to stop listening of auth, get rid of listener
  }
  
  render() {
    return (
      <div>
        <Header />
        <Switch>
          {/* switch when sees urs that matches path it doesn't render anything after it so if do't use exact with '/' then also /shop will not render homepage because switch matched '/' first and will not render anything else */}
          <Route exact path="/" component={HomePage} />
          {/* if this is not exact & we don't use switch then /shop will also render homepage since there is '/' in it, so we need exact '/' */}
          <Route path="/shop" component={ShopPage} /> 
          {/* this is not exact bcz we'll add categories eventually like shop/hats */}
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
          {/* render is same as render function we use determines what component to return */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = dispatch => ({ //to dispatch new action we return an object with prop name will be whatever prop we want to pass that dispatches the new action we want to pass
  setCurrentUser: user => dispatch(setCurrentUser(user))  //setCurrentUser goes to a function which gets user obejct then calls dispatch, which is a way for redux to know that whatever obj is passed inside it is an action obj passed to all reducers
  //this invokes the setCurrentUser action with user which will be used as payload in the action and this will return an object which is going to be dispatched 
});

export default connect(mapStateToProps, mapDispatchToProps)(App); //app doesnt need currentuser value sine it only sets currentUser but doesn't use it anywhere inside it apart from sending it to header so instead of mapstatetoprops we have null 
 