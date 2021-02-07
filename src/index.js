import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//browserrouter is to be wrapped around App and gives it all functionality of routing
import { Provider } from 'react-redux'; //parent of every component once passed store object will be able to give that redux store context to rest of the application, so we can dispatch actions to that store or we can pull values off the store into component

import store from './redux/store';

import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}> 
    <BrowserRouter>  
     <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

