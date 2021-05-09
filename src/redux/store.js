import { createStore, applyMiddleware } from 'redux';
//we apply middleware to store so that when actions get fired we catch them and display them
import { persistStore } from 'redux-persist'; //allows browser to cache store obj
import logger from 'redux-logger'; //catches action console logs it out and passes it further

import rootReducer from './root-reducer';

//middlewares is going to be in array form

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares)) //this will spread all methods and values in the array logger into this function as individual arguments

export const persistor = persistStore(store); //persisted version of store
