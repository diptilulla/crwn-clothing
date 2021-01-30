import React from 'react';
import { withRouter } from 'react-router-dom';  //higher order compoent takes a component as an argument and turns in a modified component
import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, linkUrl, match, history }) => (
  <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
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

export default withRouter(MenuItem); //we now have acces to history