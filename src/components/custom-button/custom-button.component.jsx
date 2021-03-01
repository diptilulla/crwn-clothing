import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
    <button 
        className ={`${inverted ? 'inverted' : ''} 
            ${isGoogleSignIn ? 'google-sign-in': ''} 
            custom-button` }
        {...otherProps}
    > 
        {children}
    </button> //both button and input type submit can trigger form submit action
);

export default CustomButton;