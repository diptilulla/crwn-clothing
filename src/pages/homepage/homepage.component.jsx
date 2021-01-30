import React from 'react';

import Directory from '../../components/directory/directory.component';

import './homepage.styles.scss';

const HomePage = () => ( //functional compnent since we don't need state and lifecycle methods
  <div className='homepage'>
    <Directory />
  </div>
);

export default HomePage;

