import React from 'react';

import Directory from '../../components/directory/directory.component';

import { HomePageContainer } from './homepage.styles.jsx';

const HomePage = () => ( //functional compnent since we don't need state and lifecycle methods
  <HomePageContainer>
    <Directory />
  </HomePageContainer>    
);

export default HomePage;

