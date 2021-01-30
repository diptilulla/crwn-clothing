import React from 'react';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size }) => (
  <div className={`${size} menu-item`}>
    <div 
      className='background-image'
      style={{ //style is a property of html elements style takes an object that has prop values = css values but camelcased
        backgroundImage: `url(${imageUrl})` //so we can have dynamic styles
      }}  
    />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

export default MenuItem;