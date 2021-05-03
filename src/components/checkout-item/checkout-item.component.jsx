import React from "react";

import "./checkout-item.styles.scss";

const CheckoutItem = (
  { cartItem: { name, imageUrl, price, quantity } } //we'll pass the full item without destructuring props bcs we want to in and dec quan and rem item, cart acion addItem needs the whole item, so we pass whole item as a parop but we can also destructure it further to pass to component
) => (
  <div className="checkout-item">
    <div className="image-container">
      <img src={imageUrl} alt="item" />
    </div>
    <span className="name">{name}</span>
    <span className="quantity">{quantity}</span>
    <span className="price">{price}</span>
    <div className="remove-button">&#10005;</div>
  </div>
);

export default CheckoutItem;
