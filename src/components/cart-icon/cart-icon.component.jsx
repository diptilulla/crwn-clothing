import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden()) 
});
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});
//w/o createStructuredSelector
    //passing whole reducer state into selectCartItems selector, which references selectCartItems, which ref selectCart, it passes state in there gets cart object, which is passed into selectCartItems, which passes out cartItems which passed to selectCartItemsCount, which finally gives count
    // const mapStateToProps = state => ({
    //   itemCount: selectCartItemsCount(state) //passing whole reducer state into selectCartItems selector, which references selectCartItems, which ref selectCart, it passes state in there gets cart object, which is passed into selectCartItems, which passes out cartItems which passed to selectCartItemsCount, which finally gives count
    // });
//mapStateToProps is always being called whenever redux state changes i.e new obj returned for eg even while signing in this mapStateToProps is being called unnecessarily, so reduce gets called every time, so we want to moodify code such that component doesn't rerender everytime state changes especially if those state change dont modify parts of state that component doesn't care abt
//store or cache value what selector(code gets state, pulls off small portion of the state) is using to compute the value - memoization - so that component doesn't rerender - achived by using library reselect, allows ro write selectors in a way suh that they know that if prop that they are pulling from state are same value hasnt changed output is also same it won't pass them i.e. will just pass the old value
export default connect(mapStateToProps,mapDispatchToProps)(CartIcon); //we don't need to use state as props here, we just need to dispatch