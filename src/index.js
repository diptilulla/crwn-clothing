import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//browserrouter is to be wrapped around App and gives it all functionality of routing
import './index.css';
import App from './App';

ReactDOM.render(
    <BrowserRouter>  
     <App />
    </BrowserRouter>,
  document.getElementById('root')
);

