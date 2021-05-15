import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from "reselect";

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from '../../redux/cart/cart.actions';

// import './cart-dropdown.styles.scss';
import { CartDropdownContainer, CartItemsContainer, DropdownButtonContainer, EmptyMessageContainer } from './cart-dropdown.styles';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <CartDropdownContainer>
        <CartItemsContainer>
            {
                cartItems.length ?
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
                : <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
            }
        </CartItemsContainer>
        <DropdownButtonContainer 
            onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartHidden()); //for clicking checkout button cart dropdown hidden is false so we'll set it to tru so that dropdown doesn't show on checkout page, since we have same info on heckout pg
            }}
        > 
            GO TO CHECKOUT 
        </DropdownButtonContainer>
    </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems, //makes sure that cart dropdown component is not getting re-rendered whenever state changes unrelated to cart items
});

//if we don't give mapDispatchToProps as second prop to connect then it supplies dispatch prop to the component

export default withRouter(connect(mapStateToProps)(CartDropdown)); //order in which we wrap hoc matters, we want what comes out of connect component to receive history and other props 
