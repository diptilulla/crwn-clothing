//represents over-all reducer based on all of the reducers

import { combineReducers } from 'redux'; //to combine reducers

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

export default combineReducers({ //we are returning a 1 giant obj
    user: userReducer,
    cart: cartReducer
});
