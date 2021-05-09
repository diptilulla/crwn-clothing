import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//browserrouter is to be wrapped around App and gives it all functionality of routing
import { Provider } from 'react-redux'; //parent of every component once passed store object will be able to give that redux store context to rest of the application, so we can dispatch actions to that store or we can pull values off the store into component
import { PersistGate } from 'redux-persist/integration/react'; //specific for react

import {store, persistor} from './redux/store';

import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}> 
    <BrowserRouter>
      <PersistGate persistor={persistor}> {/* gives context of persistReducer, receive store, fire off actions that will rehydrate state whenever tab refreshed */}
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

