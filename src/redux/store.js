import { createStore, applyMiddleware } from 'redux';
//we apply middleware to store so that when actions get fired we catch them and display them
import { persistStore } from 'redux-persist'; //allows browser to cache store obj
import logger from 'redux-logger'; //catches action console logs it out and passes it further

import rootReducer from './root-reducer';

//middlewares is going to be in array form

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger); //we want logger in dev only not in production, create-react-app sets an env variable, accessed thru process.env NODE_ENV is a property on process env file either be development production or test, npm start sets NODE_ENV variable to development npm build(with heroku) sets to production
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares)) //this will spread all methods and values in the array logger into this function as individual arguments

export const persistor = persistStore(store); //persisted version of store
