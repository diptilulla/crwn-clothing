//represents over-all reducer based on all of the reducers

import { combineReducers } from 'redux'; //to combine reducers
import { persistReducer } from 'redux-persist'; //to persist reducer
import storage from 'redux-persist/lib/storage'; //to import localstorage from library folder

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
  //json obj that represents conf for redux persist to use
  key: "root", //at what point inside of reducer obj we want to start storing from 'root
  storage, //storage: storage from importing localstorage(storage) from redux-persist
  whitelist: ["cart"], //array containing string names of any reducer we want to store, we have user and cart, but user is handled by firebase so we want to persist only cart
};

const rootReducer = combineReducers({
  //we are returning a 1 giant obj i.e. store
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer); //returns modified version of root reducer with persistence capibilities using persistReducer function
